import prisma from "../../lib/prisma/prismaClient"

export default async function Home() {
  const asset = await prisma.asset.findUnique({
    where: {
      asset_id: 1
    }
  })

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-20">
      {asset?.name} - {asset?.identifier}
    </main>
  )
}
