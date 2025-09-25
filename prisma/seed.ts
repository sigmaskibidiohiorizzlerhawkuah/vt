import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  await prisma.article.upsert({
    where: { slug: "dubai" },
    update: {},
    create: { slug: "dubai", title: "DUBAI AS AN EMIRATE, NOT A COUNTRY! 😅" },
  })
}

main()
  .catch((error) => {
    console.error("Seed error:", error)
    // exit cleanly with failure code
    // eslint-disable-next-line no-process-exit
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })


