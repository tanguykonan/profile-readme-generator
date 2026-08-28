import { NextResponse } from "next/server";
import { enhanceContent } from "@/lib/ai-service";
import type { AIEnhanceRequest } from "@/lib/types";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AIEnhanceRequest;

    if (!body || !body.action) {
      return NextResponse.json(
        { success: false, error: "Action is required" },
        { status: 400 }
      );
    }

    const response = await enhanceContent(body);
    return NextResponse.json(response);
  } catch (error) {
    console.error("AI Enhance API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
