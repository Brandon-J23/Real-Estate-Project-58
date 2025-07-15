// app/sign-up-conf/page.tsx (real estate)
"use client"

import { useEffect, useState } from "react"
import { useRouter }        from "next/navigation"
import { supabase }         from "./lib/supabase"

export default function SignUpConfPageComponent() {
  const router  = useRouter()
  const [loading, setLoading] = useState(true)
  const [user,    setUser]    = useState<{ email: string } | null>(null)

  useEffect(() => {
    // on mount, grab the just-signed-in session
    supabase.auth.getSession().then(({ data }) => {
      const user = data.session?.user
      setUser(user && user.email ? { email: user.email } : null)
      setLoading(false)
    })
  }, [])

  if (loading) return <p>Checking your account…</p>
  if (!user)    return <p>Hmm, something went wrong. <a href="/sign-up">Try again?</a></p>

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 font-sans">
      {/* Tailwind CSS CDN for styling */}
      <script src="https://cdn.tailwindcss.com"></script>
      {/* Font Inter */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>
        {`
          body {
            font-family: 'Inter', sans-serif;
          }
        `}
      </style>

      <div className="mb-8">
        {/* PrimeRealty Logo */}
        <a href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-house h-5 w-5 text-white">
              <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
              <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            </svg>
          </div>
          <span className="text-gray-800 text-2xl font-bold">PrimeRealty</span>
        </a>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Sign Up Confirmation</h2>
        <p className="text-gray-600 mb-6">
          Thanks, <strong>{user.email}</strong>—your email is verified and you’re now signed in.
        </p>
        <button
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={() => router.push("/")}
        >
          Back to Home Page
        </button>
      </div>

      <p className="mt-8 text-gray-500 text-sm">Thank you for joining PrimeRealty!</p>
    </div>
  );
}
