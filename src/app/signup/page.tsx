export default function Signup() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="bg-purple-900 p-8 rounded-xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Create Your Account
        </h1>

        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded bg-black border border-gray-600"
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded bg-black border border-gray-600"
          />

          <button className="bg-pink-500 py-3 rounded hover:bg-pink-600 transition">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}