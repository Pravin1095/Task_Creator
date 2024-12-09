import React, {useState} from "react";
import { AddButton, BodyLayout, InputElement, InputWrapper, Tab, TabButton } from "./Home.styles";

const Home=()=>{


    const [activeTab, setActiveTab]=useState('Tab1')
    const handleSubmit=(e)=>{
e.preventDefault()
    }

    const handleCompletedTasks=()=>{
setActiveTab('Tab2')
    }
    const handlePendingTasks=()=>{
setActiveTab('Tab1')
    }
    return(
        <>
        <header>
            <h1>Task Creator</h1>
        </header>
        <BodyLayout>
<form onSubmit={(e)=>handleSubmit(e)}>
<InputWrapper>
    <InputElement name='title' placeholder='Add title' height='30px' width="30px" />
    <InputElement name='description' placeholder='Add description'/>
    <AddButton type='submit'>Add Task</AddButton>
    </InputWrapper>

</form>

<Tab>
    <TabButton isActive={activeTab==='Tab1'} onClick={()=>handlePendingTasks()}>Pending Tasks</TabButton>
    <TabButton isActive={activeTab==='Tab2'} onClick={()=>handleCompletedTasks()}>Completed Tasks</TabButton>
</Tab>
</BodyLayout>
        </>
    )
}

export default Home