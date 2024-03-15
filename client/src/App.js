import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./pages/Home/Home";
import LoginSignup from './components/Authentication/LoginSignup'
import Navbar from './components/Navbar/Navbar'
import AddProject from './components/AddProject/AddProject';
import ProjDesc from "./pages/ProjectDesc/ProjDesc";
import Footer from './components/footer/Footer';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route path='/loginSignup' element={<LoginSignup />} />
          <Route path='/addProj' element={<AddProject />} />
          <Route path='/projDesc' element={<ProjDesc />} />
          
            
        </Routes>
     <Footer/>
      </BrowserRouter>
    </div>

  );
}

export default App;
