import Layout from '@/layout/Layout';
import Hero from '@/components/landing/Hero';
import Head from 'next/head';

export default function Home() {
  return (
    <>
     <Head>
        <title>Home | DMH</title>
      </Head>
    <Layout>
      <Hero />
    </Layout>
    </>
  );
}

