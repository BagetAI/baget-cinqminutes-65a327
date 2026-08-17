import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const sql = getDb();

    // 1. Ensure user_progress row exists
    let progressRows = await sql`
      SELECT * FROM "user_progress" WHERE "user_id" = ${userId} LIMIT 1
    `;

    if (progressRows.length === 0) {
      const defaultProjectTitle = `Projet de ${session.user.name || "Création"}`;
      await sql`
        INSERT INTO "user_progress" ("user_id", "current_day", "streak_count", "xp_points", "project_title")
        VALUES (${userId}, 1, 1, 0, ${defaultProjectTitle})
        ON CONFLICT ("user_id") DO NOTHING
      `;
      progressRows = await sql`
        SELECT * FROM "user_progress" WHERE "user_id" = ${userId} LIMIT 1
      `;
    }

    const progress = progressRows[0] || {
      current_day: 1,
      streak_count: 1,
      xp_points: 0,
      project_title: `Projet de ${session.user.name || "Création"}`,
      project_description: "",
      target_audience: "",
      activity_type: "",
      daily_goal_time: 5,
      reminder_time: "09:00",
    };

    // 2. Fetch completed lessons for this user
    const completionRows = await sql`
      SELECT "day_number", "deliverable_key", "deliverable_value", "completed_at"
      FROM "user_lesson_completions"
      WHERE "user_id" = ${userId}
      ORDER BY "day_number" ASC
    `;

    const completedDays = completionRows.map((r) => Number(r.day_number));
    const deliverablesMap: Record<string, string> = {};
    completionRows.forEach((r) => {
      if (r.deliverable_key) {
        deliverablesMap[r.deliverable_key as string] = (r.deliverable_value as string) || "";
      }
    });

    return NextResponse.json({
      user: {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
      },
      progress: {
        currentDay: progress.current_day,
        streakCount: progress.streak_count,
        xpPoints: progress.xp_points,
        projectTitle: progress.project_title,
        projectDescription: progress.project_description || "",
        targetAudience: progress.target_audience || "",
        activityType: progress.activity_type || "",
        dailyGoalTime: progress.daily_goal_time || 5,
        reminderTime: progress.reminder_time || "09:00",
      },
      completedDays,
      deliverablesMap,
    });
  } catch (error) {
    console.error("Error in GET /api/user/progress:", error);
    return NextResponse.json(
      { error: "Failed to fetch user progress" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const body = await request.json();
    const {
      projectTitle,
      projectDescription,
      targetAudience,
      activityType,
      currentDay,
      dailyGoalTime,
      reminderTime,
    } = body;

    const sql = getDb();

    await sql`
      INSERT INTO "user_progress" (
        "user_id", "project_title", "project_description", "target_audience",
        "activity_type", "current_day", "daily_goal_time", "reminder_time", "updated_at"
      )
      VALUES (
        ${userId},
        ${projectTitle !== undefined ? projectTitle : "Mon Projet d'Activité"},
        ${projectDescription !== undefined ? projectDescription : null},
        ${targetAudience !== undefined ? targetAudience : null},
        ${activityType !== undefined ? activityType : null},
        ${currentDay !== undefined ? currentDay : 1},
        ${dailyGoalTime !== undefined ? dailyGoalTime : 5},
        ${reminderTime !== undefined ? reminderTime : "09:00"},
        NOW()
      )
      ON CONFLICT ("user_id") DO UPDATE SET
        "project_title" = COALESCE(${projectTitle !== undefined ? projectTitle : null}, "user_progress"."project_title"),
        "project_description" = COALESCE(${projectDescription !== undefined ? projectDescription : null}, "user_progress"."project_description"),
        "target_audience" = COALESCE(${targetAudience !== undefined ? targetAudience : null}, "user_progress"."target_audience"),
        "activity_type" = COALESCE(${activityType !== undefined ? activityType : null}, "user_progress"."activity_type"),
        "current_day" = COALESCE(${currentDay !== undefined ? currentDay : null}, "user_progress"."current_day"),
        "daily_goal_time" = COALESCE(${dailyGoalTime !== undefined ? dailyGoalTime : null}, "user_progress"."daily_goal_time"),
        "reminder_time" = COALESCE(${reminderTime !== undefined ? reminderTime : null}, "user_progress"."reminder_time"),
        "updated_at" = NOW()
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in PATCH /api/user/progress:", error);
    return NextResponse.json(
      { error: "Failed to update user progress" },
      { status: 500 }
    );
  }
}
