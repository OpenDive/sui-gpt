import { NextResponse, NextRequest } from "next/server";
import { Todos } from "../../../lib/TodosClass";

export async function GET(req: NextRequest) {
  var address =  req.nextUrl.searchParams.get("address") || "";

  console.log("ADDRESS: " + address);
  const collectionsResponse = await Todos.getAccountsCollections(address);
  console.log("COLLECTIONS RESPONSE: " + JSON.stringify(collectionsResponse));
  return NextResponse.json(
    {
      collectionResponse: collectionsResponse,
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