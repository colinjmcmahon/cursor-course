import Link from "next/link"

export const metadata = {
  title: "Sign-in error",
  description: "Authentication could not be completed",
}

export default function AuthCodeErrorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center overflow-x-hidden bg-zinc-50 px-4 py-12 sm:px-6">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-xl font-semibold text-zinc-900">Sign-in could not be completed</h1>
        <p className="mt-2 text-sm leading-6 text-zinc-600">
          The link may have expired or something went wrong during sign-in. Try again from the home page.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-zinc-900 px-5 text-sm font-medium text-zinc-50 transition-colors hover:bg-zinc-700 sm:w-auto"
        >
          Back to home
        </Link>
      </div>
    </div>
  )
}
