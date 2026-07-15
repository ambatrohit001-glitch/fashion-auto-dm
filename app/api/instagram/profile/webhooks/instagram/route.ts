import { NextRequest, NextResponse } from "next/server";

const VERIFY_TOKEN = process.env.INSTAGRAM_VERIFY_TOKEN;

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (
    mode === "subscribe" &&
    token === VERIFY_TOKEN &&
    challenge
  ) {
    console.log("✅ Webhook Verified");

    return new Response(challenge, {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  return NextResponse.json(
    {
      error: "Forbidden",
    },
    {
      status: 403,
    }
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log("📩 Instagram Event Received");
    console.log(JSON.stringify(body, null, 2));

    // TODO:
    // 1. Detect comment event
    // 2. Find matching automation
    // 3. Send DM
    // 4. Save analytics

    return NextResponse.json({
      received: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Invalid payload",
      },
      {
        status: 400,
      }
    );
  }
}