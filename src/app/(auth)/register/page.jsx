// import Footer from "components/footer/footer";
// import Header from "components/header/header";
// "use client";

import Link from "next/link";
import Frompage from "./frompage";

export const metadata = {
  title: "Register page",
  description: "description for Register page",
};

const Page = () => {

  return (
    <>
      <div className="login-container">
        <div className="login-form">
          <h1> انشاء حساب </h1>
          <Frompage />
        </div>
      </div>
    </>
  );
};

export default Page;
