import Layout from '@components/layout/layout';
import Container from '@components/ui/container';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import MerchantSignupForm from '@components/auth/merchant-signup-form';

export default function MerchantSignup() {
  return (
    <>
      <Container>
        <MerchantSignupForm />
      </Container>
    </>
  );
}

MerchantSignup.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
    },
    revalidate: 60,
  };
};
