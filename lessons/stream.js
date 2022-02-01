// Readable - чтение
// Writable - Запись
// Duplex - Для чтения и записи Readable + Writable
// Transform - Такой же как Duplex, но может изменить данные по мере чтения

const fs = require('fs')
const path = require('path')

/* fs.readFile(path.resolve(__dirname, 'test2.txt'), (err,data)=> {
    if (err) {
        throw err;
    }
    console.log(data)
})// Считаем файл целиком */

const stream = fs.createReadStream(path.resolve(__dirname, 'test2.txt'))

// Один чанк по дефолту 64кб
stream.on('data',(chunk) => { // Работает по принципу событий
    console.log(chunk)
}) 
// НЕ СТОИТ ЗАБЫВАТЬ НА ПОДПИСКУ ОБ ОШИБКЕ
stream.on('error', (err) => console.log(err)) // передали ошибку

const writableStream = fs.createWriteStream(path.resolve(__dirname, 'test3.txt'))
for (let i = 0; i < 20; i++) {
    writableStream.write(i+ '\n')    
}
writableStream.end()
// writableStream.close() //
// writableStream.destroy() // 

/* const http = require('http');

http.createServer((req,res)=>{
    // req - readable stream
    // res - writable stream
    // stream.pipe() // синхронизирует оба потока чтобы отдавать пользователю данные чанками
}) */
