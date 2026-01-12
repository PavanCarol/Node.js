import { FastifyInstance } from "fastify"
import { z } from 'zod'
import { knex } from "../database"
import { randomUUID } from "node:crypto"
import { request } from "node:http"
import { checkSessionIdExists } from "../middleware/check-session-id-exist"

//Cookies --> Formas da gente manter contexto entre requisições

//Plugin
export async function transactionsRoutes(app: FastifyInstance){


    app.addHook('preHandler', async (request, reply) => {
        console.log(`[${request.method}] ${request.url}`)
    })

    app.get('/', {
        preHandler: [checkSessionIdExists],
    },async (request, reply) => {

        const { sessionId } = request.cookies

        const transactions = await knex('transactions')
        .where('session_id', sessionId)
        .select()

        return { transactions }
    })

    app.get('/:id', {
        preHandler: [checkSessionIdExists],
    },
        async (request) => {

        const getTransactioParamsSchema = z.object({
            id:z.string().uuid(),
        })

        const { id } = getTransactioParamsSchema.parse(request.params)

        const { sessionId } = request.cookies

        if (!sessionId) {
            throw new Error('Session ID not found')
        }

        const transaction = await knex("transactions")
        .where({
            session_id: sessionId,
            id,
        })
        .first()

        return {
            transaction
        }

    })

    app.get('/summary',{
        preHandler: [checkSessionIdExists],
    }, async (request) =>{

        const { sessionId } = request.cookies

        const summary = await knex('transactions')
        .where('session_id', sessionId)
        .sum('amount', { as: 'amount'})
        .first()

        return {
            summary
        }
    })

    //Request Body: HTTPs -> Cr
    //{title, amount, type:credit e debit}
    app.post('/',{
        preHandler: [checkSessionIdExists],
    }, async (request, reply) => {

    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

      const { title, amount, type } = createTransactionBodySchema.parse(
      request.body,
    )

    let sessionId = request.cookies.sessionId

    if(!sessionId){
        sessionId = randomUUID()

        reply.cookie('sessionId', sessionId,{
            path:'/',
            maxAge:  60 * 60 * 24 * 7
        })
    }

    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId
    })

    return reply.status(201).send()
    })
}

//GET,POST,PUT,PATCH,DELTE
// app.get('/', async () => {
// // const transaction = await knex('transactions').insert({
// //     id: crypto.randomUUID(),
// //     title:'Transação de teste',
// //     amount:1000
// // }).returning('*')

// const transaction = await knex('transactions')
// .where('amount',1000)
// .select('*')

// return transaction
// })