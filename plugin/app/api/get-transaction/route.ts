import { NextResponse, NextRequest } from "next/server";
import { Todos } from "../../../lib/TodosClass";

export async function GET(req: NextRequest) {
  // const body = await req.json()
  // console.log("GETTING TRANSACTION: " + body);
  var xDigest =  req.nextUrl.searchParams.get("digest");
  var txnDigest = req.nextUrl.searchParams.get("transaction");

  console.log("digest: " + xDigest);
  console.log("transaction: " + txnDigest);

  var digest = "";
  if(xDigest == null){
    digest = txnDigest || "";
  } else {
    digest = xDigest
  }

  console.log("DIGEST: " + digest);
  const txn = await Todos.getTransaction(digest);
  console.log("TRANSACTION: " + JSON.stringify(txn));
  return NextResponse.json(
    {
      transaction: txn,
    },
    {
      status: 200,
      headers: {
        // "Access-Control-Allow-Origin": "https://chat.openai.com",
        "Access-Control-Allow-Origin": "http://localhost:3010",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, openai-ephemeral-user-id, openai-conversation-id",
      },
    }
  );
}

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        // "Access-Control-Allow-Origin": "https://chat.openai.com",
        // "Access-Control-Allow-Origin": "http://0.0.0.0:3010/chat",
        "Access-Control-Allow-Origin": "http://localhost:3010",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, openai-ephemeral-user-id, openai-conversation-id",
      },
    }
  );
}