const express=require('express')
const Task=require('../mongoose-models/task_data')
const taskRouter=express.Router()


taskRouter.post('/', async(req, res, next)=>{
    const {title, description, isCompleted}=req.body
    try{
const task=new Task({
    title, description, isCompleted
})
await task.save()
res.status(200).json({message:"Successfully added"})
    }
    catch(err){
        res.status(400).json({error:"Post error"})
    }
})

module.exports=taskRouter