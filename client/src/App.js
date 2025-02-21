import './App.css';
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
function App() {
  return (
    <div className="App text-2xl">
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route path='/:userId' element={<Profile/>}/>
        <Route path='/dashboard/:userId' element={<Dashboard/>}/>
        <Route path='/auth/register' element={<Register/>}/>
        <Route path='/auth/login' element={<Dashboard/>}/>
      </Routes>
    </div>
  );
}

export default App;
