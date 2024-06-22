import "@/styles/globals.css";
import type { AppProps } from "next/app";
import DefaultLayout from "./layout/DefaultLayout";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </RecoilRoot>
  );
}
