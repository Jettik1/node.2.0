// Вначале код для массива, внизу - для баззы данных
 
/* const users = [
    {id: 1, name: "Jettik1"},
    {id: 2, name: "Jettik2"}
]

const getUsers = (req,res) =>  { 
    console.log(req.params)
    if (req.params.id) {
        return res.send(users.find(user => user.id == req.params.id)) // если пришел ID то отправляем не весь массив, а конкретноо пользователя
    }
    res.send(users);
}

const createUser = (req,res) => {
    console.log(req.body)
    const user = req.body;
    users.push(user); // Добавляем юзера в массив юзеров
    // но его нужно прочитать с помощью readable stream в Application
    res.send(user);
} */

const User = require('./user-model')

const getUsers = async (req,res) => {
    let users;
    if (req.params.id) {
        users = await User.findById(req.params.id)
    } else {
        users = await User.find();
    }
    res.send(users)
}

const createUser = async (req,res) => {
    console.log(req.body)
    const user = await User.create(req.body);// в body должен быть объект JSON?
    res.send(user);
}

// Экспортируем объект с нашими функциями

module.exports = {
    getUsers,
    createUser
}