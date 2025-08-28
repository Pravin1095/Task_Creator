
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from 'react-router-dom';
import './App.css';
import Home from './Home/Home';
import AuthPage from './Auth/Auth';


function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
      <Route exact path = '/' element={<Navigate to='/auth' />} />

        <Route path='/home' element={<Home />} />
        <Route path = '/auth' element={<AuthPage />} />

        <Route path="*" element={<Navigate to="/" />} /> 
      </Routes>
    </Router>
    </div>
  );
}

export default App;
