const mongoose=require('mongoose')

const Schema=mongoose.Schema

const taskSchema=new Schema({
    title:{type:String,required:true},
    description:{type:String},
    isCompleted:{type:Boolean}
})

// const Task=mongoose.model('Task', taskSchema)

// const task=new Task({
    
//         title: 'Test Task',
//         description: 'This is a test task description.',
//         isCompleted: false,
      
// })

// return newTask.save();
  

module.exports=mongoose.model('Task', taskSchema)