var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var port = process.env.PORT || 3000
var jwt = require('jsonwebtoken')

const secret = 'nHowOb8ErFwgI6QtI8VSIKeBFCHBNJxgMN1LseJK5bxVK2ZyqK8nyWhXfl9sZMZRzawcCnEdDbTmkNOY1bG03uC23RL7BfK5BiUF0urc48lm6H9KJZvhCanMAMMQ6R6RTV3hUrz0QUjK6H43P5AguvrficamRq0MaCn9jhXNvtCOLE46znQreVmWZr0LeqOuZxMpVH5n'

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function generateToken(req, user){
    var token = jwt.sign({
        user: user,
        exp: new Date().getTime() + 7*24*60*60 // Note: in seconds!
    }, secret)  // secret is defined in the environment variable JWT_SECRET
    return token;
}

app.post('/auth', (req, resp) => {
    if( req.body.password === '123456' ) {
        let user = {
            authenticated: false,
            roles: []
        }
        if( req.body.username === 'user' ) {
            user.authenticated = true
            user.roles.push('user')
            user.name = 'User'
        } else if( req.body.username === 'admin' ) {
            user.authenticated = true
            user.roles.push('admin')
            user.name = 'Administrator'
        }

        if( user.authenticated ) {
            var token = generateToken(req, user)
            resp.json({token: token})
        }
    }
})

app.get('/auth', (req, res) => {
    var token = req.headers.authorization
    try {
        var decoded = jwt.verify(token, secret)
        if( decoded.exp < new Date().getTime() ) {
            res.status(403).render()
        }
        res.json(decoded.user)
    } catch (e) {
        res.status(403).render()
    }
})

app.listen(port);

console.log('Fake BackEnd server started on: ' + port);