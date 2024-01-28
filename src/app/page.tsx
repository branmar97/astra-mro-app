import prisma from "../../lib/prisma/prismaClient"
import TextField from '@mui/material/TextField';

export default async function Home() {
  const asset = await prisma.asset.findUnique({
    where: {
      asset_id: 1
    }
  })

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-20">
      <div className='flex flex-col space-y-3 w-96'>
        <TextField
          label='Email'
          placeholder='Please enter a valid email.'
          variant='outlined'
          required
          type='email'
        />

        <TextField
          label='Password'
          variant='outlined'
          type='password'
          required
        />

        <TextField
          label='Confirm Password'
          variant='outlined'
          type='password'
          required
        />
      </div>
      {asset?.name} - {asset?.identifier}
    </main>
  )
}
