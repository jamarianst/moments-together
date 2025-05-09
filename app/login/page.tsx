/*
'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '/Users/jah/Desktop/moments-together/app/supabaseClient.ts'
import useUser from '@/hooks/useUser'

export default function LoginPage() {
  const session = useUser()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push('/') // redirect to homepage or dashboard
    }
  }, [session, router])

  return (
    <div className="flex justify-center p-8">
      <div className="w-full max-w-md p-6 rounded-xl bg-zinc-900 shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-white">Login</h2>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={[]}
        />
      </div>
    </div>
  )
}
*/

/*
'use client'

import { useEffect, useState } from 'react'
import useUser from '/Users/jah/Desktop/moments-together/hooks/useUser.ts'
import { supabase } from '/Users/jah/Desktop/moments-together/app/supabaseClient.ts'
import BucketList from '@/components/BucketList'

export default function HomePage() {
  const session = useUser()
  const [coupleId, setCoupleId] = useState<string | null>(null)

  // Fetch couple ID associated with the logged-in user
  useEffect(() => {
    const getCoupleId = async () => {
      if (!session?.user) return

      const { data, error } = await supabase
        .from('couples')
        .select('id')
        .or(`user1_id.eq.${session.user.id},user2_id.eq.${session.user.id}`)
        .single()

      if (error) {
        console.error('Error fetching couple ID:', error.message)
      } else {
        setCoupleId(data.id)
      }
    }

    getCoupleId()
  }, [session])

  if (!session) {
    return (
      <div className="p-8 text-white">
        <h1 className="text-2xl">Please log in to view your bucket list.</h1>
      </div>
    )
  }

  if (!coupleId) {
    return (
      <div className="p-8 text-white">
        <h1 className="text-2xl">Loading your couple profile...</h1>
      </div>
    )
  }

  return (
    <main className="p-6">
      <BucketList coupleId={coupleId} />
    </main>
  )
}
*/

'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '/Users/jah/Desktop/moments-together/app/supabaseClient.ts'
import useUser from '@/hooks/useUser'

export default function LoginPage() {
  const session = useUser()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push('/') // Redirect after login
    }
  }, [session, router])

  return (
    <div className="flex justify-center p-8">
      <div className="w-full max-w-md p-6 rounded-xl bg-zinc-900 shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-white">Login</h2>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={[]}
        />
      </div>
    </div>
  )
}





