require('dotenv').config()
const http = require('http')
// const EventEmitter = require('events')
const PORT = process.env.PORT || 5000
const Router = require('./framework/Router')
const Application = require('./framework/Application')
const userRouter = require('./src/user-router')
const jsonParser = require('./framework/parsejson')
const parseUrl = require('./framework/parseUrl');
const mongoose = require('mongoose')

// const emitter = new EventEmitter();

const app = new Application(); // Здесь создается сервер

app.use(jsonParser);
app.use(parseUrl('http://localhost:5000')); //передаем базовый url
// addRouter 

app.addRouter(userRouter);

const start = async () => {
    try { // Здесь своя база данный MongoDB
        await mongoose.connect('mongodb+srv://Jettik1:AdminPassword@jettik1cluster.qqwhp.mongodb.net/myFristDatabase?retryWrites=true&w=majority')
        app.listen(PORT, () => console.log(`Server start as port: ${PORT}`));

    } catch (e) {
        console.log(e)
    }
} // надо запустить приложение

start();



// const server = http.createServer((req,res) => { // Для кириллицы надо указать кодировку

//     /* _res.writeHead(200, {
//         'Content-type': 'application/json' // кодировка
//     })
//     if (_req.url === '/users') { // _req & _res - работают
//         return _res.end(JSON.stringify([
//             {id: 1, name: 'Jettik1'}
//         ]))
//     }
//     if (_req.url === '/posts') { // _req & _res - работают
//         return _res.end('_res.posts')
//     }
//     _res.end(`'Сервер работает' \n <h1> H1 </h1>`) // по дефолту кириллица не воспринимается  */

    

//     const emitted = emitter.emit(`[${req.url}]:[${req.method}]`, req,res)
//     if(!emitted) {
//         res.end(req.url)
//     }
//     // Нужно передавать req и res не в коллбек а параметрами
//     // res.end(req.url)

    
// })
