import { atom } from "recoil";

export enum TransactionStatus {
  IDLE = "IDLE",
  EXECUTING = "EXECUTING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
}

export enum TransactionType {
  ACTION = "ACTION",
  UPLOAD = "UPLOAD",
}
export type TypeTransactionStatus = {
  status: TransactionStatus;
  type: TransactionType;
};

export const transactionStatusAtom = atom<TypeTransactionStatus>({
  key: `transactionStatus`,
  default: {
    status: TransactionStatus.IDLE,
    type: TransactionType.UPLOAD,
  },
});
