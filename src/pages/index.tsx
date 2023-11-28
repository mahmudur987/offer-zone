import Layout from '@components/layout/layout';
import Container from '@components/ui/container';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import DownloadApps from '@components/common/download-apps';
import BundleGrid from '@components/bundle/bundle-grid-two';
import CategoryGridBlock from '@components/common/category-grid-block';
import { homeAntiqueHeroBanner as heroBanner } from '@framework/static/banner';
// import { homeSixBanner as banner } from '@framework/static/banner';
// import BannerCard from '@components/cards/banner-card';
import { GetStaticProps } from 'next';
import Seo from '@components/seo/seo';

import HotOffersFeed from '@components/offers/feeds/hot-offers-feed';
import ClosingSoonFeed from '@components/offers/feeds/closing-soon';
import OffersOfTheDay from '@components/offers/feeds/offers-of-the-day';
import StoresOfTheDay from '@components/shops/feeds/stores-of-the-day';
import dynamic from 'next/dynamic';

const HeroBannerCard = dynamic(
  () => import('@components/hero/hero-banner-card'),
  {
    ssr: false,
  },
);

// import { useEffect } from 'react';
// import {
//   child,
//   equalTo,
//   get,
//   getDatabase,
//   limitToFirst,
//   orderByChild,
//   orderByKey,
//   query,
//   ref,
// } from 'firebase/database';
// import firebase from '@firebase/firebase';

// const database = getDatabase(firebase.app());

export default function Home() {
  // useEffect(() => {
  //   const getDatabase = async () => {
  //     const data = await get(
  //       query(ref(database, 'offerInfo'), orderByChild('Availed')),
  //     );

  //     if (data.exists()) {
  //       console.log('-----');

  //       data.forEach((el) => {
  //         console.log(el.val());
  //       });
  //     }
  //   };

  //   getDatabase();
  // }, []);
  return (
    <>
      <Seo
        title='Grocery & Food Store'
        description='Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS.'
        path='/'
      />
      <HeroBannerCard
        banner={heroBanner}
        variant='antique'
        className='min-h-[400px] md:min-h-[460px] lg:min-h-[500px] xl:min-h-[800px] pb-20 py:pt-24 2xl:bg-center relative'
      />
      <Container className='-mt-[60px] relative z-10'>
        <BundleGrid className='mb-12 lg:mb-14 xl:mb-16 2xl:mb-20' />
        <CategoryGridBlock />
        <HotOffersFeed variant='alpine' />
        <ClosingSoonFeed variant='alpine' />
        {/* <BannerCard
          banner={banner}
          className='mb-12 lg:mb-14 xl:pb-3'
          effectActive={false}
        /> */}
        <OffersOfTheDay variant='alpine' />
        <StoresOfTheDay />
      </Container>
      {/* <CollectionGrid
        headingPosition='center'
        className='pb-1 mb-12 xl:pt-2 2xl:pt-4 3xl:pt-6 lg:pb-0 lg:mb-14 xl:mb-16 2xl:mb-20'
      /> */}
      <DownloadApps />
    </>
  );
}

Home.Layout = Layout;
