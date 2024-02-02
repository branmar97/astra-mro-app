'use client'

import { signinAction } from '@/app/actions/auth/signinAction';
import { APP_NAME } from '@/helpers/constants';
import { Button, TextField, Typography, Box } from '@mui/material/';
import { useState } from 'react';
import { z } from 'zod';

export const LoginUserSchema = z.object({
    email: z
        .string()
        .email(),
    password: z
        .string()
        .min(1, 'Password is required')
})

export default function SignInForm() {
    const [fieldErrors, setFieldErrors] = useState<{
        email?: string[]
        password?: string[]
    }>()

    const [authError, setAuthError] = useState<string>('')

    const action = async (formData: FormData) => {
        const loginUserFormFields = {
            email: formData.get('email'),
            password: formData.get('password')
        }

        const result = LoginUserSchema.safeParse(loginUserFormFields)

        if (!result.success) {
            setFieldErrors(result.error.formErrors.fieldErrors)
            return
        }

        const loginUserData: LoginUserData = result.data
        const supabaseResponse = await signinAction(loginUserData)

        const { error } = JSON.parse(supabaseResponse)
        if (error) setAuthError(error)
    }

    return (
        <form action={action} className='m-auto flex flex-col space-y-3 w-[34rem] p-10 bg-white rounded-md shadow-lg' noValidate>
            <Typography className='text-3xl uppercase font-bold mb-6' variant='h2'>Sign in to {APP_NAME}</Typography>

            {authError && 
                <Box className='mb-6 p-4 bg-gray-100 rounded-md'>
                    <Typography color='red'>{authError}</Typography>
                </Box>
            }

            <TextField
                label='Email'
                name='email'
                placeholder='Please enter a valid email.'
                variant='outlined'
                required
                type='email'
                error={Boolean(fieldErrors?.email?.length)}
                helperText={fieldErrors?.email}
                onChange={() => {
                    if (!fieldErrors?.email) return
                    setFieldErrors(prev => {
                        return {
                            ...prev,
                            email: undefined
                        }
                    })
                }}
            />

            <TextField
                label='Password'
                name='password'
                variant='outlined'
                type='password'
                required
                error={Boolean(fieldErrors?.password?.length)}
                helperText={fieldErrors?.password}
                onChange={() => {
                    if (!fieldErrors?.password) return
                    setFieldErrors(prev => {
                        return {
                            ...prev,
                            password: undefined
                        }
                    })
                }}
            />

            <Button
                className='bg-blue-500 text-white p-4'
                type='submit'
            >
                Sign In
            </Button>
        </form>
    )
}

export type LoginUserData = z.infer<typeof LoginUserSchema>
