"# node-api-tutorial" 


npm install express --save

npm install body-parser --save


SSL  certificate:
https://medium.com/@nitinpatel_20236/how-to-create-an-https-server-on-localhost-using-express-366435d61f28
Creating Keys and Cerificate (linux terminal) -
openssl req -x509 -newkey rsa:2048 -keyout keytmp.pem -out cert.pem -days 365

Get Decrypted Keys
openssl rsa -in keytmp.pem -out key.pem
