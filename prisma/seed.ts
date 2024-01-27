import prisma from "../lib/prisma"

async function seed() {
    const asset = await prisma.asset.upsert({
        where: { identifier: 'A7392XKJ' },
        update: {},
        create: {
            name: 'Forklift',
            identifier: 'A7392XKJ'
        }
    })
    console.log(asset)
}

seed()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.log(e)
        await prisma.$disconnect()
        process.exit(1)
    })