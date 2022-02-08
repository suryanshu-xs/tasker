import React, { useEffect, useState, useContext } from 'react'
import { doc, updateDoc, onSnapshot } from '@firebase/firestore'
import { db } from '../config/firebase'
import { MyContext } from '../App'
import { motion } from 'framer-motion'





const Trashed = ({ id, title, task, backgroundColor, permanentlyRemove,restore }) => {
    return (
        <div className="remianderBox" style={{
            backgroundColor: backgroundColor
        }}>
            <h3 className='remainder-title'> {title} </h3>
            <p className="remainder-task">{task}  </p>
            <button className="removeRemainder" onClick={() => restore(id)}>
               Restore
            </button>
            <button className="removeRemainder" onClick={() => permanentlyRemove(id)}>
               Permanently Remove
            </button>
        </div>
    )
}





const TrashBody = () => {
    const [tasks, setTasks] = useState([])
    const user = useContext(MyContext)
    const docRef = doc(db, 'users', user.uid)
    useEffect(() => {
        try {
            onSnapshot(docRef, (doc) => {
                setTasks(doc.data().tasks)
            })

        } catch (error) {
            console.log(error);
        }
    }, [user])
    const permanentlyRemove = async (id) => {
        let data=[]
        for(let i=0;i<tasks.length;i++){
            if(id!==i){
                data.unshift(tasks[i])
            }
        }

        await updateDoc(docRef, {
            tasks: data
        })
        
        

    }
    const restore = async(id)=>{
        let data = tasks
        data[id].trash = false;
        await updateDoc(docRef, {
            tasks: data
        })

    }
    return (
        <div className='remainderBody-container'>

            <h1 className='remainderBody-heading'>Trash</h1>
            <motion.div className='remainderBody' layout>
                {
                    tasks.map((task, index) => {
                        if (task.trash) {
                            return <Trashed id={index} title={task.title} task={task.task} backgroundColor={task.color} permanentlyRemove={permanentlyRemove} restore={restore}/>
                        }
                    })
                }
            </motion.div>

        </div>
    )
}

export default TrashBody
