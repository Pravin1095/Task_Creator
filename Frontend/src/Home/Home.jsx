import React, { useState, useRef, useEffect, useContext } from "react";
import {
  AddButton,
  BodyLayout,
  
  
  EditTitle,
  FormWrapper,
  InputElement,
  InputWrapper,
  Tab,
  TabButton,
 
} from "./HomeV2.styles";
import {CardLayout, Title, CheckBox, Description,} from "./Home.styles"
import { useParams } from "react-router-dom";
import Modal from "../common/Modal";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { myContext } from "../ContextProvider/MyProvider";
import { AuthContext } from "../common/AuthContext";
import axios from 'axios'

const Home = () => {
  const [activeTab, setActiveTab] = useState("Tab1");
  const [taskData, setTaskData]=useState('')
  const [title, setTitle]=useState('')
  const [desc, setDesc]=useState('')
  const [isEditId, setIsEditId]=useState('')
  // const [openModal, setOpenModal]=useState(false)
  const titleRef=useRef('')
  const descRef=useRef('')

  const {openModal, updateModalState}=useContext(myContext)
  const auth = useContext(AuthContext);

  const url='http://localhost:8000/api/tasks'

const {userId} = useParams()


  console.log("check id", userId, auth.token);
  useEffect(()=>{
    if(!auth.token){
      
    }
handleGetTaskData()
  },[auth.token])

  const handleGetTaskData=async()=>{
    try{
    const res=await axios.get(`${url}/${userId}`, {
      headers: { Authorization: `Bearer ${auth.token}` }
    })
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
      if(isEditId){
const res=await axios.patch(`${url}/${isEditId}`,{title:titleRef.current,description:descRef.current}, {
      headers: { Authorization: `Bearer ${auth.token}` }
    } )
alert("Task Updated successfully")
setIsEditId('')
      }
      else{
const res=await axios.post(`${url}`,{title: titleRef.current, description: descRef.current, isCompleted: false, userId : userId},{
      headers: { Authorization: `Bearer ${auth.token}` }
    })
alert('Task added successfully')

      }
      setTitle('')
setDesc('')
titleRef.current=''
    descRef.current=''
// e.target.reset()
handleGetTaskData()
    }
    catch(err){
console.error('Post error', err)
setIsEditId('')
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
const res=await axios.delete(`${url}/${id}`, {
      headers: { Authorization: `Bearer ${auth.token}` }
    })
console.log('res delete', res)
alert(res.data.message)
handleGetTaskData()
}
catch(err){
console.error('Delete axios route', err)
}
// updateModalState(true)

  }

  const handleEdit = (id, titleToEdit, DescToEdit) => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
    setTitle(titleToEdit)
    setDesc(DescToEdit)
    titleRef.current=titleToEdit
    descRef.current=DescToEdit
    setIsEditId(id)
};

  return (
    <>
    {openModal && <Modal/>}
      <header>
        <h1>Task Creator</h1>
      </header>
      <BodyLayout>
      <FormWrapper onSubmit={(e) => handleSubmit(e)}>
        {isEditId && <EditTitle>Edit your task</EditTitle>}
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
        </FormWrapper>

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
            <Link color="white" onClick={()=>handleEdit(data._id, data.title,data.description)}>Edit</Link>
          </div>
          <div>Date Added :{formatDate(data.dateCreated)} </div>
          <div>
            <span>
              <RiDeleteBin5Line />
            </span>
            <Link color="white" onClick={()=>handleDelete(data._id)}>Delete</Link>
          </div>
        </CardLayout>
      })  }
      </BodyLayout>
    </>
  );
};

export default Home;
