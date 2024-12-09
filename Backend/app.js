const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const taskRouter=require('./routes/taskRouter')

const url='mongodb://apravin3210:DsqSJ25icfkvuU82@cluster0-shard-00-00.2nuld.mongodb.net:27017,cluster0-shard-00-01.2nuld.mongodb.net:27017,cluster0-shard-00-02.2nuld.mongodb.net:27017/?ssl=true&replicaSet=atlas-3plmxc-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0'


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE')
    next()
})

app.use('/api/tasks', taskRouter)

mongoose.connect(url).then(()=>{
    console.log("Connection successful")
    app.listen(8000)
}).catch(err=>{
    console.log('Mongoose connect err', err)
})
