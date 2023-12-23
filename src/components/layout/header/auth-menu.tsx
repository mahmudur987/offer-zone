import Link from "@components/ui/link";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import cn from "classnames";
import Cookies from "js-cookie";
import { get, getDatabase, query, ref } from "firebase/database";
import firebase from "@firebase/firebase";
import { FaChevronDown } from "react-icons/fa";
import ListMenu from "@components/ui/list-menu";
import Button from "@components/ui/button";
import { useLogoutMutation } from "@framework/auth/use-logout";

const database = getDatabase(firebase.app());

interface Props {
  btnProps: React.ButtonHTMLAttributes<any>;
  isAuthorized: boolean;
  data: any;
  className: string;
}

const generatePath = ({ type, id }: { type: string; id: string }) => {
  return `https://offerzonebd.com/${
    type === "member" ? "member" : type === "merchant" ? "merchant" : "agent"
  }/dashboard.php?id=${id}`;
};

export default function AuthMenu({
  isAuthorized,
  data,
  btnProps,
  className,
}: React.PropsWithChildren<Props>) {
  const { t } = useTranslation("menu");
  const { mutate: logout } = useLogoutMutation();

  const [isLoading, setIsLoading] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [isAgent, setIsAgent] = useState(false);
  const [isMerchant, setIsMerchant] = useState(false);
  const [memberID, setMemberID] = useState("");
  const [merchantID, setMerchantID] = useState("");
  const [agentID, setAgentID] = useState("");

  useEffect(() => {
    if (typeof window !== undefined) {
      if (isAuthorized) {
        const queryDb = async () => {
          setIsLoading(true);
          const phone = Cookies.get("phone");
          const userDataPromise = get(query(ref(database, "userInfo")));
          const merchantDataPromise = get(query(ref(database, "merchantInfo")));
          const agentDataPromise = get(query(ref(database, "agentInfo")));

          Promise.all([userDataPromise, merchantDataPromise, agentDataPromise])
            .then(([userData, merchantData, agentData]) => {
              if (userData.exists()) {
                userData.forEach(function (userdata) {
                  var userinfo = userdata.val();
                  if (userinfo.Phone == phone) {
                    setIsMember(true);
                    setMemberID(userinfo.UserID);
                  }
                });
              }

              if (merchantData.exists()) {
                merchantData.forEach(function (merchantdata) {
                  var merchantinfo = merchantdata.val();
                  if (merchantinfo.Phone == phone) {
                    setIsMerchant(true);
                    setMerchantID(merchantinfo.MerchantID);
                  }
                });
              }

              if (agentData.exists()) {
                agentData.forEach(function (agentdata) {
                  var agentinfo = agentdata.val();
                  if (agentinfo.Phone == phone) {
                    setIsAgent(true);
                    setAgentID(agentinfo.AgentID);
                  }
                });
              }
            })
            .catch(() => {})
            .finally(() => setIsLoading(false));
        };
        queryDb();
      }
    }
  }, [isAuthorized]);
  // console.log(isAuthorized);
  return isAuthorized ? (
    <div className={cn("headerMenu flex items-center relative", className)}>
      {isLoading ? (
        <p>Loading....</p>
      ) : (
        <>
          {data?.map((item: any) => (
            <div
              className="relative py-3 mx-3 cursor-pointer menuItem group xl:mx-4"
              key={item.id}
            >
              <Link
                href={item.path}
                className="relative inline-flex items-center py-2 text-sm font-normal lg:text-15px text-brand-dark group-hover:text-brand before:absolute before:w-0 before:ltr:right-0 rtl:left-0 before:bg-brand before:h-[3px] before:transition-all before:duration-300 before:-bottom-[14px] group-hover:before:w-full ltr:group-hover:before:left-0 rtl:group-hover:before:right-0 lrt:group-hover:before:right-auto rtl:group-hover:before:left-auto"
              >
                {t(item.label)}
                {(item?.columns || item.subMenu) && (
                  <span className="text-xs mt-1 xl:mt-0.5 w-4 flex justify-end text-brand-dark opacity-40 group-hover:text-brand">
                    <FaChevronDown className="transition duration-300 ease-in-out transform group-hover:-rotate-180" />
                  </span>
                )}
              </Link>

              {item?.subMenu && Array.isArray(item?.subMenu) && (
                <div className="absolute z-30 opacity-0 subMenu shadow-dropDown transition-all duration-300 invisible bg-brand-light ltr:right-0 rtl:right-0 w-[220px] xl:w-[240px] group-hover:opacity-100">
                  <ul className="py-5 text-sm text-brand-muted">
                    {item.subMenu
                      // .filter((menu: any) => {
                      //   if (isMember && menu.label === "menu-member-dashboard")
                      //     return true;
                      //   if (
                      //     isMerchant &&
                      //     menu.label === "menu-merchant-dashboard"
                      //   )
                      //     return true;
                      //   if (isAgent && menu.label === "menu-agent-dashboard")
                      //     return true;
                      //   if (menu.label === "Logout") return true;
                      //   return true;
                      // })
                      .map((menu: any, index: number) => {
                        const dept = 1;
                        const menuName = `sidebar-menu-${dept}-${index}`;
                        const data = {
                          ...menu,
                          path: generatePath({
                            type:
                              menu.label === "menu-member-dashboard"
                                ? "member"
                                : menu.label === "menu-merchant-dashboard"
                                ? "merchant"
                                : "agnet",

                            id:
                              menu.label === "menu-member-dashboard"
                                ? memberID
                                : menu.label === "menu-merchant-dashboard"
                                ? merchantID
                                : agentID,
                          }),
                        };

                        return (
                          <ListMenu
                            dept={dept}
                            data={menu}
                            hasSubMenu={menu.subMenu}
                            menuName={menuName}
                            key={menuName}
                            menuIndex={index}
                          />
                        );
                      })}
                    <li className="flex items-center justify-between py-2 ltr:pl-5 rtl:pr-5 xl:ltr:pl-7 xl:rtl:pr-7 ltr:pr-3 rtl:pl-3 xl:ltr:pr-3.5 xl:rtl:pl-3.5">
                      <Button variant="border" onClick={() => logout()}>
                        Logout
                      </Button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  ) : (
    <button
      className="text-sm font-normal lg:text-15px text-brand-dark focus:outline-none ltr:ml-2 rtl:mr-2"
      aria-label="Authentication"
      {...btnProps}
    />
  );
}
