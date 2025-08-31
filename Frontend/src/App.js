
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
  useNavigate
} from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';
import Home from './Home/Home';
import AuthPage from './Auth/Auth';
import { AuthContext } from './common/AuthContext';
import { useCallback, useState

} from 'react';


function App() {

  let logoutTimer;

  const [token, setToken] = useState('');
  const [userName, setUserName] = useState('');
  const [tokenExpirationTime, setTokenExpirationTime] = useState('');
  const navigate = useNavigate();


  const setLogin=useCallback((uid, token, userName, expirationDateFromUseEffect)=>{
    try{
      console.log("token inside login", token, userName, expirationDateFromUseEffect)
 setToken(token)
 setUserName(userName);
    const expirationDate = expirationDateFromUseEffect || new Date(new Date().getTime() + 1000 * 60 * 60 )
    setTokenExpirationTime(expirationDate)
    console.log("expiration Date", expirationDateFromUseEffect, expirationDate, new Date(new Date().getTime + 1000 * 60 * 60))
    
localStorage.setItem("userData", JSON.stringify({userId : uid , token : token, userName : userName,
   expiration : expirationDate.toISOString()
  }))
    }
    catch(err){
      console.log("check err in login", err)
    }
   
  },[])

  const setLogout=useCallback(()=>{
setToken('')
console.log("check logout")

localStorage.removeItem("userData")
navigate('/auth')
  },[])

  useEffect(()=>{
    console.log("check autoLogout useEffect", tokenExpirationTime, token)
    if(token && tokenExpirationTime){
const expirationTimeInMilliSeconds = tokenExpirationTime?.getTime() - new Date().getTime()
console.log("check time", expirationTimeInMilliSeconds)
logoutTimer = setTimeout(setLogout, expirationTimeInMilliSeconds)
    }
    else{
      clearTimeout(logoutTimer)
    }
    
  },[token, setLogout, tokenExpirationTime]) // For Auto Logout after an hour

  useEffect(()=>{
const storedData = JSON.parse(localStorage.getItem('userData'))
console.log("useEffect call check", storedData)
if(storedData && storedData.token && new Date(storedData.expiration)>new Date()){
  console.log("check useEffect called");
  setLogin(storedData.userId, storedData.token, storedData.userName, new Date(storedData.expiration))
}
  },[setLogin]) //When user refreshes the page we again retrieve the token from localStorage

  return (
 
    <div className="App">
    <AuthContext.Provider value={{ userName : userName, token : token, login: setLogin, logout : setLogout}}>

      <Routes>
      

        <Route path='/home/:userId' element={<Home />} /> 
        <Route path = '/auth' element={<AuthPage />} />

<Route exact path = '/' element={<Navigate to='/auth' />} />
<Route path='/home/:userId' element={<Navigate to= {token ? '/home/:userId' : '/auth'} />} />
        <Route path="*" element={<Navigate to="/" />} /> 
      </Routes>
    </AuthContext.Provider>
    </div>
  );
}

export default App;
