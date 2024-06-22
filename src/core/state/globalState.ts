import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { Coin } from "@cosmjs/proto-signing";
import { atom } from "recoil";

export type GetInfoType = {
  client: SigningCosmWasmClient | null;
  address: string;
  balance: Coin | null;
  chainId: string;
};

export const isConnectWalletAtom = atom<boolean>({
  key: "isConnectWallet",
  default: false,
});
export const isModalOpenAtom = atom<boolean>({
  key: "isModalOpen",
  default: false,
});
export const getClientAtom = atom<SigningCosmWasmClient | null>({
  key: "getClient",
  default: null,
});
export const getAddressAtom = atom<string>({
  key: "getAddress",
  default: "",
});
export const getBalanceAtom = atom<Coin | null>({
  key: "getBalance",
  default: null,
});
export const getProjectIdAtom = atom<number>({
  key: "getProjectIdArray",
  default: 1,
});
