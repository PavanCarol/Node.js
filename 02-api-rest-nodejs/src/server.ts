import fastify = require("fastify")
import { knex } from "./database"

const app = fastify()

//GET,POST,PUT,PATCH,DELTE

app.get('/hello', async () => {
    const tables = await knex('sqlite_schema').select('*')
    return tables
})

app.listen({
    port:3333, 
}).then(() => {
    console.group('HTTP')
})
