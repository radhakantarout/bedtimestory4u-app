import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  const { childName, age, theme, length } = await req.json();

  const prompt = `
  Write a ${length} bedtime story for a ${age}-year-old child named ${childName}.
  The theme should be ${theme}.
  Make it magical, warm, and calming.
  End with a gentle goodnight message.
  `;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return NextResponse.json({
    story: completion.choices[0].message.content,
  });
}