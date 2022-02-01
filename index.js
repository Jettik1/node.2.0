require('dotenv').config()
const http = require('http')
const EventEmitter = require('events')
const PORT = process.env.PORT || 5000

const emitter = new EventEmitter();

class Router{
    constructor() {
        this.endpoints = {} // Создаем хеш-таблицу 
    }
    
    request(method = "GET", path, handler) { // ОБРАБОТЧИК ЗАПРОСОВ
        if(!this.endpoints[path]) { //Проверяем существует ли такой путь
            this.endpoints[path] = {} // Если нет - создаем пустой объект
        }
        // /users {GET, POST, PUT} /posts {GET, POST, PUT, DELETE}
        const endpoint = this.endpoints[path]; // Идентифицировали endpoint

        if (endpoint[method]) { // проверяем есть ли по данному пути определенный метод
            throw new Error(`[${method}] по адресу ${path} уже существует`)
        }

        endpoint[method] = handler;// по данному пути по данному методу мы передаем обработчик 
        emitter.on(`[${path}]:[${method}]`,(req,res) => {
            handler(req,res)
        }) // [path]:[method]
    }

    // Оболочки для request, Абcтракции
    get(path,handler) {
        this.request('GET', path, handler);
    }
    post(path,handler) {
        this.request('POST', path, handler);
    }
    put(path,handler) {
        this.request('PUT', path, handler);
    }
    delete(path,handler) {
        this.request('DELETE', path, handler);
    }
}

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