import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Login from './pages/Login';
//import Navbar from './components/Navbar';
function App() {
  return (
    <div className="App text-2xl">
      
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route path='/dashboard/:username' element={<Dashboard/>}/>
        <Route path='/:username' element={<Profile/>}/>
        <Route path='/auth/register' element={<Register/>}/>
        <Route path='/auth/login' element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
