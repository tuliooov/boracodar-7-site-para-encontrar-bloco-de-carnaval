const { PrismaClient } =require('@prisma/client')
const prisma = new PrismaClient()

async function main(){
    await prisma.carnivalBlock.create({
        data: {
            name: "O python do vovô não sobe mais",
            imageName: "unsplash_b2jkMC95a_8.png",
            positionLat:"-22.19", 
            positionLng: "-48.79",
            description: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.",
            state: "São Paulo-SP"
        }
    })
    await prisma.carnivalBlock.create({
        data: {
            name: "Todo mundo null",
            imageName: "unsplash_b2jkMC95a_8_(2).png",
            positionLat: "-27.45", 
            positionLng: "-50.95",
            state: "Santa Catarina-SC",
            description: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint."

        }
    })
    await prisma.carnivalBlock.create({
        data: {
            name: "Hoje dou exception",
            imageName: "unsplash_b2jkMC95a_8_(3).png",
            positionLat: "-24.89", 
            positionLng: "-51.55",
            state: "Curitiba-PR",
            description: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint."
        }
    })
    await prisma.carnivalBlock.create({
        data: {
            name: "Manda node",
            imageName: "unsplash_b2jkMC95a_8_(4).png",
            positionLat: "-13.29", 
            positionLng: "-41.71",
            description: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.",
            state: "Salvador-BA"
        }
    })
    await prisma.carnivalBlock.create({
        data: {
            name: "Só no back-end",
            imageName: "unsplash_b2jkMC95a_8_(5).png",
            positionLat: "-22.19", 
            positionLng: "-48.79",
            description: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.",
            state: "São paulo-SP"
        }
    })
    await prisma.carnivalBlock.create({
        data: {
            name: "Esse anel não é de Ruby",
            imageName: "unsplash_b2jkMC95a_8_(6).png",
            positionLat: "-22.19", 
            positionLng: "-48.79",
            description: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.",
            state: "São paulo-SP"
        }
    })
    await prisma.carnivalBlock.create({
        data: {
            name: "Pimenta no C# dos outros é refresco",
            imageName: "unsplash_b2jkMC95a_8_(7).png",
            positionLat: "-22.25", 
            positionLng: "-42.66",
            description: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.",
            state: "Rio de Janeiro-RJ"
        }
    })
    await prisma.carnivalBlock.create({
        data: {
            name: "EnCACHE aqui",
            imageName: "unsplash_b2jkMC95a_8_(8).png",
            positionLat: "-30.17", 
            positionLng: "-53.5",
            description: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.",
            state: "Porto Alegre - RS"
        }
    })
    await prisma.carnivalBlock.create({
        data: {
            name: "Não valho nada mas JAVA li",
            imageName: "unsplash_b2jkMC95a_8_(9).png",
            positionLat:"-22.19", 
            positionLng: "-48.79",
            description: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.",
            state: "São paulo-SP"
        }
    })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
