import React from 'react'
import '../Styles/Remainder.css'


const Remainder = ({ title, task, backgroundColor, remainder, remindAt, removeRemainder, id,setConfigureDate,submitDate,remainderDate,setDateId}) => {
    
   
    const handleBellClick=()=>{
        setConfigureDate(true)
        setDateId(id)

    }
    return (
        <div className='remianderBox' key={id} style={{
            backgroundColor: `${backgroundColor}`

        }}>
            <h3 className='remainder-title'> {title} </h3>
            <p className="remainder-task">{task}  </p>
            <div className="remindAt" onClick={()=>handleBellClick(id)}>
                <i class="fas fa-bell remainder-bell"></i><p>{remindAt}</p>
            </div>
            <button className="removeRemainder" onClick={()=>removeRemainder(id)}>
                Remove
            </button>
        </div>
    )
}

export default Remainder
