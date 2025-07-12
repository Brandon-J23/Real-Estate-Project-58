// app/sign-up-conf/page.tsx
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
    
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 font-inter">
      {/* WolfieWorks Logo */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-6">
          <GraduationCap className="h-8 w-8 text-red-600" />
          <span className="text-2xl font-bold text-gray-900">WolfieWorks</span>
        </div>
      </div>

      {/* Confirmation Card */}
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">🎉 Account Confirmed!</h2>
        <p className="mb-6">
        Thanks, <strong>{user.email}</strong>—your email is verified and you’re now signed in.
        </p>
        <button
          className="px-5 py-2 bg-blue-600 text-white rounded"
          onClick={() => router.push("/")}
        >
          Back to Home Page
        </button>
      </div>

      {/* Optional: Footer or additional info */}
      <p className="mt-8 text-gray-500 text-sm">
        Thank you for joining PrimeRealty!
      </p>
    </div>
  );
}
