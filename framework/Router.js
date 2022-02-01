module.exports = class Router{
    constructor() {
        this.endpoints = {} // Создаем хеш-таблицу 
    }
    
    request(method = "GET", path, handler) { // ОБРАБОТЧИК ЗАПРОСОВ
        if (!this.endpoints[path]) { //Проверяем существует ли такой путь
            this.endpoints[path] = {} // Если нет - создаем пустой объект
        }
        // /users {GET, POST, PUT} /posts {GET, POST, PUT, DELETE}
        const endpoint = this.endpoints[path]; // Идентифицировали endpoint

        if (endpoint[method]) { // проверяем есть ли по данному пути определенный метод
            throw new Error(`[${method}] по адресу ${path} уже существует`)
        }

        endpoint[method] = handler;// по данному пути по данному методу мы передаем обработчик 
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