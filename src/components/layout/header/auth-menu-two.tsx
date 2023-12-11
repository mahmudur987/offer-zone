import Link from "@components/ui/link";
import { FaChevronDown } from "react-icons/fa";
import ListMenu from "@components/ui/list-menu";
import { useTranslation } from "next-i18next";
import cn from "classnames";
import { useEffect, useState } from "react";
import { get, getDatabase, query, ref } from "firebase/database";
import firebase from "@firebase/firebase";
import Cookies from "js-cookie";
import { useUI } from "@contexts/ui.context";

const database = getDatabase(firebase.app());

interface MenuProps {
  data: any;
  className?: string;
}

const AuthMenu: React.FC<MenuProps> = ({ data, className }) => {
  const { t } = useTranslation("menu");
  const { isAuthorized } = useUI();
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [isAgent, setIsAgent] = useState(false);
  const [isMerchant, setIsMerchant] = useState(false);

  useEffect(() => {
    if (isAuthorized) setShow(true);
  }, [isAuthorized]);

  useEffect(() => {
    if (typeof window !== undefined) {
      if (show) {
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
                  }
                });
              }

              if (merchantData.exists()) {
                merchantData.forEach(function (merchantdata) {
                  var merchantinfo = merchantdata.val();
                  if (merchantinfo.Phone == phone) {
                    setIsMerchant(true);
                  }
                });
              }

              if (agentData.exists()) {
                agentData.forEach(function (agentdata) {
                  var agentinfo = agentdata.val();
                  if (agentinfo.Phone == phone) {
                    setIsAgent(true);
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
  }, [show]);

  if (show && isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {show ? (
        <>
          <div
            className={cn("headerMenu flex items-center relative", className)}
          >
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
                  <div className="absolute z-30 opacity-0 subMenu shadow-dropDown transition-all duration-300 invisible bg-brand-light ltr:left-0 rtl:right-0 w-[220px] xl:w-[240px] group-hover:opacity-100">
                    <ul className="py-5 text-sm text-brand-muted">
                      {item.subMenu
                        .filter((menu: any) => {
                          if (!isMember && menu.label === "menu-member")
                            return true;
                          if (!isMerchant && menu.label === "menu-merchant")
                            return true;
                          if (!isAgent && menu.label === "menu-agent")
                            return true;

                          return false;
                        })
                        .map((menu: any, index: number) => {
                          const dept = 1;
                          const menuName = `sidebar-menu-${dept}-${index}`;
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
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      ) : null}
    </>
  );
};

export default AuthMenu;
