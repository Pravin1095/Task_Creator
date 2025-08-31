import React, { useState, useContext } from "react";
import {useNavigate} from 'react-router-dom'
import { PageContainer, Card, Title, Form, Heading,Input, Button, ToggleText, ToggleButton } from "./Auth.styles";
import axios from "axios";
import NotificationBubble from "../common/NotificationBubble";
import { AuthContext } from "../common/AuthContext";

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({});
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate()

   const auth = useContext(AuthContext);

   const url='http://localhost:8000/api/users'


  
 const validateUsername = (name) => /^[a-zA-Z0-9_]{3,15}$/.test(name);

  const handleChange = (e)=>{
const {name, value} = e.target;
// const sanitizedValue = validateUsername(value);
// console.log("sanitized", sanitizedValue, value)
// if(!sanitizedValue){
// return
// }
setFormData((prevData)=>{
    return {
        ...prevData,
        [name] : value,
        isSignIn : isSignIn
    }
})
  }

  const handleRegisterToggle = ()=>{
    setIsSignIn(!isSignIn)
    setFormData({});
    setErrorMsg('');
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try{
const res =await axios.post(`${url}`, formData)
if(res.status===201){
  console.log("check res", res, res.data, auth.token)
  auth.login(res?.data?.userId, res?.data?.token, res?.data?.userName)
     console.log("check auth token", auth.token, res?.data?.userId)
navigate(`/home/${res?.data?.userId}`)


}
    }
    catch(err){
      setErrorMsg(err.response.data.message)
        console.log("check user post err", err.status, err)
    }
    
  }

  return (
    <PageContainer>
    {errorMsg && <NotificationBubble>{errorMsg}</NotificationBubble>}
      <Card>
        <Title>Task Creator</Title>

        {isSignIn ? (
          <Form onSubmit={(e)=>handleSubmit(e)}>
            <Heading>Sign In</Heading>
            <Input required={true} value={formData.email ?? ''} onChange={(e)=>handleChange(e)} name='email' type="email" placeholder="Email" />
            <Input required={true} value={formData.password ?? ''} onChange={(e)=>handleChange(e)} name='password' type="password" placeholder="Password" />
            <Button type="submit">Sign In</Button>
          </Form>
        ) : (
          <Form onSubmit={(e)=>handleSubmit(e)}>
            <Heading>Sign Up</Heading>
            <Input required={true} value={formData.userName ?? ''} onChange={(e)=>handleChange(e)} name='userName' type="text" placeholder="Full Name" />
            <Input required={true} value={formData.organization ?? ''} onChange={(e)=>handleChange(e)} name='organization' type="text" placeholder="Organization" />
            <Input required={true} value={formData.email ?? ''} onChange={(e)=>handleChange(e)} name='email' type="email" placeholder="Email" />
            <Input required={true} value={formData.password ?? ''} onChange={(e)=>handleChange(e)} name='password' type="password" placeholder="Password" />
            <Button type="submit">Sign Up</Button>
          </Form>
        )}

        <ToggleText>
          {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
          <ToggleButton onClick={() => handleRegisterToggle()}>
            {isSignIn ? "Sign Up" : "Sign In"}
          </ToggleButton>
        </ToggleText>
      </Card>
    </PageContainer>
  );
}




