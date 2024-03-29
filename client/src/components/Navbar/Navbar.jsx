import React, { useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import { Link } from 'react-router-dom'
import menu_image from '../Assets/menu.png'
const Navbar = () => {

    const [menu, setMenu] = useState("home");
    const [maxHeight, setMaxHeight] = useState("0px");

    const toggleMenu = () => {
        setMaxHeight(maxHeight === "0px" ? "220px" : "0px");
    };

    return (
        <div className='navbar'>
            <div className="menu-image">
                <img src={menu_image} alt="" onClick={toggleMenu}/>
            </div>
            <div className='nav-logo'>
                <img src={logo} alt="logo" />
                <p>Attention Mavericks</p>
            </div>
            <ul className="nav-menu" id="MenuItems" style={{ maxHeight: maxHeight }}>
                <li onClick={() => { setMenu("home") }}><Link style={{textDecoration:'none'}}to='/home'>Home </Link>{menu === "home" ? <hr /> : <></>}</li>
    
            </ul>
            {/* <div className='nav-login'>
                <Link to='/'><button>Login</button></Link>
                
            </div> */}
        </div>
    )
}

export default Navbar;


