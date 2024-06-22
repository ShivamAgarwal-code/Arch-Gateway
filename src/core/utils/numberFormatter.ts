import Big from "big.js";

export const sliceAddress = (address: string, length: number) => {
  return `${address.slice(0, length)}...${address.slice(-length)}`;
};

export const ParseDecimal = (amount: string, decimal: number) => {
  return Big(amount).div(Big(10).pow(decimal)).toFixed(2);
};
