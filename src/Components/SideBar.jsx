import React, { useEffect } from 'react'

import '../Styles/Sidebar.css'

const SideBar = ({setActive,active}) => {
    const sidebarIcons = document.getElementsByClassName('sidebar-icons');
    useEffect(() => {
        
        sidebarIcons[0].classList.add('active-icon')
        


    }, [])
    const handleIconClick = (event) =>{


        for(let i=0;i<sidebarIcons.length;i++){

            if(event.target.id === i.toString()){
                
                event.target.classList.add('active-icon')
                
                let eventClass = event.target.classList[1].split('-')[1]
                if(eventClass === 'clipboard'){
                    setActive('notes')

                }else if(eventClass === 'bell'){
                    setActive('remainder')
                }else{
                    setActive(eventClass)
                }
            }else{
                sidebarIcons[i].classList.remove('active-icon')
            }
        }

    }
    return (
        <div className='sidebar'>
            <div className="sidebar-iconContainer">
                <i className="fas fa-clipboard sidebar-icons" id='0' onClick={handleIconClick}> <p>Notes</p> </i>
                <i className="fas fa-bell sidebar-icons" id='1'  onClick={handleIconClick}><p>Remainders</p></i>
                <i className="fas fa-archive sidebar-icons" id='2' onClick={handleIconClick}><p>Archives</p></i>
                <i className="fas fa-trash-alt sidebar-icons" id='3' onClick={handleIconClick} ><p>Trash</p></i>
            </div>
        </div>
    )
}

export default SideBar
