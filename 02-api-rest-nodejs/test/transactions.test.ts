//testes= 
//unitarios: unidade da sua aplicação 
//integração: comunicação entre duas ou mais unidades
//e2e - ponta a ponta: simulam o usurio operando na nossa aplicacao

// Piramide de testes: E2e (não dependem de nenhuma tecnologia,não dependem de arquitetura)

import { it, beforeAll, afterAll, describe, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../src/app';
import { execSync } from 'node:child_process'

describe('Transactions routes', () => {

    beforeAll(async() => {
        await app.ready()
    })
    
    afterAll(async () => {
        await app.close()
    })

    beforeEach(() => {
        // execSync('npm run knex migrate:rollback --all')
        execSync('npm run knex migrate:latest')
    })

    it('should be able to create a new transaction',async () =>{
        //fazer a chamada HTTP p/ criar uma nova trnasação 
        // const responseStatusCode = 201
        // //validação
        // expect(responseStatusCode).toEqual(201)
    
    await request(app.server)
       .post('/transactions')
       .send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit',
        })
        .expect(201)

    })

    it('should be able to list all transactions', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit',
      })

    const cookies = createTransactionResponse.get('Set-Cookie')!
    console.log(cookies)

    const listTransactionsResponse = await request(app.server)
    .get('/transactions')
    .set('Cookie', cookies)
    .expect(200)

    console.log(listTransactionsResponse.body)

    expect(listTransactionsResponse.body.transactions).toEqual([
        expect.objectContaining({
            title: 'New transaction',
            amount: 5000,
        })
    ])
  })

  it('should be able to get the summary', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit',
      })

    const cookies = createTransactionResponse.get('Set-Cookie')!
    
    await request(app.server)
      .post('/transactions/summary')
      .set('Cookie', cookies)
      .send({
        title: 'Debit transaction',
        amount: 2000,
        type: 'debit',
      })

    const sumaryResponse = await request(app.server)
    .get('/transactions/summary')
    .set('Cookie', cookies)
    .expect(200)

    expect(sumaryResponse.body.summary).toEqual({
        amount: 3000
    })
  })

  it('should be able to get a specific transaction', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit',
      })

    const cookies = createTransactionResponse.get('Set-Cookie')!
    console.log(cookies)

    const listTransactionsResponse = await request(app.server)
    .get('/transactions')
    .set('Cookie', cookies)
    .expect(200)

    const transactionId = listTransactionsResponse.body.transaction[0].id

    const getTransactionResponse = await request(app.server)
    .get(`/transactions/ ${transactionId}`)
    .set("Cookie", cookies)
    .expect(200)

    expect(getTransactionResponse.body.transactions).toEqual(
        expect.objectContaining({
            title: 'New transaction',
            amount: 5000,
        })
    )
  })

})
