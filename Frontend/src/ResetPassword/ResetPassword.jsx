import React, {useState, useContext, useEffect} from "react";
import { Button, Card, Form, Input, PageContainer, ResetPasswordLayout, TextLayout } from "../Auth/Auth.styles";
import NotificationBubble from "../common/NotificationBubble";
import axios from "axios";
import Loader from "../common/Loader";
import { useParams } from "react-router-dom";
import { AuthContext } from "../common/AuthContext";

const ResetPassword = ()=>{

    const [formData, setFormData] = useState({});
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const auth = useContext(AuthContext)

    const {token} = useParams();

      const url = "http://localhost:8000/api/users";

      useEffect(()=>{
return(()=>{
    setErrorMsg('');
    setSuccessMsg('');
})
      },[])

    const handleChange = (e)=>{
        const {name, value} = e.target
        setFormData((prevData)=>{
            return {
                ...prevData,
                [name] : value
            }
        })
    }

    const handleResetPassword = async(e)=>{
        e.preventDefault()
        if(formData.password===formData.confirmPassword){
            auth.showLoaderHandler(true);
         try{
const res = await axios.post(`${url}/reset-password`, { newPassword : formData.password, token : token })
if(res.status===201){
    setSuccessMsg(res.data.message);
}
else{
  setErrorMsg(res.data.message)
}
         }
         catch(err){
            console.log("check reset-err", err)
setErrorMsg(err.response.data.message)
         }
         finally{
            auth.showLoaderHandler(false);
         }
        }
        else{
setErrorMsg("Password mismatch. Please enter the correct password in Confirm Password")
        }
    }

return (
<PageContainer>
{(errorMsg || successMsg) && (
        <NotificationBubble borderColor={successMsg} textColor="white">{errorMsg || successMsg}</NotificationBubble>
      )}
      <Card>
<Form onSubmit={(e) => handleResetPassword(e)}>
<ResetPasswordLayout>
<TextLayout>Password:</TextLayout>
            <Input
              isReset={true}
              required={true}
              value={formData.password ?? ""}
              onChange={(e) => handleChange(e)}
              name="password"
              type="password"
              placeholder="Please enter new password"
            />
            </ResetPasswordLayout>
            <ResetPasswordLayout>
            <TextLayout>Confirm password: </TextLayout>
             <Input isReset={true}
              required={true}
              value={formData.confirmPassword ?? ""}
              onChange={(e) => handleChange(e)}
              name="confirmPassword"
              type="password"
            />
            </ResetPasswordLayout>
            <Button type="submit">Submit</Button>
          </Form>
          </Card>
          </PageContainer>)
}

export default ResetPassword