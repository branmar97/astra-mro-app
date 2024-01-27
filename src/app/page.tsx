import prisma from "../../lib/prisma"

export default async function Home() {
  const asset = await prisma.asset.findUnique({
    where: {
      identifier: 'A7392XKJ'
    }
  })

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-20">
      {asset?.name} - {asset?.identifier}
    </main>
  )
}
