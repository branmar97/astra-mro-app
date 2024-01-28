import prisma from "../lib/prisma/prismaClient"

async function seed() {
    const client = await prisma.client.upsert({
        where: { client_id: 1 },
        update: {},
        create: {
            name: 'Test Client',
            primary_email: 'test@test.com',
            primary_phone: '7576988839'
        }
    })

    const user = await prisma.user.upsert({
        where: { user_id: 1 },
        update: {},
        create: {
            auth_id: '8ba2f045-5024-41ae-8b30-9afb444eda2c',
            first_name: 'Test',
            last_name: 'User',
            client_id: 1,
            email: 'test-user@test.com',
        }
    })

    const asset = await prisma.asset.upsert({
        where: { asset_id: 1, client_id: 1, identifier: 'A7392XKJ' },
        update: {},
        create: {
            name: 'Forklift',
            identifier: 'A7392XKJ',
            client_id: 1
        }
    })
    console.log(client, user, asset)
}

seed()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.log(e)
        await prisma.$disconnect()
        process.exit(1)
    })