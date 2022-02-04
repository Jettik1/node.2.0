const Router = require('../framework/Router')
const controller = require('./user-controller') // передаем контроллер
const router = new Router();

router.get('/users', controller.getUsers ) // Используем функции контроллера

router.post('/users',controller.createUser)

module.exports = router