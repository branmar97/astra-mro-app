'use client'

import { signupAction } from '@/app/actions/signup-action';
import { PhoneInputMask } from '@/common-components/phoneInputMask';
import { Button, TextField, Typography, Box } from '@mui/material/';
import { useState } from 'react';
import { z } from 'zod';

export const NewUserSchema = z.object({
    firstName: z
        .string()
        .min(1, 'First name is required')
        .max(64, 'Cannot exceed 64 characters'),
    lastName: z
        .string()
        .min(1, 'Last name is required')
        .max(64, 'Cannot exceed 64 characters'),
    phone: z
        .string()
        .regex(/^\(\d{3}\) \d{3}-\d{4}$/, 'Invalid phone number'),
    email: z
        .string()
        .email(),
    password: z
        .string()
        .min(8, 'Must be at least 8 characters')
        .max(24, 'Cannot exceed 24 characters'),
})

export default function SignupForm() {
    const [formErrors, setFormErrors] = useState<{
        firstName?: string[]
        lastName?: string[]
        phone?: string[]
        email?: string[]
        password?: string[]
    }>()

    const action = async (formData: FormData) => {
        // construct new user object
        const newUserFormFields = {
            firstName: formData.get('first-name'),
            lastName: formData.get('last-name'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            password: formData.get('password'),
        }

        // validate the form data
        const result = NewUserSchema.safeParse(newUserFormFields)

        if (!result.success) {
            setFormErrors(result.error.formErrors.fieldErrors)
            return
        }

        const newUserData: NewUserData = result.data
        await signupAction(newUserData)
    }

    return (
        <form action={action} className='m-auto flex flex-col space-y-3 w-[34rem] p-10 bg-white rounded-md shadow-lg' noValidate>
            <Typography className='text-3xl uppercase font-bold mb-6' variant='h2'>Signup</Typography>
            <Box className='flex w-full justify-between'>
                <TextField
                    label='First Name'
                    name='first-name'
                    variant='outlined'
                    required
                    type='text'
                    error={Boolean(formErrors?.firstName?.length)}
                    helperText={formErrors?.firstName}
                    onChange={() => {
                        if (!formErrors?.firstName) return
                        setFormErrors(prev => {
                            return {
                                ...prev,
                                firstName: undefined
                            }
                        })
                    }}
                />

                <TextField
                    label='Last Name'
                    name='last-name'
                    variant='outlined'
                    required
                    type='text'
                    error={Boolean(formErrors?.lastName?.length)}
                    helperText={formErrors?.lastName}
                    onChange={() => {
                        if (!formErrors?.lastName) return
                        setFormErrors(prev => {
                            return {
                                ...prev,
                                lastName: undefined
                            }
                        })
                    }}
                />
            </Box>

            <TextField
                label='Email'
                name='email'
                placeholder='Please enter a valid email.'
                variant='outlined'
                required
                type='email'
                error={Boolean(formErrors?.email?.length)}
                helperText={formErrors?.email}
                onChange={() => {
                    if (!formErrors?.email) return
                    setFormErrors(prev => {
                        return {
                            ...prev,
                            email: undefined
                        }
                    })
                }}
        />

            <TextField
                label='Phone'
                name='phone'
                variant='outlined'
                type='tel'
                required
                error={Boolean(formErrors?.phone?.length)}
                helperText={formErrors?.phone}
                onChange={() => {
                    if (!formErrors?.phone) return
                    setFormErrors(prev => {
                        return {
                            ...prev,
                            phone: undefined
                        }
                    })
                }}
                InputProps={{
                    inputComponent: PhoneInputMask as any
                }}
            />

            <TextField
                label='Password'
                name='password'
                variant='outlined'
                type='password'
                required
                error={Boolean(formErrors?.password?.length)}
                helperText={formErrors?.password}
                onChange={() => {
                    if (!formErrors?.password) return
                    setFormErrors(prev => {
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
                Submit
            </Button>
        </form>
    )
}

export type NewUserData = z.infer<typeof NewUserSchema>