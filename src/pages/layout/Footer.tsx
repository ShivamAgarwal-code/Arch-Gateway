import React from "react";
import ComponentLayout from "./ComponentLayout";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <ComponentLayout className="border-t px-8 md:px-20 md:pt-12 pb-20 pt-6">
      <div className="flex flex-wrap justify-between items-center mb-4">
        <Link href="/" className="flex items-center">
          <Image src="/gateway_logo.png" alt="LOGO" width={30} height={30} />
          <p className="text-white font-bold text-xl ml-2">GATEWAY</p>
        </Link>
        <p className="md:text-md text-sm font-mono text-right text-white">
          Rewards for Everything
          <br />© 2023 D3LAB. All rights reserved.
        </p>
      </div>
    </ComponentLayout>
  );
};

export default Footer;
