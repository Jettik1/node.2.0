const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');
const path = require('path');


// fs.mkdirSync(path.resolve(__dirname, 'dir','dir2','dir3'), {recursive: true}) // если рекурсия тру - создает директорию по заданному пути, и это СИНХРОННАЯ функция
// Ниже АСинхронная функция
/* console.log("Start")
fs.mkdir(path.resolve(__dirname, 'dir'), (err) => { // здесь рекурсивно нельзя создаьб папки
    if (err) {
        console.log(err)
        return; // для выхода из функции, или используй throw err для выхода из программы
    }
    console.log("Папка создана");
})

console.log("END")
// Удаление директории
fs.rmdir(path.resolve(__dirname, 'dir'), (err) => {
    if (err) {
        throw err;
    }

}) */

// fs.writeFile(path.resolve(__dirname,'test.txt'), '1 qwerty 20 5 8', (err) => {
//     if (err) {
//         throw err;
//     }
//     console.log("Файл записан")
//     fs.appendFile(path.resolve(__dirname,'test.txt'), 'appendFile new text', (err) => {
//         if (err) {
//             throw err;
//         }
//         console.log("Файл обновлен")
//     }) // Чтобы быть уверенным в том, что функции выполнятся по порядку (callback hell)
// })


const writeFileAsync = async (path, data) => {
    return new Promise((resolve, reject) => fs.writeFile(path,data, (err) => {
        if(err) {
            return reject(err.message)
        }
        resolve()
    }))
}

const appendFileAsync = async (path, data) => {
    return new Promise((resolve, reject) => fs.appendFile(path, data, (err) => {
        if(err) {
            return reject(err.message)
        }
        resolve()
    }))
}

const testTxtPath = path.resolve(__dirname, 'test.txt')


writeFileAsync(testTxtPath, 'Файл перезаписан тут')
.then(() => appendFileAsync(testTxtPath,'/Файл обновлен тут'))
.then(() => appendFileAsync(testTxtPath,' /123'))
.then(() => appendFileAsync(testTxtPath,' /3333'))
.catch((err) => console.log(err))

///////////////////// Удаление файла

const removeFileAsyns = async (path) => {
    return new Promise((res,rej) => fs.rm(path, (err) => {
        if (err) {
            return rej(err.message)
        }
        res('File deleted')
    }))
}

removeFileAsyns(testTxtPath)
.then((data) => console.log(data))
.then(() => console.log('Файл удален'))
.catch((err) => console.log(err.message))
// Если блок создания файла не закоментирован, то файл останется, так как промис, которому нечего удалять вернется быстрее

// Через переменную окружения передать строку, записать ее в файл
// прочитать файл, посчитать кол-во слов в файле и записать
// их в новый файл count.txt, затем удалить первый файл

// const text = process.env.TEXT || '';

// writeFileAsync(path.resolve(__dirname, 'text.txt'), text)
//     .then(() => readFileAsync(path.resolve(__dirname, 'text.txt'))) // в качестве даты дальше используются данные полученные здесь
//     .then(data => data.split(' ').length) // Сплит - возвращает массив
//     .then(count => writeFileAsync(path.resolve(__dirname, 'count.txt'), `Кол-во слов ${count}`))
//     .then(() => removeFileAsync(path.resolve(__dirname, 'text.txt')))
