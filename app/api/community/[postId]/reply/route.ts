import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { randomUUID } from "crypto";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { postId } = await params;
    const body = await request.json();
    const { content } = body;

    if (!content || typeof content !== "string" || content.trim().length === 0) {
      return NextResponse.json({ error: "Content cannot be empty" }, { status: 400 });
    }

    const sql = getDb();
    const id = randomUUID();
    const userName = session.user.name || "Membre CinqMinutes";

    await sql`
      INSERT INTO "community_replies" ("id", "post_id", "user_id", "user_name", "content", "created_at")
      VALUES (${id}, ${postId}, ${session.user.id}, ${userName}, ${content.trim()}, NOW())
    `;

    return NextResponse.json({
      success: true,
      reply: {
        id,
        post_id: postId,
        user_id: session.user.id,
        user_name: userName,
        content: content.trim(),
        created_at: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Error in POST /api/community/[postId]/reply:", error);
    return NextResponse.json(
      { error: "Failed to post reply" },
      { status: 500 }
    );
  }
}
