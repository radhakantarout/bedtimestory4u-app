import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { text, voiceId } = await req.json();

  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": process.env.ELEVENLABS_API_KEY!,
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_monolingual_v1",
        }),
      }
    );

    const audioBuffer = await response.arrayBuffer();

    return new Response(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Audio generation failed" }, { status: 500 });
  }
}