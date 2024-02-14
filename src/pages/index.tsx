import Layout from "@components/layout/layout";
import Container from "@components/ui/container";
import { homeHeroBanner as heroBanner } from "@framework/static/banner";
import { homeSixBanner as banner } from "@framework/static/banner";
import DownloadApps from "@components/common/download-apps";
import BundleGrid from "@components/bundle/bundle-grid-two";
import CategoryGridBlock from "@components/common/category-grid-block";
import Seo from "@components/seo/seo";
import dynamic from "next/dynamic";
import BannerCard from "@components/cards/banner-card";
import ProductsGridBlock from "@components/product/products-grid-block";
import { SupperOfferGrid } from "@components/offers/super-offer-grid";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
const HeroBannerCard = dynamic(
  () => import("@components/hero/hero-banner-card"),
  {
    ssr: false,
  }
);

export default function Home() {
  return (
    <>
      <Seo
        title="Grocery & Food Store"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="/"
      />
      <HeroBannerCard
        banner={heroBanner}
        variant="antique"
        className="min-h-[400px] md:min-h-[460px] lg:min-h-screen pb-20 2xl:bg-center relative"
      />

      <Container className="-mt-[60px] relative z-10">
        {/* under baner section */}
        <BundleGrid className="mb-12 lg:mb-14 xl:mb-16 2xl:mb-20" />

        {/* super offer */}
        <SupperOfferGrid />

        {/* home category section */}

        <CategoryGridBlock />

        <ProductsGridBlock sectionHeading={"All New Products"} />

        <BannerCard
          banner={banner}
          className="mb-12 lg:mb-14 xl:pb-3"
          effectActive={false}
        />
      </Container>

      {/* download app component */}

      <DownloadApps />
    </>
  );
}

Home.Layout = Layout;
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "faq",
        "footer",
      ])),
    },
  };
};
