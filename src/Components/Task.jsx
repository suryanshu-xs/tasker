import React, { useState } from 'react'
import '../Styles/Task.css'

const Task = ({ id, title, task, createdAt, finished, remainder, trash, remindAt, backgroundColor, archive, updateArchive, updateTrash, updateRemainder ,updatePalatteColor}) => {

    if (backgroundColor === 'default') {
        backgroundColor = 'rgba(36, 36, 36, 0.924)'
    }
    

    const handlePaletteMouseOver = (id) =>{
        console.log(id);
        document.getElementById(`palatte-colors-container-${id}`).style.transform = 'scale(1)'
        document.getElementById(`palatte-colors-container-${id}`).style.opacity = 1
    }
    const handlePaletteMouseLeave = (id) =>{
        console.log(id);
        document.getElementById(`palatte-colors-container-${id}`).style.transform = 'scale(0)'
        document.getElementById(`palatte-colors-container-${id}`).style.opacity = 0
    }
   
    return (
        <div className='task' key={id} style={{
            backgroundColor: `${backgroundColor}`,
            border: `2px solid ${backgroundColor} `
        }}>
            <h3 className='task-title'> {title} </h3>
            <p className="task-task">{task}  </p>

            <div className="task-options">
                <i className="fas fa-archive" style={{
                    backgroundColor: `${archive ? 'rgba(219, 224, 230, 0.377)' : ''}`
                }} onClick={() => updateArchive(id)}></i>
                <i className="fas fa-trash-alt" onClick={() => updateTrash(id)}></i>
                <i className="fas fa-bell" onClick={()=>updateRemainder(id)} style={{
                    backgroundColor: `${remainder ? 'rgba(219, 224, 230, 0.377)' : ''}`
                }} ></i>
                <i className="fas fa-palette" id={id} onMouseOver={()=>handlePaletteMouseOver(id)} onMouseDown={()=>handlePaletteMouseOver(id)} onMouseUp={()=>handlePaletteMouseLeave(id)} onMouseLeave={()=>handlePaletteMouseLeave(id)}>
                    <div className='palatte-colors-container' id={`palatte-colors-container-${id}`}>

                        <div className="palatte-colors palatte-colors-1" onClick={()=>updatePalatteColor(id,'rgba(36, 36, 36, 0.924)')}></div>
                        <div className="palatte-colors palatte-colors-2" onClick={()=>updatePalatteColor(id,'rgb(255, 106, 106)')}></div>
                        <div className="palatte-colors palatte-colors-3" onClick={()=>updatePalatteColor(id,'rgb(102, 180, 0)')}></div>
                        <div className="palatte-colors palatte-colors-4" onClick={()=>updatePalatteColor(id,'rgb(196, 25, 202)')}></div>
                        <div className="palatte-colors palatte-colors-5" onClick={()=>updatePalatteColor(id,'rgb(209, 26, 96)')}></div>
                        <div className="palatte-colors palatte-colors-6" onClick={()=>updatePalatteColor(id,'rgb(207, 204, 22)')}></div>
                        <div className="palatte-colors palatte-colors-7" onClick={()=>updatePalatteColor(id,'rgb(207, 204, 22)')}></div>
                        <div className="palatte-colors palatte-colors-8" onClick={()=>updatePalatteColor(id,'rgb(14, 185, 23)')}></div>
                        <div className="palatte-colors palatte-colors-9" onClick={()=>updatePalatteColor(id,'rgb(17, 130, 182)')}></div>

                    </div>
                </i>
            </div>
         
        </div>
    )
}

export default Task
