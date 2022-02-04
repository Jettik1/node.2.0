const http = require('http')
const EventEmitter = require('events')

// enpoint = {
//   '/users': {
//      'GET': handler
//    }
// }


module.exports = class Applications {
    constructor () {
        this.emitter = new EventEmitter();
        this.server = this._createServer();// _ значит что метод приватный и не стоит использовать его снаружи
        this.middlewares = [];
    }

    use(middleware) {
        this.middlewares.push(middleware)// добавление данных middleware в массив this.middleware
    }

    listen(port,callback) {
        this.server.listen(port, callback)
    }

    addRouter(router) {
        Object.keys(router.endpoints).forEach(path => {
            const endpoint = router.endpoints[path];
            Object.keys(endpoint).forEach((method) => {
                this.emitter.on(this._getRouteMask(path,method),(req,res) => {
                    const handler = endpoint[method];
                    // раньше тут был миддлвейр
                    handler(req,res)
                })
            })
        })
    }

    _createServer() {
        return http.createServer((req,res) => {
            let body = ""; // переменная для склеивания чанков

            req.on('data', (chunk) => { // тот самый readable stream
                body += chunk;
            }) // после прочтения всего запроса отрабатывает событие end

            req.on('end', () => {
                if (body) {
                    req.body = JSON.parse(body);
                }
                this.middlewares.forEach(middleware => middleware(req, res)) // ВЫЗОВ middleware
                // console log перенесен в user-router
                const emitted = this.emitter.emit(this._getRouteMask(req.pathname,req.method),req,res)
                if (!emitted) {
                    res.end()
                }
            })
        })
    }

    _getRouteMask(path, method) {
        return `[${path}]:[${method}]`
    }
}