import Layout from '@components/layout/layout';
import Container from '@components/ui/container';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import AgentSignupForm from '@components/auth/agent-signup-form';

export default function AgentSignup() {
  return (
    <>
      <Container>
        <AgentSignupForm />
      </Container>
    </>
  );
}

AgentSignup.Layout = Layout;

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
