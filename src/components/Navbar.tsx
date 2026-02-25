"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full px-8 py-4 flex justify-between items-center bg-black text-white">
      
      <Link href="/" className="text-2xl font-bold text-pink-400">
        BedtimeStory4U
      </Link>

      <div className="flex gap-4">
        <Link
            href="/create-story"
            className="px-4 py-2 hover:text-pink-400 transition"
        >
            Create Story
        </Link>
        <Link
          href="/login"
          className="px-4 py-2 border border-white rounded-full hover:bg-white hover:text-black transition"
        >
          Login
        </Link>

        <Link
          href="/signup"
          className="px-4 py-2 bg-pink-500 rounded-full hover:bg-pink-600 transition"
        >
          Get  Started
        </Link>

        <Link href="/clone-voice" className="px-4 py-2 hover:text-pink-400">
          Clone Voice
        </Link>
      </div>
    </nav>
  );
}