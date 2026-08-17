import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { randomUUID } from "crypto";

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const body = await request.json();
    const { dayNumber, deliverableKey, deliverableValue, markCompleted = true } = body;

    if (!dayNumber || typeof dayNumber !== "number") {
      return NextResponse.json({ error: "Invalid dayNumber" }, { status: 400 });
    }

    const sql = getDb();

    if (markCompleted) {
      const id = randomUUID();
      const safeKey = deliverableKey || `day_${dayNumber}`;
      const safeVal = typeof deliverableValue === "string" ? deliverableValue : "";

      await sql`
        INSERT INTO "user_lesson_completions" ("id", "user_id", "day_number", "deliverable_key", "deliverable_value", "updated_at")
        VALUES (${id}, ${userId}, ${dayNumber}, ${safeKey}, ${safeVal}, NOW())
        ON CONFLICT ("user_id", "day_number")
        DO UPDATE SET
          "deliverable_key" = EXCLUDED."deliverable_key",
          "deliverable_value" = EXCLUDED."deliverable_value",
          "updated_at" = NOW()
      `;

      // Get count of completed lessons
      const countResult = await sql`
        SELECT COUNT(*)::int as count FROM "user_lesson_completions" WHERE "user_id" = ${userId}
      `;
      const completedCount = Number(countResult[0]?.count || 1);
      const newXp = completedCount * 50;

      // Update progress with next day suggestion and xp
      await sql`
        INSERT INTO "user_progress" ("user_id", "current_day", "streak_count", "xp_points", "updated_at")
        VALUES (${userId}, ${Math.min(30, dayNumber + 1)}, ${completedCount}, ${newXp}, NOW())
        ON CONFLICT ("user_id") DO UPDATE SET
          "xp_points" = ${newXp},
          "streak_count" = GREATEST("user_progress"."streak_count", ${completedCount}),
          "current_day" = CASE
            WHEN "user_progress"."current_day" <= ${dayNumber} AND ${dayNumber} < 30
            THEN ${dayNumber + 1}
            ELSE "user_progress"."current_day"
          END,
          "updated_at" = NOW()
      `;
    } else {
      // Un-mark completion
      await sql`
        DELETE FROM "user_lesson_completions"
        WHERE "user_id" = ${userId} AND "day_number" = ${dayNumber}
      `;

      const countResult = await sql`
        SELECT COUNT(*)::int as count FROM "user_lesson_completions" WHERE "user_id" = ${userId}
      `;
      const completedCount = Number(countResult[0]?.count || 0);
      const newXp = completedCount * 50;

      await sql`
        UPDATE "user_progress"
        SET "xp_points" = ${newXp}, "updated_at" = NOW()
        WHERE "user_id" = ${userId}
      `;
    }

    // Return fresh completions and progress
    const allCompletions = await sql`
      SELECT "day_number", "deliverable_key", "deliverable_value"
      FROM "user_lesson_completions"
      WHERE "user_id" = ${userId}
      ORDER BY "day_number" ASC
    `;

    const completedDays = allCompletions.map((r) => Number(r.day_number));
    const deliverablesMap: Record<string, string> = {};
    allCompletions.forEach((r) => {
      deliverablesMap[r.deliverable_key as string] = (r.deliverable_value as string) || "";
    });

    const progressRows = await sql`
      SELECT * FROM "user_progress" WHERE "user_id" = ${userId} LIMIT 1
    `;
    const progress = progressRows[0];

    return NextResponse.json({
      success: true,
      completedDays,
      deliverablesMap,
      progress: {
        currentDay: progress?.current_day || dayNumber,
        streakCount: progress?.streak_count || 1,
        xpPoints: progress?.xp_points || 0,
      },
    });
  } catch (error) {
    console.error("Error in POST /api/user/lessons/complete:", error);
    return NextResponse.json(
      { error: "Failed to update lesson completion" },
      { status: 500 }
    );
  }
}
