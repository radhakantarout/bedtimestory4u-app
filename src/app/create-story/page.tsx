"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";

export default function CreateStory() {
  const [childName, setChildName] = useState("");
  const [age, setAge] = useState("");
  const [theme, setTheme] = useState("");
  const [length, setLength] = useState("short");
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);

  const generateStory = async () => {
    setLoading(true);
    setStory("");

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
      setStory(data.story);
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-black text-white p-8 flex flex-col items-center">
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
              placeholder="Theme (e.g., Space, Jungle, Princess)"
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
              onClick={generateStory}
              className="bg-pink-500 py-3 rounded hover:bg-pink-600 transition"
            >
              {loading ? "Generating..." : "Generate Story"}
            </button>
          </div>
        </div>

        {story && (
          <div className="mt-10 w-full max-w-2xl bg-purple-950 p-6 rounded-xl">
            <h2 className="text-xl font-bold mb-4">Your Story ✨</h2>
            <p className="whitespace-pre-wrap text-gray-200">{story}</p>
          </div>
        )}
      </div>
    </>
  );
}