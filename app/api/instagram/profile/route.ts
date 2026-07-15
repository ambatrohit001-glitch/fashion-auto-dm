import { NextResponse } from "next/server";
import { getInstagramProfile } from "@/services/instagram/instagram.service";

export async function GET() {
  try {
    const profile = await getInstagramProfile();

    return NextResponse.json(profile);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}