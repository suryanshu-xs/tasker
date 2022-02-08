import React, { useEffect, useState, useContext } from 'react'
import { doc, updateDoc, onSnapshot } from '@firebase/firestore'
import { db } from '../config/firebase'
import { MyContext } from '../App'
import { motion } from 'framer-motion'


const Archive = ({ id, title, task, backgroundColor,removeFromArchives }) => {
    return (
        <div className="remianderBox" style={{
            backgroundColor: backgroundColor
        }}>
            <h3 className='remainder-title'> {title} </h3>
            <p className="remainder-task">{task}  </p>
            <button className="removeRemainder" onClick={() => removeFromArchives(id)}>
                Remove
            </button>
        </div>
    )
}

const ArchiveBody = () => {
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
    const removeFromArchives = async (id) => {
        let data = tasks
        data[id].archive = false
        await updateDoc(docRef, {
            tasks: data
        })
    }

    return (

        <div className='remainderBody-container'>

            <h1 className='remainderBody-heading'>Your Archives</h1>
            <motion.div className='remainderBody' layout>
                {
                    tasks.map((task, index) => {
                        if (task.archive === true && task.trash === false) {
                            return <Archive id={index} title={task.title} task={task.task} backgroundColor={task.color} removeFromArchives={removeFromArchives}/>
                        }
                    })
                }
            </motion.div>

        </div>
    )
}

export default ArchiveBody
