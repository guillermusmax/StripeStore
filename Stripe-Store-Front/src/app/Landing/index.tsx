import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center ">
      <h1 className="text-4xl font-bold mb-8">Welcome to Our Online Store</h1>
      <div className="space-x-4">
        <Link
          href="/signup"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Sign Up
        </Link>
        <Link
          href="/login"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </Link>
        <Link
          href="/home"
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
        >
          Browse Store
        </Link>
      </div>
    </div>
  );
}
