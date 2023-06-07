var app = require('express')()
var users = require('./users');
var userData = require('./user_services');

var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

var port = process.env.PORT || 7777

app.get('/user', async function (req, res) {
  var ret = await userData.getUsers();
  res.json(ret)
})

app.get('/user/:id', async function (req, res) {
  var id = req.params.id;
  var ret = await userData.getUserById(id);
  res.json(ret);
})

app.post('/newuser', async function (req, res) {
  var json = req.body
  var ret = await userData.addUser(json);
  res.json(ret);
})

app.put('/updateuser/:id', async function (req, res) {
    const id =  req.params.id;
    var json = req.body;
    ret = await userData.updateUser(id, json);
    res.json(ret);
})

app.delete('/deleteuser/:id', async function (req, res){
    const id =  req.params.id;
    ret = await userData.deleteUser(id);
    res.json(ret);
})

app.listen(port, function () {
  console.log('Starting node.js on port ' + port)
})
