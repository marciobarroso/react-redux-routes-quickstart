var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/auth', (req, resp) => {
    if( req.body.password === '123456' ) {
        let user = {
            authenticated: false,
            roles: []
        }
        if( req.body.username === 'user' ) {
            user.authenticated = true
            user.roles.push('user')
        } else if( req.body.username === 'admin' ) {
            user.authenticated = true
            user.roles.push('admin')
        }

        if( user.authenticated ) {
            resp.json(user)
        }
    }
})

app.listen(port);

console.log('Fake BackEnd server started on: ' + port);