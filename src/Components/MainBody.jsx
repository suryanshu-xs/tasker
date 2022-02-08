import React, { useEffect, useRef, useState, useContext } from 'react'
import '../Styles/Mainbody.css'
import { doc, updateDoc, onSnapshot } from '@firebase/firestore'
import { db } from '../config/firebase'
import { MyContext } from '../App'
import Task from './Task'
import { motion } from 'framer-motion'

const MainBody = () => {
    const notesInputBox = useRef(null)
    const titleBox = useRef(null)
    const [title, settitle] = useState('')
    const [input, setinput] = useState('')
    const optionsContainer = useRef(null)
    const user = useContext(MyContext)
    const [tasks, setTasks] = useState([])
    const docRef = doc(db, 'users', user.uid)

    




    useEffect(() => {


        try {

            onSnapshot(docRef, (doc) => {
                if(doc.data().tasks){
                    setTasks(doc.data().tasks)
                }else{
                    setTasks([])
                }
                
                
            })


        } catch (error) {
            console.log(error);
        }


    }, [user])


    const handleSubmitClick = async () => {

        let data = tasks;
        if (title !== '' && input !== '') {
            data.unshift({
                title: title,
                task: input,
                createdAt: new Date(),
                finished: false,
                remainder: false,
                remindAt: null,
                trash: false,
                archive: false,
                color: 'rgba(36, 36, 36, 0.924)'
            })
            await updateDoc(docRef, {
                tasks: data
            })

        }
        handleClose()
    }




    const handleInputClick = () => {

        titleBox.current.style.display = 'block'
        optionsContainer.current.style.display = 'flex'
        


    }
    const handleClose = () => {
        settitle('')
        setinput('')
        titleBox.current.style.display = 'none'
        optionsContainer.current.style.display = 'none'


    }




    const updateArchive = async (id) => {
        let data = tasks;
        data[id].archive = !data[id].archive
        await updateDoc(docRef, {
            tasks: data
        })
    }
    const updateTrash = async (id) => {
        let data = tasks
        data[id].trash = !data[id].trash
        await updateDoc(docRef, {
            tasks: data
        })
    }
    const updateRemainder = async (id) => {
        let data = tasks
        let today = new Date();
        today.setHours(today.getHours()+24);
        if(data[id].remainder!==true){
            data[id].remindAt = today.toDateString()
        }else{
            data[id].remindAt = null
        }

        data[id].remainder = !data[id].remainder

        
        await updateDoc(docRef, {
            tasks: data
        })
    }
    const updatePalatteColor = async (id, paletteColor) => {
        let data = tasks
        data[id].color = paletteColor
        await updateDoc(docRef, {
            tasks: data
        })
    }


    return (
        <>
        <div className='mainbody'>

            <div className="userInputContainer">

                <input type="text" ref={titleBox} value={title} placeholder='TITLE' className='titleInputBox' onChange={(e) => settitle(e.target.value)} />


                <input ref={notesInputBox} type="text" placeholder='Write Something' className='notesInputBox' value={input} onClick={handleInputClick} onChange={(e) => setinput(e.target.value)} />



                <div className="input-optionsContainer" ref={optionsContainer}>

                    <i className="fas fa-check-circle" id='check-circle' onClick={handleSubmitClick}></i>
                    <i className="fas fa-times-circle" id='times-circle' onClick={handleClose}></i>
                </div>




            </div>

            <motion.div className="tasksContainer" layout>
                {
                    tasks.map((task, index) => {
                        if (!task.trash) {
                            return (
                                <Task id={index} title={task.title} task={task.task} createdAt={task.createdAt} finished={task.finished} remainder={task.remainder} trash={task.trash} remindAt={task.remindAt} backgroundColor={task.color} archive={task.archive} updateArchive={updateArchive} updateTrash={updateTrash} updateRemainder={updateRemainder} updatePalatteColor={updatePalatteColor} />
                            )
                        }

                    })
                }
            </motion.div>
         

        </div>
    
        </>
    )
}

export default MainBody
