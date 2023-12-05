import Layout from "@components/layout/layout";
import Container from "@components/ui/container";
import DownloadApps from "@components/common/download-apps";
import BundleGrid from "@components/bundle/bundle-grid-two";
import CategoryGridBlock from "@components/common/category-grid-block";
import { homeAntiqueHeroBanner as heroBanner } from "@framework/static/banner";
import { homeSixBanner as banner } from "@framework/static/banner";

import Seo from "@components/seo/seo";
import HotOffersFeed from "@components/offers/feeds/hot-offers-feed";
import ClosingSoonFeed from "@components/offers/feeds/closing-soon";
import OffersOfTheDay from "@components/offers/feeds/offers-of-the-day";
import StoresOfTheDay from "@components/shops/feeds/stores-of-the-day";
import dynamic from "next/dynamic";
import BannerCard from "@components/cards/banner-card";
import CollectionGrid from "@components/common/collection-grid";
import NewProducts from "@components/offers/feeds/NewProducts";

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

        {/* home category section */}

        <CategoryGridBlock />

        {/* New product for showing product */}

        {/* <NewProducts /> */}

        {/* Hot offer */}

        {/* <HotOffersFeed variant="alpine" /> */}

        {/* closing offer */}

        {/* <ClosingSoonFeed variant="alpine" /> */}

        {/* middle banner */}
        <BannerCard
          banner={banner}
          className="mb-12 lg:mb-14 xl:pb-3"
          effectActive={false}
        />

        {/* todays offer */}

        {/* <OffersOfTheDay variant="alpine" /> */}

        {/* todays best store */}

        {/* <StoresOfTheDay /> */}
      </Container>

      {/* colection  */}
      <CollectionGrid
        headingPosition="center"
        className="pb-1 mb-12 xl:pt-2 2xl:pt-4 3xl:pt-6 lg:pb-0 lg:mb-14 xl:mb-16 2xl:mb-20"
      />

      {/* download app component */}

      <DownloadApps />
    </>
  );
}

Home.Layout = Layout;
