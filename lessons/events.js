require('dotenv').config() // dotenv подтягивает переменные из .env файла
const EventEmitter = require('events');

const emitter = new EventEmitter();

const callback = emitter.on('message', (data,second, third) => { // Действие не определенное событие, в данном случае 'message'
    console.log('Вы прислали сообщение ' + data)
    console.log('Второй агрумент ' + second)
    console.log(third)
})


const MESSAGE = process.env.message || '';

if (MESSAGE) { 
    emitter.emit('message', MESSAGE, 123, 'third') // создание эвента message
} else {
    emitter.emit('message', 'Вы не указали сообщение')
}

/* emitter.once('message', callback); // вызывает функцию лишь единожды

emitter.removeAllListeners(); // Удаляет все слушатели
emitter.removeEventListener('type', callback)(); // Удаляет конкретный слушатель */