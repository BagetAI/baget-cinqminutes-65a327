import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { randomUUID } from "crypto";

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const sql = getDb();

    // Fetch posts
    const posts = await sql`
      SELECT "id", "user_id", "user_name", "day_number", "category", "content", "likes_count", "created_at"
      FROM "community_posts"
      ORDER BY "created_at" DESC
      LIMIT 50
    `;

    // Fetch replies for these posts
    const postIds = posts.map((p) => p.id);
    let replies: any[] = [];
    if (postIds.length > 0) {
      replies = await sql`
        SELECT "id", "post_id", "user_id", "user_name", "content", "created_at"
        FROM "community_replies"
        ORDER BY "created_at" ASC
      `;
    }

    // Group replies by post_id
    const repliesByPost: Record<string, any[]> = {};
    replies.forEach((r) => {
      if (!repliesByPost[r.post_id]) {
        repliesByPost[r.post_id] = [];
      }
      repliesByPost[r.post_id].push(r);
    });

    const postsWithReplies = posts.map((p) => ({
      ...p,
      replies: repliesByPost[p.id] || [],
    }));

    return NextResponse.json({ posts: postsWithReplies });
  } catch (error) {
    console.error("Error in GET /api/community:", error);
    return NextResponse.json(
      { error: "Failed to fetch community discussions" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { content, category = "Question", dayNumber = 1 } = body;

    if (!content || typeof content !== "string" || content.trim().length === 0) {
      return NextResponse.json({ error: "Content cannot be empty" }, { status: 400 });
    }

    const sql = getDb();
    const id = randomUUID();
    const userName = session.user.name || "Membre CinqMinutes";

    await sql`
      INSERT INTO "community_posts" ("id", "user_id", "user_name", "day_number", "category", "content", "likes_count", "created_at")
      VALUES (${id}, ${session.user.id}, ${userName}, ${dayNumber}, ${category}, ${content.trim()}, 0, NOW())
    `;

    return NextResponse.json({
      success: true,
      post: {
        id,
        user_id: session.user.id,
        user_name: userName,
        day_number: dayNumber,
        category,
        content: content.trim(),
        likes_count: 0,
        created_at: new Date().toISOString(),
        replies: [],
      },
    });
  } catch (error) {
    console.error("Error in POST /api/community:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
