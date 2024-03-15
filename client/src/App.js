import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./pages/Home/Home";
import LoginSignup from './components/Authentication/LoginSignup'
import Navbar from './components/Navbar/Navbar'
import AddProject from './components/AddProject/AddProject';
import ProjDesc from "./pages/ProjectDesc/ProjDesc";
import UpdateComment from'./components/UpdateComment/UpdateComment'
import UpdateProject from'./components/UpdateProject/UpdateProject'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<LoginSignup />}/>
          <Route exact path="/home" element={<Home />} />
          <Route path='/addProj' element={<AddProject />} />
          <Route path='/projDesc' element={<ProjDesc />} />
          <Route path='/updateComment' element={<UpdateComment />} />
          <Route path='/updateProject' element={<UpdateProject />} />
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
