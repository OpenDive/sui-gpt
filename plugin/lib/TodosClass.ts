// import axios, { AxiosResponse } from 'axios';
// import * as http from 'http'

import fetch from 'node-fetch';



import { JsonRpcProvider, 
  devnetConnection, getTransaction, mainnetConnection,
  SuiTransactionBlockResponse } from '@mysten/sui.js';


interface Todo {
  [key: string]: string
}
type TodosType = Todo[]

interface TxDigest {
  [key: string]: string
}

interface Collection {
  objectType: string,
  package: string,
  name: string,
  imageURL: string,
  projectURL: string,
  description: string,
  standard: "",
  quantity: number
}

interface CollectionResponse {
  code: number,
  message: string,
  result: {
    data: Collection[]
  }
}

class TodosClass {
  todos: TodosType = []
  createTodo = (todo: Todo) => {
    this.todos = [...this.todos, todo]
  }
  getTodos():TodosType {
    return this.todos
  }
  deleteTodo(todo:Todo):void {
    const index = this.todos.findIndex(item => item.todo === todo.todo)
    this.todos.splice(index, 1)
  }

 async getBalance(publicKey: string):Promise<string> {
  const provider = new JsonRpcProvider(mainnetConnection);
  // If coin type is not specified, it defaults to 0x2::sui::SUI
  const coinBalance = await provider.getBalance({
    // owner: '0x9ccae709d2271c28bbf695293243315ef7342e8e2cc927fa651ad3fbfc7bda9f',
    owner: publicKey,
    // coinType:
    //   // '0x65b0553a591d7b13376e03a408e112c706dc0909a79080c810b93b06f922c458::usdc::USDC',
    //   '0x2::sui::SUI',
  });
    
  console.log(JSON.stringify(coinBalance));
  console.log("USDC COINS: " + coinBalance.totalBalance);
  return coinBalance.totalBalance;
  }

  async getTransaction(digest: string):Promise<SuiTransactionBlockResponse> {
    const provider = new JsonRpcProvider(mainnetConnection);
    const txn = await provider.getTransactionBlock({
      digest: digest,
      // only fetch the effects field
        options: {
            showEffects: true,
            showInput: false,
            showEvents: false,
            showObjectChanges: false,
            showBalanceChanges: false
        }
    }); 
    return txn;
  }

  async getAccountsCollections(address: string):Promise<CollectionResponse | null> {
    try {
      var endpoint = "https://api.blockvision.org/v2/sui/nft/accountCollection?owner=" + address + "&pageIndex=1&pageSize=20"
      // 👇️ const response: Response
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'x-api-key': '2QixnwI2XhnYcWP5wOHc4iWipKq'
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
  
      // 👇️ const result: GetUsersResponse
      const result = (await response.json()) as CollectionResponse;
  
      console.log('result is: ', JSON.stringify(result));
  
      return result;
    } catch (error) {
      // if (error instanceof Error) {
      //   console.log('error message: ', error.message);
      //   return error.message;
      // } else {
      //   console.log('unexpected error: ', error);
      //   return 'An unexpected error occurred';
      // }
      return null;
    }
  }


  //     --url 'https://api.blockvision.org/v2/sui/nft/accountCollection?owner=0x9ccae709d2271c28bbf695293243315ef7342e8e2cc927fa651ad3fbfc7bda9f&pageIndex=1&pageSize=20' \
  // async getAccountsCollections(address: string):Promise<AxiosResponse> {
  //   try {

  //     var endpoint = "https://api.blockvision.org/v2/sui/nft/accountCollection?owner=" + address + "&pageIndex=1&pageSize=20"
  //     // const { data, status } = await axios.get<CollectionResponse>(
  //     const dataCollection= await axios.get<CollectionResponse>(
  //       endpoint,
  //       {
  //         headers: {
  //           Accept: 'application/json',
  //           'x-api-key': '2QixnwI2XhnYcWP5wOHc4iWipKq'
  //         },
  //       },
  //     );
  
  //     console.log(JSON.stringify(data));
  
  //     // 👇️ "response status is: 200"
  //     console.log('response status is: ', status);
  
  //     // return data;
  //     return dataCollection;

  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //     //   console.log('error message: ', error.message);
  //     //   return error.message;
  //     // } else {
  //     //   console.log('unexpected error: ', error);
  //     //   return 'An unexpected error occurred';
  //     // }
  //   }
  // }
}

const Todos = new TodosClass() // initialize the instance

export { Todos }