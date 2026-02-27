"use client";

import { useState } from "react";

export default function CreateStoryCard() {
  const [childName, setChildName] = useState("");
  const [age, setAge] = useState("");
  const [theme, setTheme] = useState("");
  const [length, setLength] = useState("short");
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");

  const generateStory = async () => {
    try {
      const response = await fetch("/api/generate-story", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          childName,
          age,
          theme,
          length,
        }),
      });

      const data = await response.json();
      return data.story;
    } catch (error) {
      console.error(error);
      alert("Something went wrong while generating the story");
      return null;
    }
  };

  const generateAudio = async () => {
    setLoading(true);
    setAudioUrl("");

    const generatedStory = await generateStory();
    if (!generatedStory) {
      setLoading(false);
      return;
    }

    setStory(generatedStory);

    try {
      const response = await fetch("/api/generate-audio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: generatedStory,
          voiceId: "NQux3HSK2FL69zwWs703",
        }),
      });

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (error) {
      console.error(error);
      alert("Something went wrong while generating the audio");
    }

    setLoading(false);
  };

  return (
    <div className="w-full max-w-xl bg-purple-900 p-8 rounded-xl">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Create a Magical Story 🌙
      </h1>

      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Child's Name"
          value={childName}
          onChange={(e) => setChildName(e.target.value)}
          className="p-3 rounded bg-black border border-gray-600"
        />

        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="p-3 rounded bg-black border border-gray-600"
        />

        <input
          type="text"
          placeholder="Theme"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="p-3 rounded bg-black border border-gray-600"
        />

        <select
          value={length}
          onChange={(e) => setLength(e.target.value)}
          className="p-3 rounded bg-black border border-gray-600"
        >
          <option value="short">Short (2-3 min)</option>
          <option value="medium">Medium (5 min)</option>
          <option value="long">Long (8-10 min)</option>
        </select>

        <button
          onClick={generateAudio}
          className="bg-pink-500 py-3 rounded hover:bg-pink-600 transition"
        >
          {loading ? "Generating Voice..." : "Generate Voice 🎙️"}
        </button>
      </div>

      {audioUrl && (
        <audio controls className="mt-4 w-full">
          <source src={audioUrl} type="audio/mpeg" />
        </audio>
      )}
    </div>
  );
}