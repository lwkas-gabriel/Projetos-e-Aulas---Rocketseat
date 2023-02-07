import Fastify from 'fastify'
import {PrismaClient} from "@prisma/client"

const app = Fastify();
const prisma = new PrismaClient();

app.get("/teste", async () => {
    //se eu tiro o where, ele retorna todas as entradas do banco de dados
    const habits = await prisma.habit.findMany({
        where: {
            title:{
                startsWith: "Beber"
            }
        }
    })
    return habits
})

app.listen({
    port: 3333,
}).then(() =>{
   console.log("HTTP Server Running") 
})