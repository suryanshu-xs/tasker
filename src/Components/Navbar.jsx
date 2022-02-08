
import '../Styles/Navbar.css'
import logo from '../tasks.png'
import React from 'react'

const Navbar = () => {



    return (
        <div className='navbar'>
            <img src={'/avatar.png'} className="avatarDiv" />



            <div className="iconContainer">
                <img src={logo} alt="" />
                <p className="tasker">Tasker</p>
            </div>

            <div className="inputAndAvatarDiv">
                <i className="fas fa-search"></i>
                <input type="text" placeholder="Search" />


            </div>



        </div>
    )
}

export default Navbar
