const express=require('express')
const Task=require('../mongoose-models/task_data')
const taskRouter=express.Router()
const checkAuth = require('../middlewares/check-auth')

taskRouter.use(checkAuth);

taskRouter.post('/', async(req, res, next)=>{
    const {title, description, isCompleted, userId}=req.body
    try{
const task=new Task({
    title, description, isCompleted, userId
})
await task.save()
res.status(200).json({message:"Successfully added"})
    }
    catch(err){
        res.status(400).json({error:"Post error"})
    }
})

taskRouter.get('/:id', async(req, res)=>{
    const {id} = req.params
    try{
const task=await Task.find({userId : id})
res.status(200).json(task)
    }
    catch(err){
        res.status(400).json({error:"Could not get data"})
    }
})

taskRouter.patch('/:id',async(req, res)=>{
    const {id}=req.params
    const {title, description}=req.body
    try{
    const task=await Task.findByIdAndUpdate(id,{
        title: title,
        description: description
    })
    if(!task){
        res.status(403).json({error:"Could not find the id of the task"})
    }
    res.status(200).json({messsage:"Task Updated successfully"})
    }
    catch(err){
res.status(400).json(err)
    }
})

taskRouter.delete('/:id', async(req, res)=>{
    const {id}=req.params
    try{
       
const task=await Task.findByIdAndDelete(id)
if(!task){
         return res.status(403).json({error:"Could not find the task for deletion"}) 
}
res.status(200).json({message: 'Task Deleted successfully'})
    }catch(err){
res.status(400)
    }
})

module.exports=taskRouter