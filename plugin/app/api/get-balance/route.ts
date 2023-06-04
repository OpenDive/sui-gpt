import { NextResponse, NextRequest } from "next/server";
import { Todos } from "../../../lib/TodosClass";

export async function GET(req: NextRequest) {
  console.log("GETTING COINS: " + Todos.getTodos());
  const publicKey =  req.nextUrl.searchParams.get("address");
  return NextResponse.json(
    {
      balance: await Todos.getBalance(publicKey || ""),
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