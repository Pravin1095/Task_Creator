
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes
} from 'react-router-dom';
import './App.css';
import Home from './Home';

function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path='/' element={<Home />}>

        </Route>
        <Route path='/view'>
          {/* <View /> */}
        </Route>
        <Route path="*" element={<Navigate to="/" />} /> 
        {/* if we have any other undefined routes(*) it automatically navigates to home route (/) */}
      </Routes>
    </Router>
    </div>
  );
}

export default App;
