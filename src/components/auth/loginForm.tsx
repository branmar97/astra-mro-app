'use client'

import { APP_NAME } from '@/helpers/constants';
import { Button, TextField, Typography } from '@mui/material/';

export default function LoginForm() {
    return (
        <form className='m-auto flex flex-col space-y-3 w-[34rem] p-10 bg-white rounded-md shadow-lg' noValidate>
            <Typography className='text-3xl uppercase font-bold mb-6' variant='h2'>Sign in to {APP_NAME}</Typography>

            <TextField
                label='Email'
                name='email'
                placeholder='Please enter a valid email.'
                variant='outlined'
                required
                type='email'
            />

            <TextField
                label='Password'
                name='password'
                variant='outlined'
                type='password'
                required
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