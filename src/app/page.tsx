import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
    <main className="min-h-screen bg-gradient-to-b from-purple-950 to-black text-white">
      
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          BedtimeStory4U
        </h1>

        <p className="text-xl md:text-2xl text-pink-400 mb-6">
          Stories in the Voice They Love ❤️
        </p>

        <p className="max-w-2xl text-gray-300 mb-10 text-lg">
          Create magical bedtime stories for your child, told in your own voice.
          Personalized with their name, filled with warmth, and designed to build
          beautiful bedtime memories.
        </p>

        <div className="flex gap-4">
          <button className="bg-pink-500 hover:bg-pink-600 px-6 py-3 rounded-full font-semibold transition">
            Try 3 Stories Free
          </button>

          <button className="border border-white px-6 py-3 rounded-full hover:bg-white hover:text-black transition">
            Learn More
          </button>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-black py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            <div>
              <h3 className="text-xl font-semibold mb-4">🎙 Upload Your Voice</h3>
              <p className="text-gray-400">
                Record a short sample of your voice once. We create your custom storytelling voice.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">✨ Create a Story</h3>
              <p className="text-gray-400">
                Enter your child’s name, choose a theme, and generate a magical bedtime story.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">🌙 Listen Together</h3>
              <p className="text-gray-400">
                Play the story in your own voice and create unforgettable bedtime moments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-500 text-sm">
        © {new Date().getFullYear()} BedtimeStory4U. All rights reserved.
      </footer>

    </main>
    </>
  );
}