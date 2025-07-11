
import PropertyPage from "../property-page"

export default function Page() {
  return <PropertyPage />
}

// app/page.tsx
/*
"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import PropertyPage from "../property-page"

export default function Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [justConfirmed, setJustConfirmed] = useState(false)

  useEffect(() => {
    if (searchParams.get("confirmed") === "true") {
      setJustConfirmed(true)
      // simply replace the URL so the popup won't re-fire on reload
      router.replace("/")
    }
  }, [searchParams, router])

  return (
    <>
      {justConfirmed && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-2">🎉 Account Confirmed</h2>
            <p>Your email is verified and you’re now signed in!</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
              onClick={() => setJustConfirmed(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <PropertyPage />
    </>
  )
}
*/
