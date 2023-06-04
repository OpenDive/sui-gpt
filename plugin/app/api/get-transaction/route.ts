import { NextResponse, NextRequest } from "next/server";
import { Todos } from "../../../lib/TodosClass";

export async function GET(req: NextRequest) {
  // const body = await req.json()
  // console.log("GETTING TRANSACTION: " + body);
  const digest =  req.nextUrl.searchParams.get("digest");
  console.log("DIGEST: " + digest);
  return NextResponse.json(
    {
      transaction: await Todos.getTransaction("5xyArSQySwQrCdEUigZDDdhJdAWApGYqZcrPJ2bbidCw"),
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