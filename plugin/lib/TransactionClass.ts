import { JsonRpcProvider, SuiTransactionBlockResponse } from '@mysten/sui.js';

interface Transaction {
  [key: string]: string
}
type TransactionType = Transaction[]

class TransactionClass {
  async getTransaction(digest: string): Promise<SuiTransactionBlockResponse> {
    const provider = new JsonRpcProvider();
    const tx = await provider.getTransactionBlock({
      digest: digest,
      options: { showInput: true }
    });
    console.log(tx)
    return tx
  }
}

const Transaction = new TransactionClass()

export { Transaction }