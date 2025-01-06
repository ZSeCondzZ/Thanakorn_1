const express = require('express')
const bodyparser = require('body-parser')
const mysql = require('mysql2/promise')
const app = express()

app.use(bodyparser.json())

const port = 8000

let users = []
let counter = 1
let conn = null

app.get('/testdb', (req, res) => {
    mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'test'
    }).then((conn) => {
      // สิ่งนี้เราเรียกกันว่า promise
      conn
      .query('SELECT * FROM united')
      .then((results) => {
        res.json(results[0])
      })
      .catch((error) => {
        console.error('Error fetching users:', error.message)
        res.status(500).json({ error: 'Error fetching users' })
      })
    })
  })

  const initMySQL = async () =>{
    conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'test',
        port : 3306
    })
  }

app.get('/testdb-new',async(req,res)=>{
    try{
        const results = await conn.query('SELECT * FROM united')
        res.json(results[0])
    }
    catch(error){
        console.log('Error fetching user:', error.message)
        res.status(500).json({error : "Error fetching user"})
    }
})

app.get('/users',(req,res)=>{
    const fillterUser = users.map(user => {
        return {
            id : user.id,
            firstname : user.firstname,
            lastname : user.lastname,
            fullname : user.firstname + " " + user.lastname
        }
    })
    res.json(fillterUser)
})

//path = POST /user
app.post('/user',(req,res)=>{
    let user = req.body
    user.id = counter
    counter += 1
    
    users.push(user)

    res.json({
        message : "add data is ok",
        user : user
    })
})

// path get/users/:id การดึง user ออกมาทีละคน
app.get('/users/:id',(req,res)=>{
    let id = req.params.id
    let selectIndex = users.findIndex(user => user.id == id)

    res.json(user[selectIndex])
})

app.put('/user/:id',(req,res)=>{
    let id = req.params.id
    let updateUser = req.body

    //หา user จาก id ที่ส่งมา
    let selectIndex = users.findIndex(user => user.id == id)

    //update user นั้น
    users[selectIndex].firstname = updateUser.firstname || users[selectIndex].firstname
    users[selectIndex].lastname = updateUser.lastname || users[selectIndex].lastname
    users[selectIndex].age = updateUser.age || users[selectIndex].age
    users[selectIndex].gender = updateUser.gender || users[selectIndex].gender

    res.json({
        message : "Update data complete",
        data : {
            user : updateUser,
            indexupdate : selectIndex
        }
    })
})

app.delete('/users/:id',(req,res)=>{
    let id = req.params.id
    let selectIndex = users.findIndex(user => user.id == id)

    users.splice(selectIndex,1)

    res.json({
        message : "Delete complete",
        indexDelete : selectIndex
    })
})

app.listen(port,async (req,res)=>{
    await initMySQL()
    console.log('http server run at',port)
})