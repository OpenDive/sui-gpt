import { NextResponse, NextRequest } from "next/server";
import { Transaction } from "../../../lib/TransactionClass";

export async function GET(req: NextRequest) {
  const body = await req.json()
  const tx = await Transaction.getTransaction(body)
  return NextResponse.json(
    {
      transaction: tx,
    },
    {
      status: 200,
      headers: {
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
        "Access-Control-Allow-Origin": "http://localhost:3010",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, openai-ephemeral-user-id, openai-conversation-id",
      },
    }
  );
}