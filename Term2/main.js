const express = require('express')
const app = express()
const bodyparser = require('body-parser')

app.use(bodyparser.json())

const port = 8000
let users = []
let count = 1

app.get('/users',(req,res)=>{
    const fillter = users.map(user=>{
        return {
            id:user.id,
            Name : user.name,
            Surname : user.surname,
            Fullname : user.name + " " + user.surname
        }
    })
    res.json(fillter)
})

app.post('/user',(req,res)=>{
    let user = req.body
    user.id = count
    count += 1
    users.push(user)

    res.json({
        message : 'add complete',
        data : user
    })
})

app.get('/users/:id',(req,res)=>{
    let id = req.params.id
    res.send(id)
})

app.listen(port,(req,res)=>{
    console.log("https run at " + port)
})