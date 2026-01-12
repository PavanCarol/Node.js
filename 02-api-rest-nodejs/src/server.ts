import fastify = require("fastify")
import crypto from 'node:crypto'
import { knex } from "./database"
import { env } from "./env"

const app = fastify()

//GET,POST,PUT,PATCH,DELTE

app.get('/hello', async () => {
    // const transaction = await knex('transactions').insert({
    //     id: crypto.randomUUID(),
    //     title:'Transação de teste',
    //     amount:1000
    // }).returning('*')

    const transaction = await knex('transactions')
    .where('amount',1000)
    .select('*')


    return transaction
})

app.listen({
    port: env.PORT, 
}).then(() => {
    console.group('HTTP')
})
