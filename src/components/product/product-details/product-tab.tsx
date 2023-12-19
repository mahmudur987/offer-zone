import { useState } from "react";
import { Tab } from "@headlessui/react";
import Heading from "@components/ui/heading";
import ProductReviewRating from "./product-review-rating";
import { useRouter } from "next/router";
import { useProductQuery } from "@framework/product/get-product";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetailsTab() {
  const [tabHeading] = useState({
    Product_Details: "",
    Review_Rating: "",
  });
  const router = useRouter();
  const {
    query: { slug },
  } = router;

  const { data, isLoading, error } = useProductQuery(slug as string);

  if (isLoading) {
    return <p>Loading</p>;
  }
  if (error) {
    return <p>Error</p>;
  }
  const { description, merchant_name } = data || {};

  return (
    <div className="w-full xl:px-2 py-11 lg:py-14 xl:py-16 sm:px-0">
      <Tab.Group>
        <Tab.List className="block border-b border-border-base">
          {Object.keys(tabHeading).map((item) => (
            <Tab
              key={item}
              className={({ selected }) =>
                classNames(
                  "relative inline-block transition-all text-15px lg:text-17px leading-5 text-brand-dark focus:outline-none pb-3 lg:pb-5 hover:text-brand ltr:mr-8 rtl:ml-8",
                  selected
                    ? "font-semibold after:absolute after:w-full after:h-0.5 after:bottom-0 after:translate-y-[1px] after:ltr:left-0 after:rtl:right-0 after:bg-brand"
                    : ""
                )
              }
            >
              {item.split("_").join(" ")}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-6 lg:mt-9">
          <Tab.Panel className="lg:flex">
            <div className="text-sm sm:text-15px text-brand-muted leading-[2em] space-y-4 lg:space-y-5 xl:space-y-7">
              <p>{description?.slice(0, 200)}</p>
              <p>{description?.slice(200, description.length)}</p>
              <p>Merchant :{merchant_name}</p>
            </div>
            {/* <div className="shrink-0 lg:w-[400px] xl:w-[480px] 2xl:w-[550px] 3xl:w-[680px] lg:ltr:pl-10 lg:rtl:pr-10 xl:ltr:pl-14 xl:rtl:pr-14 2xl:ltr:pl-20 2xl:rtl:pr-20 pt-5 lg:pt-0">
              <Heading
                variant="mediumHeading"
                className="xl:text-lg mb-4 pt-0.5"
              >
                Nutrition Facts
              </Heading>
              <div className="border rounded border-border-four">
                <table className="w-full text-brand-dark text-15px">
                  <thead>
                    <tr className="border-b border-border-four">
                      <th className="px-4 pt-3 pb-4 text-sm font-medium lg:px-5 xl:px-6 lg:pb-6 ltr:text-left rtl:text-right lg:text-15px xl:text-base">
                        Amount per serving
                        <span className="block font-semibold text-lg lg:text-xl xl:text-2xl pt-0.5">
                          Calories
                        </span>
                      </th>
                      <th className="border-s border-border-four px-4 lg:px-5 xl:px-6 pt-3 pb-5 ltr:text-right rtl:text-left w-24 lg:w-28 xl:w-36 font-semibold text-2xl lg:text-3xl xl:text-[36px]">
                        70
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="font-normal border-b border-border-four last:border-b-0">
                      <td className="px-4 py-3 lg:px-5 xl:px-6">
                        Total Fat 5g
                      </td>
                      <td className="w-24 px-4 py-3 border-s border-border-four lg:px-5 xl:px-6 ltr:text-right rtl:text-left lg:w-28 xl:w-36">
                        6%
                      </td>
                    </tr>
                    <tr className="font-normal border-b border-border-four last:border-b-0">
                      <td className="px-4 py-3 lg:px-5 xl:px-6">
                        Cholesterol 185mg
                      </td>
                      <td className="w-24 px-4 py-3 border-s border-border-four lg:px-5 xl:px-6 ltr:text-right rtl:text-left lg:w-28 xl:w-36">
                        62%
                      </td>
                    </tr>
                    <tr className="font-normal border-b border-border-four last:border-b-0">
                      <td className="px-4 py-3 lg:px-5 xl:px-6">Sodium 70mg</td>
                      <td className="w-24 px-4 py-3 border-s border-border-four lg:px-5 xl:px-6 ltr:text-right rtl:text-left lg:w-28 xl:w-36">
                        49%
                      </td>
                    </tr>
                    <tr className="font-normal border-b border-border-four last:border-b-0">
                      <td className="px-4 py-3 lg:px-5 xl:px-6">
                        Total Carbohydrate 0g
                      </td>
                      <td className="w-24 px-4 py-3 border-s border-border-four lg:px-5 xl:px-6 ltr:text-right rtl:text-left lg:w-28 xl:w-36">
                        18%
                      </td>
                    </tr>
                    <tr className="font-normal border-b border-border-four last:border-b-0">
                      <td className="px-4 py-3 lg:px-5 xl:px-6">Protein 6g</td>
                      <td className="w-24 px-4 py-3 border-s border-border-four lg:px-5 xl:px-6 ltr:text-right rtl:text-left lg:w-28 xl:w-36">
                        35%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div> */}
          </Tab.Panel>
          <Tab.Panel>
            <ProductReviewRating />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
