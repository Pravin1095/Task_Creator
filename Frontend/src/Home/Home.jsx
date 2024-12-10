import React, { useState, useRef, useEffect } from "react";
import {
  AddButton,
  BodyLayout,
  CardLayout,
  CheckBox,
  Description,
  InputElement,
  InputWrapper,
  Tab,
  TabButton,
  Title,
} from "./Home.styles";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import axios from 'axios'

const Home = () => {
  const [activeTab, setActiveTab] = useState("Tab1");
  const [taskData, setTaskData]=useState('')
  const [title, setTitle]=useState('')
  const [desc, setDesc]=useState('')
  const titleRef=useRef('')
  const descRef=useRef('')


  const url='http://localhost:8000/api/tasks'

  useEffect(()=>{
handleGetTaskData()
  },[])

  const handleGetTaskData=async()=>{
    try{
    const res=await axios.get(`${url}`)
    setTaskData(res.data)
    }
    catch(err){
        console.error('Get Error', err)
    }

  }

  console.log('taskData', taskData)

  const handleChange=(e)=>{
const {name, value}=e.target
switch (name){
    case 'title':
        titleRef.current=value
        setTitle(value)
        break
    case 'description':
        descRef.current=value
        setDesc(value)
        break
    default:
        return
}

console.log('title', 'description', titleRef.current, descRef.current)

  }
  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log('check add task')
    // titleRef.current=''
    // descRef.current=''
    try{
const res=await axios.post(`${url}`,{title: titleRef.current, description: descRef.current, isCompleted: false})
alert('Task added successfully')
setTitle('')
setDesc('')
// e.target.reset()
handleGetTaskData()
    }
    catch(err){
console.err('Post error', err)
    }
  };

  const handleCompletedTasks = () => {
    setActiveTab("Tab2");
  };
  const handlePendingTasks = () => {
    setActiveTab("Tab1");
  };

  const formatDate=(date)=>{
    const curDate=new Date(date)
    const dd=curDate.getDate()
    let mm=curDate.getMonth()
if(mm>12){
    mm=1
}
else{
    mm=mm+1
}
    const yyyy=curDate.getFullYear()
    return `${dd}/${mm}/${yyyy}`
  }

  const handleDelete=async(id)=>{
try{
const res=await axios.delete(`${url}/${id}`)
console.log('res delete', res)
alert(res.data.message)
handleGetTaskData()
}
catch(err){
console.error('Delete axios route', err)
}
  }
  return (
    <>
      <header>
        <h1>Task Creator</h1>
      </header>
      <BodyLayout>
        <form onSubmit={(e) => handleSubmit(e)}>
          <InputWrapper>
            <InputElement
              name="title"
              placeholder="Add title"
              onChange={(e)=>handleChange(e)}
              value={title}
            />
            <InputElement 
            name="description" 
            placeholder="Add description"
            onChange={(e)=>handleChange(e)}
            value={desc}
             />
            <AddButton type="submit">Add Task</AddButton>
          </InputWrapper>
        </form>

        <Tab>
          <TabButton
            isActive={activeTab === "Tab1"}
            onClick={() => handlePendingTasks()}
          >
            Pending Tasks
          </TabButton>
          <TabButton
            isActive={activeTab === "Tab2"}
            onClick={() => handleCompletedTasks()}
          >
            Completed Tasks
          </TabButton>
        </Tab>
      {taskData && taskData.map((data)=>{
        return <CardLayout>
          <Title>{data.title}</Title>
          <CheckBox>
            <input
              type="checkbox"
              id="completed"
              name="isCompleted"
              value="false"
            ></input>
            <span>Mark as completed</span>
          </CheckBox>
          <Description>{data.description}</Description>
          <div>
            <span>
              <GrEdit />
            </span>
            <Link>Edit</Link>
          </div>
          <div>Date Added :{formatDate(data.dateCreated)} </div>
          <div>
            <span>
              <RiDeleteBin5Line />
            </span>
            <Link onClick={()=>handleDelete(data._id)}>Delete</Link>
          </div>
        </CardLayout>
      })  }
      </BodyLayout>
    </>
  );
};

export default Home;
