'use server'

import createSupabaseClient from '../../../../lib/supabase/supabaseClient'
import prisma from "../../../../lib/prisma/prismaClient"
import { NewUserData } from '@/components/auth/signupForm'
import { redirect } from 'next/navigation'

export const signupAction = async (user: NewUserData) => {
    try {
        const supabaseUserId = await createUserInSupabase(user.email, user.password)
        await createUserInPrisma(supabaseUserId, user)
    } catch (error) {
        console.error('Error in signupAction: ', error)
    }

    redirect('/')
};

export const checkExistingUserByEmail = async (email: string): Promise<boolean> => {
    const existingUser = await prisma.user.findFirst({
        where: {
            email: {
                equals: email,
                mode: 'insensitive'
            }
        },
    })

    return Boolean(existingUser)
}

const createUserInSupabase = async (email: string, password: string) => {
    const supabase = await createSupabaseClient();
    const signupUserResponse = await supabase.auth.signUp({
        email,
        password
    })

    const supabaseUserId = signupUserResponse.data.user?.id;

    if (!supabaseUserId) {
        throw new Error('Supabase user ID not found.');
    }

    return supabaseUserId
}

const createUserInPrisma = async (supabaseUserId: string, user: NewUserData) => {
    await prisma.user.create({
        data: {
            supabase_id: supabaseUserId,
            client_id: 1,
            first_name: user.firstName,
            last_name: user.lastName,
            email: user.email,
            phone: user.phone
        }
    })
}
