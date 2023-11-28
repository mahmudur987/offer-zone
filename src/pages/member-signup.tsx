import Layout from '@components/layout/layout';
import Container from '@components/ui/container';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import MemberSignupForm from '@components/auth/member-signup-form';

export default function MerchantSignup() {
  return (
    <>
      <Container>
        <MemberSignupForm />
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
