import { JsonRpcProvider, SuiTransactionBlockResponse, PaginatedObjectsResponse } from '@mysten/sui.js';

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

  async getOwnedObjects(address: string): Promise<PaginatedObjectsResponse> {
    const provider = new JsonRpcProvider()
    const objects = await provider.getOwnedObjects({owner: address})
    console.log(objects)
    return objects
  }
}

const Transaction = new TransactionClass()

export { Transaction }