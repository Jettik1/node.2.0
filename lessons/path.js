const path = require('path');

console.log('Склеивает пути',path.join(__dirname,"..")) // .. возвращает папку ниже(выше)
const fullpath = path.resolve(__dirname, 'first', 'second.js');
console.log(fullpath);
console.log('Парсинг пути', path.parse(fullpath));
console.log('разделитель в ОС', path.sep)
console.log('Проверка на абсолютный путь', path.isAbsolute('first/second'))
console.log('Название файла',path.basename(fullpath))
console.log('расширение файла',path.extname(fullpath))

const siteURL = 'http://localhost:8080/users?id=5123'

console.log(siteURL)
const url = new URL(siteURL);
// доступный класс URL
console.log(url)


