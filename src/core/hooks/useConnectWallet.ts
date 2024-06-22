import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { ConstantineInfo } from "../config/chainInfo";
import { GetInfoType } from "@/pages";
import { GasPrice } from "@cosmjs/stargate";

const connectWallet = async (event: any, { getInfo }: GetInfoType) => {
  event.preventDefault();
  if (!window.getOfflineSigner || !window.keplr) {
    throw new Error("Please install keplr extension");
  }

  if (window.keplr.experimentalSuggestChain) {
    try {
      await window.keplr.experimentalSuggestChain(ConstantineInfo);
    } catch (error) {
      alert("Failed to suggest the chain");
    }
  } else {
    alert("Please use the recent version of keplr extension");
  }

  await window.keplr.enable(ConstantineInfo.chainId);
  const offlineSigner = await window.getOfflineSigner(ConstantineInfo.chainId);
  const accounts = await offlineSigner.getAccounts();
  const gasPrice = GasPrice.fromString(
    "0" + ConstantineInfo.currencies[0].coinMinimalDenom
  );
  const client = await SigningCosmWasmClient.connectWithSigner(
    ConstantineInfo.rpc,
    offlineSigner,
    {
      gasPrice,
    }
  );
  const balance = await client.getBalance(
    accounts[0].address,
    ConstantineInfo.currencies[0].coinMinimalDenom
  );

  getInfo(client, accounts[0].address, balance);
};

export default connectWallet;
