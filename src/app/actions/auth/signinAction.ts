'use server'

import { redirect } from 'next/navigation'
import createSupabaseClient from '../../../../lib/supabase/supabaseClient'
import { LoginUserData } from '@/components/auth/signinForm'

export const signinAction = async (user: LoginUserData) => {
    const supabase = await createSupabaseClient()

    const { error } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: user.password
    })

    if (error) {
        console.error('Error in signinAction: ', error)
        return JSON.stringify({ error: error.message })
    }

    redirect('/')
}

