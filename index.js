var app = require('express')()
var users = require('./users');

var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

var port = process.env.PORT || 7777

app.get('/user', function (req, res) {
    res.json(users.findAll())
})

app.get('/user/:id', function (req, res) {
    var id = req.params.id
    res.json(users.findById(id))
})

app.post('/newuser', function (req, res) {
    var json = req.body
    id = users.create(json);
    res.send('Added new ' + ' id:' + id + ', name:' + json.name + ' Completed!')
})

app.put('/updateuser/:id', function (req, res) {
    const id =  req.params.id;
    var json = req.body
    itm = users.update(id, json)
    res.send('Updated id:' + itm.id + ', name:' + itm.name + ' Completed!')
})

app.delete('/deleteuser/:id', function (req, res){
    const id =  req.params.id;
    res.send('Delete id:' + id + ' Completed!')
})

app.listen(port, function () {
  console.log('Starting node.js on port ' + port)
})
