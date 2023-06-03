import { JsonRpcProvider, SuiTransactionBlockResponse } from '@mysten/sui.js';

interface Transaction {
  [key: string]: string
}
type TransactionType = Transaction[]

class TransactionClass {
  async getTransaction(digest: string): Promise<SuiTransactionBlockResponse> {
    console.log("getTransaction digest: " + digest)
    const provider = new JsonRpcProvider();
    const tx = await provider.getTransactionBlock({
      digest: digest,
      options: { showInput: true, showEffects: true }
    });
    return tx
  }
}

const Transaction = new TransactionClass()

export { Transaction }