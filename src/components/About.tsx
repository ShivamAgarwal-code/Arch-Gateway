import ComponentLayout from "@/pages/layout/ComponentLayout";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const About = () => {
  const logoConfig = [
    {
      image: "/github_logo.svg",
      href: "https://github.com/D3LAB-DAO",
    },
    {
      image: "/youtube_logo.svg",
      href: "https://www.youtube.com/c/d3lab",
    },
    {
      image: "/medium_logo.svg",
      href: "https://medium.com/d3lab-dao",
    },
  ];

  return (
    <ComponentLayout>
      <div className="md:pb-12 pb-8">
        <div
          className=" w-full bg-center bg-contain bg-no-repeat"
          style={{
            backgroundImage: "url('/circular.gif')",
          }}
        >
          <Image
            src="/d3lab_logo.svg"
            alt="LOGO"
            width={100}
            height={100}
            className="block mx-auto mt-4 md:mt-6 md:mb-10 mb-4 shadow-lg rounded-full h-36 w-32"
          />
        </div>
        <div className="w-full md:px-4 px-10 pb-0 mb-8 max-w-2xl mx-auto mt-4">
          <div className="flex mb-6 items-center">
            <p className="md:text-base text-xs font-medium text-white text-center">
              <span className="text-pink-400 font-bold">D3LAB</span> was
              established to point out that many blockchain projects contain
              centralized features for profit-seeking and their convenience. We
              are developing several decentralized applications, blockchain
              protocols, and open-sources/libraries.
            </p>
          </div>

          <div className="mb-6 items-center">
            <p className="md:text-lg text-sm font-medium text-white text-center">
              Interested in learning more about Gateway or working with{" "}
              <span className=" text-pink-400 font-bold">D3LAB</span>?
            </p>
            <p className="md:text-base text-xs font-medium text-white text-center">
              👇🏼 Reach out to us through our contact form or social media
              channels 👇🏼
            </p>
          </div>

          <div className="flex mb-6 items-start justify-between">
            <p className="md:text-lg text-sm text-white text-left">
              <span className="text-pink-400 font-bold">E-mail :</span>{" "}
              d3labdao.@gmail.com
            </p>
            <div className="flex">
              {logoConfig.map((item, index) => (
                <Link key={index} href={item.href} target="_blank">
                  <Image
                    width={30}
                    height={30}
                    src={item.image}
                    alt="LOGO"
                    className="mr-3 hover:opacity-60"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ComponentLayout>
  );
};

export default About;
