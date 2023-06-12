
var userData = require('./user_services');

var bodyParser = require('body-parser')


const fs = require('fs');

const key = fs.readFileSync('cert\\key.pem');

const cert = fs.readFileSync('cert\\cert.pem');

const express = require('express');

const https = require('https');

const app = express();

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

const server = https.createServer({key: key, cert: cert }, app);

app.get('/', (req, res) => { 
  res.send('this is an secure server');
});

app.get('/list', async (req, res) => { 

  var htm = '<!DOCTYPE html> \
  <html> \
    <head>\
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"\
       rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"\
       crossorigin="anonymous">\
    </head>\
    <body> \
      <div class="container">\
        <h5 class="text-primary">User list</h5>\
        \
      </div>\
    </body>\
  </html>';
  
    res.send(htm);
});

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



server.listen(3001, () => { console.log('listening on 3001') });
