import React from "react";
import ComponentLayout from "./ComponentLayout";
import Link from "next/link";
import Image from "next/image";
import { ButtonLayout } from "@/components/common/Button";
import { ParseDecimal, sliceAddress } from "@/core/utils/numberFormatter";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  getAddressAtom,
  getBalanceAtom,
  getClientAtom,
  isConnectWalletAtom,
  isModalOpenAtom,
} from "@/core/state/globalState";
import UploadFileModal from "@/components/UploadFileModal";
import CopyIcon from "@/components/common/CopyIcon";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { Coin } from "@cosmjs/proto-signing";
import connectWallet from "@/core/hooks/useConnectWallet";
import { ConstantineInfo } from "@/core/config/chainInfo";

export type GetInfoType = {
  getInfo: (
    client: SigningCosmWasmClient | null,
    address: string,
    balance: Coin | null,
    chainId: string
  ) => void;
};

const Header = () => {
  const [client, setClient] = useRecoilState(getClientAtom);
  const [address, setAddress] = useRecoilState(getAddressAtom);
  const [balance, setBalance] = useRecoilState(getBalanceAtom);
  const [isConnectWallet, setConnectWallet] =
    useRecoilState(isConnectWalletAtom);

  const getInfo = (
    client: SigningCosmWasmClient | null,
    address: string,
    balance: Coin | null
  ) => {
    setClient(client);
    setAddress(address);
    setBalance(balance);
    setConnectWallet(true);
  };

  const renderBtn = () => {
    const coinDecimals = ConstantineInfo.currencies[0].coinDecimals;
    const coinDenom = ConstantineInfo.currencies[0].coinDenom;
    return !!client && !!address && !!isConnectWallet ? (
      <>
        <ButtonLayout onClick={handleUploadFiles} className="md:mr-5">
          <p className="text-white">UPLOAD FILES</p>
        </ButtonLayout>
        <div className="text-white mr-2">
          <b className="hidden md:block">BALANCE</b>
          <p className="text-sm">
            {ParseDecimal(balance?.amount || "0", 6)} {coinDenom}
          </p>
        </div>
        <div className="text-white">
          <b className="hidden md:block">ADDRESS</b>
          <p className="text-sm">
            {sliceAddress(address, coinDecimals)} <CopyIcon text={address} />
          </p>
        </div>
      </>
    ) : (
      <ButtonLayout onClick={(event) => connectWallet(event, { getInfo })}>
        <p className="text-white">CONNECT WALLET</p>
      </ButtonLayout>
    );
  };

  const setIsModalOpen = useSetRecoilState(isModalOpenAtom);

  const handleUploadFiles = () => {
    setIsModalOpen(true);
  };

  return (
    <ComponentLayout className="md:px-5">
      <UploadFileModal />
      <div className="p-5 flex justify-between">
        <Link href="/" className="flex items-center">
          <Image src="/gateway_logo.png" alt="LOGO" width={50} height={50} />
          <p className="text-white font-bold text-2xl ml-2">GATEWAY</p>
        </Link>

        <div className="md:flex items-center">{renderBtn()}</div>
      </div>
    </ComponentLayout>
  );
};

export default Header;
