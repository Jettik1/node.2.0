require('dotenv').config()
const http = require('http')
const EventEmitter = require('events')
const PORT = process.env.PORT || 5000
const Router = require('./framework/Router')

const emitter = new EventEmitter();



const router = new Router();

router.request('GET', '/users', (req,res) => {
    res.end('You send request to /users')
})

router.get('/posts', (req,res) => {
    res.end('You send request to /posts')
}) //Ниже ещё есть emmit он относится к этому коду, он не работает, я не разобрался почему

const server = http.createServer((req,res) => { // Для кириллицы надо указать кодировку

    /* _res.writeHead(200, {
        'Content-type': 'application/json' // кодировка
    })
    if (_req.url === '/users') { // _req & _res - работают
        return _res.end(JSON.stringify([
            {id: 1, name: 'Jettik1'}
        ]))
    }
    if (_req.url === '/posts') { // _req & _res - работают
        return _res.end('_res.posts')
    }
    _res.end(`'Сервер работает' \n <h1> H1 </h1>`) // по дефолту кириллица не воспринимается  */

    

    emitter.emit(`[${req.url}]:[${req.method}]`, (req,res))
    res.end(req.url)

    
})

server.listen(PORT, () => console.log(`Server start as port: ${PORT}`))