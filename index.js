const express = require('express')
const app = express()

let persons = [{
    id: '1',
    name: 'Sam',
    age: '26',
    hobbies: []    
}] //This is your in memory database

app.set('db', persons)
//TODO: Implement crud of person

if (require.main === module) {
    app.listen(3000)
}
module.exports = app;