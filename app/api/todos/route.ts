import { NextResponse } from "next/server";
import { Todos } from "../../../lib/TodosClass";

export async function GET() {
  console.log("GETTING TODOS: " + Todos.getTodos());
  return NextResponse.json(
    {
      todos: Todos.getTodos(),
    },
    {
      status: 200,
      headers: {
        // "Access-Control-Allow-Origin": "https://chat.openai.com",
        "Access-Control-Allow-Origin": "http://0.0.0.0:3010/chat",
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
        "Access-Control-Allow-Origin": "http://:3010/chat",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, openai-ephemeral-user-id, openai-conversation-id",
      },
    }
  );
}