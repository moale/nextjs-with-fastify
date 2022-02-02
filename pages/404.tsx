import * as React from "react";
import { Result, Button, Typography } from "antd";

const Extra = (
  <Button>
    <Typography.Link href="/">Home</Typography.Link>
  </Button>
);

function Page404() {
  return <Result status={404} title="Page Not Found" extra={Extra}></Result>;
}

/* export async function getStaticProps(context) {

  return {
    props: {}, // will be passed to the page component as props
  }
} */

export default Page404;
