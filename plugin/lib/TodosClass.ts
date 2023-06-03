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

 async getBalance():Promise<string> {
  const provider = new JsonRpcProvider(mainnetConnection);
  // If coin type is not specified, it defaults to 0x2::sui::SUI
  const coinBalance = await provider.getBalance({
    owner: '0x9ccae709d2271c28bbf695293243315ef7342e8e2cc927fa651ad3fbfc7bda9f',
    // coinType:
    //   // '0x65b0553a591d7b13376e03a408e112c706dc0909a79080c810b93b06f922c458::usdc::USDC',
    //   '0x2::sui::SUI',
  });
    
  console.log(JSON.stringify(coinBalance));
  console.log("USDC COINS: " + coinBalance.totalBalance);
  return coinBalance.totalBalance;
  }

  async getTransaction():Promise<SuiTransactionBlockResponse> {
    const provider = new JsonRpcProvider(mainnetConnection);
    const txn = await provider.getTransactionBlock({
      digest: '5xyArSQySwQrCdEUigZDDdhJdAWApGYqZcrPJ2bbidCw',
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
}

const Todos = new TodosClass() // initialize the instance

export { Todos }