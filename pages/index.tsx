import * as React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { Typography, Button } from "antd";
import Link from "next/link";
import { useQuery } from "react-query";
import { http, HTTPError } from "../services/http";

import styles from "styles/Home.module.css";

const Home: NextPage = () => {
  const resource = useQuery<{ name: string }, HTTPError>({
    queryKey: ["hello"],
    queryFn: () => http.get("hello").json(),
  });

  // const resourceNotFound = useQuery<{ name: string }, HTTPError>({
  //   queryKey: ["foo"],
  //   queryFn: () => http.get("foo").json(),
  // });

  // console.log(resourceNotFound.error instanceof HTTPError);

  return (
    <div className={styles.container}>
      <Head>
        <title>Steve Jobs</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Typography.Title>Hello {resource.data?.name}!!</Typography.Title>

      <Link href="/foo">
        <Button>Foo</Button>
      </Link>
    </div>
  );
};

export default Home;
