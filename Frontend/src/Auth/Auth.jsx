import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  PageContainer,
  Card,
  Title,
  Form,
  Heading,
  Input,
  Button,
  ToggleText,
  ToggleButton,
  ForgotPasswordLayout,
} from "./Auth.styles";
import axios from "axios";
import NotificationBubble from "../common/NotificationBubble";
import { AuthContext } from "../common/AuthContext";

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const [isForgetPassword, setIsForgetPassword] = useState('');
  const [forgetPasswordMail, setForgetPasswordMail] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const navigate = useNavigate();

  const auth = useContext(AuthContext);

  const url = `${process.env.REACT_APP_API_URL}/api/users`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
        isSignIn: isSignIn,
      };
    });
  };

  const handleForgotPassword = async(e)=>{
    e.preventDefault()
    try{
      auth.showLoaderHandler(true);
const res = await axios.patch(`${url}/forgot-password`,{email : forgetPasswordMail} )
console.log("check res", res)
if(res.status===201){
  setSuccessMsg(res.data.message)
}
else{
  setErrorMsg(res.data.message)
}
    }
    catch(err){
console.log("Forgot password err", err)
    }
finally{
auth.showLoaderHandler(false);
}
  }

  const handleRegisterToggle = () => {
    setIsSignIn(!isSignIn);
    setFormData({});
    setErrorMsg("");
    setIsForgetPassword(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      auth.showLoaderHandler(true);
      const res = await axios.post(`${url}`, formData);  
      if (res.status === 201) {
        auth.login(res?.data?.userId, res?.data?.token, res?.data?.userName);
        navigate(`/home/${res?.data?.userId}`);
      }
    } catch (err) {
      setErrorMsg(err.response.data.message);
      console.log("check user post err", err.status, err);
    } finally {
      auth.showLoaderHandler(false);
    }
  };

  const handleInvalid = () => {
    setErrorMsg("Sorry! No special characters are allowed");
  };

  return (
    <PageContainer>
      {(errorMsg || successMsg) && (
        <NotificationBubble borderColor={successMsg} textColor="white">{errorMsg || successMsg}</NotificationBubble>
      )}
      <Card>
        <Title>Task Creator</Title>

        {isForgetPassword ? <Form onSubmit={(e) => handleForgotPassword(e)}>
            <Input
              required={true}
              value={forgetPasswordMail ?? ""}
              onChange={(e) => setForgetPasswordMail(e.target.value)}
              name="email"
              type="email"
              placeholder="Please enter your registered email id"
            />
            <Button type="submit">Submit</Button>
          </Form> : isSignIn ? (
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Heading>Sign In</Heading>
            <Input
              required={true}
              value={formData.email ?? ""}
              onChange={(e) => handleChange(e)}
              name="email"
              type="email"
              placeholder="Email"
            />
            <Input
              required={true}
              value={formData.password ?? ""}
              onChange={(e) => handleChange(e)}
              name="password"
              type="password"
              placeholder="Password"
            />
            <Button type="submit">Sign In</Button>
          </Form>
        ) : (
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Heading>Sign Up</Heading>
            <Input
              pattern="[a-zA-Z0-9 ]+"
              onInvalid={() => handleInvalid()}
              required={true}
              value={formData.userName ?? ""}
              onChange={(e) => handleChange(e)}
              name="userName"
              type="text"
              placeholder="Full Name"
            />
            <Input
              pattern="[a-zA-Z0-9 ]+"
              onInvalid={() => handleInvalid()}
              required={true}
              value={formData.organization ?? ""}
              onChange={(e) => handleChange(e)}
              name="organization"
              type="text"
              placeholder="Organization"
            />
            <Input
              required={true}
              value={formData.email ?? ""}
              onChange={(e) => handleChange(e)}
              name="email"
              type="email"
              placeholder="Email"
            />
            <Input
              required={true}
              value={formData.password ?? ""}
              onChange={(e) => handleChange(e)}
              name="password"
              type="password"
              placeholder="Password"
            />
            <Button type="submit">Sign Up</Button>
          </Form>
        )}

{!isForgetPassword && isSignIn && <ForgotPasswordLayout onClick={()=>setIsForgetPassword(true)}>Forgot password?</ForgotPasswordLayout>}
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
