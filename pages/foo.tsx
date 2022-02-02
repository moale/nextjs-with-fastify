import * as React from "react";
import Head from "next/head";
import Link from "next/link";
import { Button, Typography } from "antd";

import type { NextPage } from "next";

import styles from "styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title></title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Typography.Title>Hello Foo!!</Typography.Title>
      <Link href="/">
        <Button>Home</Button>
      </Link>
    </div>
  );
};

export default Home;
