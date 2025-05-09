'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Session } from '@supabase/supabase-js'

export default function useUser(): Session | null {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    // Make sure we're running on the client
    if (typeof window === 'undefined') return

    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setSession(session)
    }

    getSession()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  return session
}

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
    })

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
      }
    )

    return () => {
      listener?.subscription.unsubscribe()
    }
  }, [])

  return session
}
