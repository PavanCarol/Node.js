//Padão de importação CommonJS => require
//ESModules = > import/export
//sem o "type": "module",no package.json :
//const http = require('http')

//Aplicações HTTP => APIs

//com o "type": "module",
import http from 'node:http'



const server = http.createServer((req, res) => {
    const { method, url } = req

    if(etho === 'GET' && url === '/users'){
        return res.end('Listem do usuários')
    }

    if(method === 'POST' && url === '/users'){
        return res.end('Criação de usuário')
    }
    
    console.log(method,url)
    return res.end('H')
})

server.listen(3333)


