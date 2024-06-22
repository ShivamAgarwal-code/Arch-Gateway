import Head from "next/head";
import About from "@/components/About";
import Hero from "@/components/Hero";
import Main from "@/components/Main";
import { useRecoilValue } from "recoil";
import { isConnectWalletAtom } from "@/core/state/globalState";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { Coin } from "@cosmjs/proto-signing";

export type GetInfoType = {
  getInfo: (
    client: SigningCosmWasmClient | null,
    address: string,
    balance: Coin | null
  ) => void;
};

export default function Home() {
  const isConnectWallet = useRecoilValue(isConnectWalletAtom);

  return (
    <>
      <Head>
        <title>Gateway | Rewards for Everything</title>
        <meta
          name="description"
          content="Gateway on Archway, Rewards for Everything"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/gateway_favicon.ico" />
      </Head>
      <Hero />
      {isConnectWallet && <Main />}
      <About />
    </>
  );
}
