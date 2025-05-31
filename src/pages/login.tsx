import Layout from '@/layout/Layout';
import LoginForm from '@/components/auth/LoginForm';
import Head from 'next/head';


export default function LoginPage() {
    return (
      <>
      <Head>
        <title>Login | DMH</title>
      </Head>
      <Layout simpleHeader>
        <LoginForm />
      </Layout>
      </>
    );
  }
  
