import Container from '@components/ui/container';
import Layout from '@components/layout/layout-two';
import DownloadApps from '@components/common/download-apps';

import Breadcrumb from '@components/ui/breadcrumb';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import Divider from '@components/ui/divider';
import OfferSingleDetails from '@components/offers/offer';

export default function OfferPage() {
  return (
    <>
      <Divider />
      <div className='pt-6 lg:pt-7'>
        <Container>
          <Breadcrumb />
          <OfferSingleDetails />
        </Container>
      </div>

      <DownloadApps />
    </>
  );
}

OfferPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
    },
  };
};
