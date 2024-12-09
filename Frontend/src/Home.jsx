import React from "react";

const Home=()=>{

    const handleSubmit=(e)=>{
e.preventDefault()
    }
    return(
        <>
<form onSubmit={(e)=>handleSubmit(e)}>
    <input name='title' placeholder='Add title' />
    <input name='description' placeholder='Add description'/>
    <button type='submit'>Add Task</button>

</form>
        </>
    )
}

export default Home