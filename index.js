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
  var users = await userData.getUsers();
  res.json(users)
})

app.get('/user/:id', async function (req, res) {
  var id = req.params.id;
  var user = await userData.getUserById(id);
  res.json(user);
})

app.post('/newuser', async function (req, res) {
  var json = req.body
  user = await userData.addUser(json);
  res.json(user);
})

app.put('/updateuser/:id', function (req, res) {
    const id =  req.params.id;
    var json = req.body
    itm = users.update(id, json)
    res.send('Updated id:' + itm.id + ', name:' + itm.name + ' Completed!')
})

app.delete('/deleteuser/:id', function (req, res){
    const id =  req.params.id;
    xid = users.delete(id);
    res.send('Delete id:' + id + ' Completed!')
})

app.listen(port, function () {
  console.log('Starting node.js on port ' + port)
})
