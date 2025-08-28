const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const cors = require('cors')
const mongoose=require('mongoose')
const taskRouter=require('./routes/taskRouter')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: "https://task-creator-opal.vercel.app",  // your Vercel frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE')
    next()
})

app.use('/api/tasks', taskRouter)

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("Connection successful")
    app.listen(process.env.PORT)
}).catch(err=>{
    console.log('Mongoose connect err', err)
})
