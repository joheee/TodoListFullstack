import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function seed(){

    const menu = await prisma.menu.createMany({
        data: [
          {
            nama: 'first todo',
            deksripsi: 'first to do list',
            selesai: false
          },
          {
            nama: 'second todo',
            deksripsi: 'second to do list',
            selesai: false
          },
        ],
      });
    
    console.log({
        menu
    })
}

seed()
.then(async () => {
    await prisma.$disconnect()
})
.catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})