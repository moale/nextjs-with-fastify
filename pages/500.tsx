import * as React from "react";
import { Result, Button, Typography } from "antd";
import Link from "next/link";

const Extra = (
  <Button>
    <Typography.Link href="/">Home</Typography.Link>
  </Button>
);

function Page500() {
  return <Result status={500} title="Error" extra={Extra}></Result>;
}

export default Page500;
