import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as Blob;

  const elevenResponse = await fetch(
    "https://api.elevenlabs.io/v1/voices/add",
    {
      method: "POST",
      headers: {
        "xi-api-key": process.env.ELEVENLABS_API_KEY!,
      },
      body: (() => {
        const data = new FormData();
        data.append("name", "ParentVoice");
        data.append("files", file);
        return data;
      })(),
    }
  );

  const data = await elevenResponse.json();

  return NextResponse.json({
    voiceId: data.voice_id,
  });
}