const dotenv = require('dotenv')
dotenv.config(); 
console.log(process.env.PORT);// Чтобы получить инфу из файла .env 
console.log(process.env.NODE_ENV);// Чтобы получить инфу из файла .env 
// process.exit() // Завершает выполнение процесса 