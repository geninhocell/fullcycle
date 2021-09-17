import { NextPage } from 'next';
import Head from 'next/head';

interface HeaderTitleProps {
  title: string;
}

export const HeadTitle: NextPage<HeaderTitleProps> = ({ title, children }) => {
  return (
    <Head>
      <title>{title} - FinCycle</title>
      {children}
    </Head>
  );
};
