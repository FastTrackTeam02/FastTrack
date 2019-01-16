const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.use('/docs', express.static('samples/docs'))
app.use('/js', express.static('samples/js'))
app.use('/css', express.static('samples/css'))


// route stop connection
app.get('/db/stop', function (req, res) {
    connection.end()
})
// route open connection
app.get('/db/start', function (req, res) {
    connection.connect()
})
// route select
app.get('/db/select', function (req, res) {
    select(req, res)
})





/////MYSQL

const mysql = require('mysql')
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'test'
});
connection.connect()

//select database
function select(req, res) {

    connection.query('SELECT age from students', function (err, rows, fields) {
        if (err) throw err

        res.send('The solution is: ' + rows[0].age)
    })
}
















app.listen(port, () => console.log(`Example app listening on port ${port}!`))

