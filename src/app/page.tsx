import InfoCard from '@/components/InfoCard'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-20">
      <div className='container grid grid-cols-3 gap-2'>
        <div className='grid col-span-2 grid-cols-4'>
          <InfoCard 
            title='High Priority'
            content={24}
          />
          <InfoCard 
            title='Pending Assignment'
            content={13}
          />
          <InfoCard 
            title='Open Issues'
            content={24}
          />
          <InfoCard 
            title='Total Monthly Spend'
            content='$27,468.87'
          />
        </div>

        <div className='flex w-full justify-end'>
          <InfoCard
            title='Placeholder Title'
            content='37'
          />
        </div>
      </div>
    </main>
  )
}
