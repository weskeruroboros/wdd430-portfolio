import { Suspense } from "react";
import Link from "next/link";
import { auth, signIn, signOut } from "@/auth";

async function AuthNav() {
  const session = await auth();

  if (session?.user) {
    return (
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
        className="flex items-center gap-3"
      >
        <span className="text-sm text-gray-300">Hi, {session.user.name}</span>
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-3 py-1.5 rounded transition"
        >
          Sign Out
        </button>
      </form>
    );
  }

  return (
    <form
      action={async () => {
        "use server";
        await signIn();
      }}
    >
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-3 py-1.5 rounded transition"
      >
        Sign In
      </button>
    </form>
  );
}

export default function Header() {
  return (
    <header className="bg-gray-800 text-white py-4 shadow">
      <div className="container mx-auto px-4 flex flex-wrap items-center justify-between gap-4">
        <Link href="/" className="text-xl font-bold tracking-tight hover:text-gray-200">
          Edward Tiyari
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/" className="hover:text-gray-300 transition">
            Home
          </Link>
          <Link href="/about" className="hover:text-gray-300 transition">
            About
          </Link>
          <Suspense fallback={<span className="text-sm text-gray-400">...</span>}>
            <AuthNav />
          </Suspense>
        </nav>
      </div>
    </header>
  );
}
