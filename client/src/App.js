import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from 'react';
import './App.css';
import Home from "./pages/Home/Home";
import LoginSignup from './components/Authentication/LoginSignup'
import Navbar from './components/Navbar/Navbar'
import AddProject from './components/AddProject/AddProject';
import ProjDesc from "./pages/ProjectDesc/ProjDesc";
import UpdateComment from './components/UpdateComment/UpdateComment'
import UpdateProject from './components/UpdateProject/UpdateProject'
import Cookies from "js-cookie";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('userData') ? true : false);
  return (
    <div className="App">
      <BrowserRouter>
        {isLoggedIn && <Navbar />}
        <Routes>
          <>
            <Route path='/' element={<LoginSignup />} />

            {isLoggedIn && (
              <>
                <Route path="/home" element={<Home />} />
                <Route path='/addProj' element={<AddProject />} />
                <Route path='/projDesc/:id' element={<ProjDesc />} />
                <Route path='/updateComment' element={<UpdateComment />} />
                <Route path='/updateProject' element={<UpdateProject />} />
              </>
            )}
          </>
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;


// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import React, { useState, useEffect } from 'react';
// import './App.css';
// import Home from "./pages/Home/Home";
// import LoginSignup from './components/Authentication/LoginSignup'
// import Navbar from './components/Navbar/Navbar'
// import AddProject from './components/AddProject/AddProject';
// import ProjDesc from "./pages/ProjectDesc/ProjDesc";
// import UpdateComment from './components/UpdateComment/UpdateComment'
// import UpdateProject from './components/UpdateProject/UpdateProject'
// import Cookies from "js-cookie";

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const userData = localStorage.getItem('userData');
//     setIsLoggedIn(userData ? true : false);
//   }, []); // Run only once on initial render

//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Routes>
//           <Route path='/' element={<LoginSignup />} />
//           {isLoggedIn && <Route path='/' element={<Navbar />} />}
//           {isLoggedIn && (
//             <>
//               <Route path="/home" element={<Home />} />
//               <Route path='/addProj' element={<AddProject />} />
//               <Route path='/projDesc/:id' element={<ProjDesc />} />
//               <Route path='/updateComment' element={<UpdateComment />} />
//               <Route path='/updateProject' element={<UpdateProject />} />
//             </>
//           )}
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;



