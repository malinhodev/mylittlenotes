const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const app =  express()
const port = 8000

const db = require('./db/connection')

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

const notesRoutes = require('./routes/notes')

app.use('/notes', notesRoutes)

app.get('/', function(req,res){
    res.render('home')
})

db.initDb((err,db)=>{
    if(err){
        console.log(err)
    }else{
        console.log('O Mongo conectou!!')
        app.listen(port, ()=>{
            console.log(`rodando na porta: ${port}`)
        })
    }
})
