import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./pages/Home/Home";
import LoginSignup from './components/Authentication/LoginSignup'
import Navbar from './components/Navbar/Navbar'
import Project from './components/Project/Project';
import Comments from './components/Comments/Comments';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route path='/loginSignup' element={<LoginSignup/>}/>
      <Route path='/project' element={<Project/>}/>
      <Route path='/comment' element={<Comments/>}/>
      </Routes>
    </BrowserRouter>
    </div>
    
  );
}

export default App;
