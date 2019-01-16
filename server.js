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
    res.send('Connection closed')
})
// route open connection
app.get('/db/start', function (req, res) {
    connection.connect()
    res.send('Connection open')
})
// route select
app.get('/db/select', function (req, res) {
    select(req, res)
})
// route insert
app.get('/db/insert', function (req, res) {
    insert(req, res)
})
// route delete
app.get('/db/delete', function (req, res) {
    remove(req, res)
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

    connection.query('SELECT * from students', function (err, rows, fields) {
        if (err) throw err
        
        const copy = [];
        var isFirstLine = true;
        copy.push("<h1>List data table</h1>")
        copy.push("<table>")

        rows.forEach(function(element) {

            if (isFirstLine) {
                copy.push("<tr>")
                Object.keys(element).forEach(function(key) {
                    copy.push("<th>" + key + "</th>")
                });
                copy.push("</tr>")
                isFirstLine = false;
            }
            
            copy.push("<tr>")
            Object.keys(element).forEach(function(key) {
                copy.push("<td>" + element[key] + "</td>")
            });
            copy.push("</tr>")

        });

        copy.push("</table>")

        res.send('<!DOCTYPE html><html><head><title>Sample</title><style>table{border-collapse: collapse;}table, td, th {border: 1px solid black;}</style></head><body>' + copy.join("") + '</body></html>')
    })
}

//insert database
function insert(req, res) {

    connection.query('INSERT INTO students SET ?', {name: 'student D', class: '10-05', age: '31'}, function (error, results, fields) {
        if (error) throw error;
        res.send('Insert done! Id: '+ results.insertId);
    });
}

//delete database
function remove(req, res) {
    //console.log(req.query.id)
    //if(req.params.id)
    if (typeof req.query.id === "undefined" || req.query.id === "") {
        res.send('Please input id delete');
    } else {
        connection.query('DELETE FROM students WHERE id = '+ req.query.id, function (error, results, fields) {
            if (error) throw error;
            res.send('Delete done! rows: '+ results.affectedRows);
        })
    }
}














app.listen(port, () => console.log(`Example app listening on port ${port}!`))

