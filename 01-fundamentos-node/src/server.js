//Padão de importação CommonJS => require
//ESModules = > import/export
//sem o "type": "module",no package.json :
//const http = require('http')

//Aplicações HTTP => APIs

//com o "type": "module",
import http from 'node:http'

//Cabeçalhos(Requisição/resposta) => Metadados

//Stateful => (dados armazenados localmente em memoria) - Stateless
const users = []


const server = http.createServer((req, res) => {
    //rodar aplicação : npm run dev
    const { method, url } = req
    
    if(etho === 'GET' && url === '/users'){
        //Early return
        //JSON -JS Object Notation
        return res
        .setHeader('Content-type', 'application/json')
        .end(JSON.stringify(users))
    }

    if(method === 'POST' && url === '/users'){

        users.push({
            id:1,
            name:'John Doe',
            email:'jodoe@example.com',
        })
        return res.writeHead(201).end()
    }
    
    console.log(method,url)
    return res.end('H')
})

server.listen(3333)


