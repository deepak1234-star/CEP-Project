import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { runEcoSortAgent } from "@/lib/ai/ecoSortAgent";
import { recordUserAgentActivity } from "@/lib/clerkActivity";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, prompt, history = [] } = body;

    const userPrompt = prompt || message;
    if (!userPrompt || typeof userPrompt !== "string") {
      return NextResponse.json(
        { success: false, error: "A message or prompt string is required." },
        { status: 400 }
      );
    }

    let fullPrompt = userPrompt;
    if (Array.isArray(history) && history.length > 0) {
      const formattedHistory = history
        .slice(-6)
        .map((h: { role: string; content: string }) => `${h.role === "user" ? "User" : "EcoSort AI"}: ${h.content}`)
        .join("\n");
      fullPrompt = `Previous conversation context:\n${formattedHistory}\n\nCurrent user question:\n${userPrompt}`;
    }

    const { result, modelUsed } = await runEcoSortAgent({
      prompt: fullPrompt,
    });

    const toolExecutions: Array<{ toolName: string; args: any; output: any }> = [];
    if (result.steps) {
      for (const step of result.steps) {
        if (step.toolCalls && step.toolCalls.length > 0) {
          for (const tc of step.toolCalls) {
            const anyTc = tc as any;
            const toolResult = step.toolResults?.find((tr: any) => tr.toolCallId === anyTc.toolCallId);
            toolExecutions.push({
              toolName: anyTc.toolName,
              args: anyTc.args ?? anyTc.input ?? {},
              output: toolResult ? (toolResult as any).result || (toolResult as any).output : undefined,
            });
          }
        }
      }
    }

    // If user is authenticated via Clerk, log learning activity and award eco points
    try {
      const { userId } = await auth();
      if (userId) {
        await recordUserAgentActivity(userId, userPrompt);
      }
    } catch (syncErr) {
      console.warn("Could not sync agent chat activity to Clerk:", syncErr);
    }

    return NextResponse.json({
      success: true,
      text: result.text,
      toolsUsed: toolExecutions,
      stepCount: result.steps?.length || 1,
      modelUsed,
    });
  } catch (error: any) {
    console.error("EcoSort AI Agent execution error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to process agent request",
      },
      { status: 500 }
    );
  }
}
