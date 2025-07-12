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
    <div className="max-w-md mx-auto py-12 text-center">
      <h1 className="text-2xl font-bold mb-4">🎉 Account Confirmed!</h1>
      <p className="mb-6">
        Thanks, <strong>{user.email}</strong>—your email is verified and you’re now signed in.
      </p>
      <button
        className="px-5 py-2 bg-blue-600 text-white rounded"
        onClick={() => router.push("/")}
      >
        Back to Home
      </button>
    </div>
  )
}
