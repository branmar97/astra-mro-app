'use server'

import createSupabaseClient from '../../../lib/supabase/supabaseClient'
import prisma from "../../../lib/prisma/prismaClient"
import { NewUserData } from '@/components/auth/signupForm'
import { redirect } from 'next/navigation'

export const signupAction = async (user: NewUserData) => {
    const supabase = await createSupabaseClient()
    const { firstName, lastName, phone, email, password } = user

    // check if user already exists. if exists throw error message
    const existingUser = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (existingUser?.email) throw new Error('Unable to complete signup. User already exists.')
    
    // create user in supabase
    const signupUserResponse = await supabase.auth.signUp({
        email,
        password
    })

    // get auth id from supabase response
    const supabaseUserId = signupUserResponse.data.user?.id

    if (!supabaseUserId) throw new Error('Supabase user ID not found.')

    // add to user table in public schema
    await prisma.user.create({
        data: {
            supabase_id: supabaseUserId,
            client_id: 1,
            first_name: firstName,
            last_name: lastName,
            email,
            phone
        }
    })
 
    redirect('/')
}
