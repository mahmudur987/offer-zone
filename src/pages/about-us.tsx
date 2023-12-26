import Layout from "@components/layout/layout-two";
import Container from "@components/ui/container";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import DownloadApps from "@components/common/download-apps";
import { aboutSetting } from "@settings/about-setting";
import Image from "@components/ui/image";
import Seo from "@components/seo/seo";
import { useCompanyData } from "@framework/companyData/getCompanydata";
const backgroundThumbnail = "/assets/images/about-us.png";
const aboutUs1 = "/assets/images/about-us/1.png";
const aboutUs2 = "/assets/images/about-us/2.png";
const aboutUs3 = "/assets/images/about-us/3.png";
const aboutUs4 = "/assets/images/about-us/4.png";
const aboutUs5 = "/assets/images/about-us/5.png";
const aboutUs6 = "/assets/images/about-us/6.png";

export default function TermsPage() {
  const { t } = useTranslation("about");
  const { data } = useCompanyData();
  const { about_us } = data || {};
  console.log(data);
  return (
    <>
      <Seo
        title="About Us"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="about-us"
      />
      {/* End of seo */}

      <div className="py-8 lg:py-16 2xl:py-20">
        <Container>
          <div className="flex flex-wrap gap-4 items-center mx-auto max-w-[1200px] mb-8">
            <div className="flex-1 content-end ">
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/R2K9x3Vkapk"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <div className="flex-1 content-end min-w-[500px]">
              <h1 className="text-5xl text-black mb-4">Get to know us</h1>
              {about_us ? (
                <p className="text-sm leading-7 text-brand-dark opacity-70 lg:text-15px lg:leading-loose">
                  {about_us}
                </p>
              ) : (
                <p className="text-sm leading-7 text-brand-dark opacity-70 lg:text-15px lg:leading-loose">
                  Offer Zone BD is a service marketplace that collaborates deals
                  & discounts from online/offline, small to large, urban to
                  rural merchants for customers. It’s a unique online discount
                  aggregator brand in Bangladesh where customers and merchants
                  connect with each other. Offer Zone offers customers to
                  discover the best available offers or discounts in the market
                  through its partners or merchants, resulting into lots of
                  saving, better living to customers and enhance merchant
                  business.
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col w-full mx-auto max-w-[1200px]">
            <div>
              <p className="text-sm leading-7 text-brand-dark opacity-70 lg:text-15px lg:leading-loose">
                We are making relationship with small to large brands in
                Bangladesh so that they provide discount and benefit to our
                registered members when they shopping online or in store. We
                have a team of people constantly negotiating discounts from
                retailers and businesses and finding the best deals available,
                both online and offline. We continuously strive to bring the
                best deals for our registered members. Amazing offers and
                discounts are just one click away with our super handy mobile
                app. Simply scan the exclusive QR code in our partner stores to
                avail offers, & discounts or open the partner profile in app and
                tap on the offer to avail on spot. Offer Zone introduced gold
                membership with digital card to the customer to avail lucrative
                discounts from merchant outlet. Registered member can avail
                offers on spot or order for home delivery or can send gift to
                friends and family through the app in a click away. At Offer
                Zone, registered member can refer other and earn money as much
                as they can. Sign Up today to unlock the world of boundless
                possibilities.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 my-8 lg:my-14">
              <Image
                src={aboutUs1}
                alt={t("text-map")}
                className="ltr:mr-5 rtl:ml-5"
                width={576}
                height={390}
              />
              <Image
                src={aboutUs2}
                alt={t("text-map")}
                className=""
                width={576}
                height={390}
              />
            </div>
            <div
              className="text-sm leading-7 text-brand-dark opacity-70 lg:text-15px lg:leading-loose"
              dangerouslySetInnerHTML={{
                __html: t(aboutSetting.descriptionTwo),
              }}
            />

            <div className="flex flex-col grid-cols-3 gap-4 my-8 lg:my-14 sm:grid">
              <Image
                src={aboutUs3}
                alt={t("text-map")}
                className="ltr:mr-4 rtl:ml-4"
                width={379}
                height={262}
              />
              <Image
                src={aboutUs4}
                alt={t("text-map")}
                className="ltr:mr-4 rtl:ml-4"
                width={379}
                height={262}
              />
              <Image
                src={aboutUs5}
                alt={t("text-map")}
                className=""
                width={379}
                height={262}
              />
            </div>
            <div
              className="text-sm leading-7 text-brand-dark opacity-70 lg:text-15px lg:leading-loose"
              dangerouslySetInnerHTML={{
                __html: t(aboutSetting.descriptionThree),
              }}
            />
            <div className="flex mt-8 mb-6 lg:mt-14 lg:mb-10">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/R2K9x3Vkapk"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <h2 className="text-lg md:text-xl lg:text-[24px] text-brand-dark font-semibold mb-4 lg:mb-7">
              {t(aboutSetting.titleTwo)}
            </h2>
            <div
              className="text-sm leading-7 text-brand-dark opacity-70 lg:text-15px lg:leading-loose"
              dangerouslySetInnerHTML={{
                __html: t(aboutSetting.descriptionFour),
              }}
            />
            <p className="text-brand-dark font-medium text-base lg:text-lg leading-7 2xl:text-[20px] lg:leading-loose lg:mt-4 mb-3.5">
              {t(aboutSetting.titleThree)} &nbsp;
              <a href="mailto:press@borobazar.com">press@borobazar.com</a>.
            </p>
            <div
              className="text-sm leading-7 text-brand-dark opacity-70 lg:text-15px lg:leading-loose"
              dangerouslySetInnerHTML={{
                __html: t(aboutSetting.descriptionFive),
              }}
            />
          </div>

          <div className="flex flex-col w-full mx-auto max-w-[1200px] mt-4">
            <div>
              <h2 className="text-5xl text-black mb-4">Our Mission</h2>

              <p className="text-sm leading-7 text-brand-dark opacity-70 lg:text-15px lg:leading-loose">
                Encourage people to save more and live better with the best
                available discounts or offers from Offer Zone platform.
              </p>
            </div>
          </div>

          <div className="flex flex-col w-full mx-auto max-w-[1200px] mt-4">
            <div>
              <h2 className="text-5xl text-black mb-4">Our Vision</h2>

              <p className="text-sm leading-7 text-brand-dark opacity-70 lg:text-15px lg:leading-loose">
                Our vision is to replace multiple membership card of different
                merchant by Offer Zone privilege card. This will be a common
                privilege card for all customer.{" "}
              </p>
            </div>
          </div>
          <img
            src="/assets/images/about-us/agent_registration.png"
            className="mt-10"
          />
          <img
            src="/assets/images/about-us/member_registration.png"
            className="mt-10"
          />
          <img
            src="/assets/images/about-us/merchant_registration.png"
            className="mt-10"
          />
          <img
            src="/assets/images/about-us/offer_avail.png"
            className="mt-10"
          />
          <img
            src="/assets/images/about-us/offer_purchase.png"
            className="mt-10"
          />
        </Container>
      </div>

      <DownloadApps />
    </>
  );
}

TermsPage.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "about",
        "footer",
      ])),
    },
  };
};
