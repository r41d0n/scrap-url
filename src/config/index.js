export default {
    serverPort: 3000,
    baseUrl: 'http://localhost:3000',
    database: 'mongodb://127.0.0.1:27017/scrap',
    phrase: 'indexsearchscraping',
    api: {
        url: '/api/'
    },
    views: {
        engine: '.hbs',
        extension: '.hbs',
        path: '../views'
    },
}