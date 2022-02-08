import React, { useEffect, useState, useContext } from 'react'
import { doc, updateDoc, onSnapshot } from '@firebase/firestore'
import { db } from '../config/firebase'
import { MyContext } from '../App'
import Remainder from './Remainder'
import '../Styles/Remainder.css'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { motion } from 'framer-motion'

const RemainderBody = () => {

    const [tasks, setTasks] = useState([])
    const user = useContext(MyContext)
    const docRef = doc(db, 'users', user.uid)
    const [configureDate, setConfigureDate] = useState(false)
    const [remainderDate, setRemainderDate] = useState(new Date())
    const [dateId, setDateId] = useState(null)


    useEffect(() => {
        try {
            onSnapshot(docRef, (doc) => {
                setTasks(doc.data().tasks)
            })

        } catch (error) {
            console.log(error);
        }
    }, [user])


    const removeRemainder = async (id) => {

        let data = tasks
        data[id].remainder = false
        data[id].remindAt = null
        await updateDoc(docRef, {
            tasks: data
        })

    }
    const submitDate = async () => {

        setConfigureDate(false)
        // console.log(dateId);
        // console.log(remainderDate);
        let data = tasks
        data[dateId].remindAt = remainderDate.toDateString();
        await updateDoc(docRef, {
            tasks: data
        })


    }




    return (
        <>
            <div className='remainderBody-container'>
                <h1 className="remainderBody-heading">Your Remainders</h1>
                <motion.div className='remainderBody' layout>

                    {
                        tasks.map((task, index) => {
                            if (task.remainder === true && task.trash === false) {
                                return <Remainder title={task.title} task={task.task} backgroundColor={task.color} remainder={task.remainder} remindAt={task.remindAt} removeRemainder={removeRemainder} id={index}
                                    setConfigureDate={setConfigureDate} submitDate={submitDate} remainderDate={remainderDate} setDateId={setDateId} />
                            }
                        })
                    }
                </motion.div>
            </div>

            {
                configureDate ? <motion.div className="calendarBackdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{
                    top: `${window.pageYOffset}px`
                }}>

                    <motion.div initial={{ y: '-100px' }} animate={{ y: '0px' }} transition={{ delay: '1s' }}>

                        <h1 className='calendar-heading'>Select Date</h1>

                        <motion.div className="calendar-container">
                            <Calendar value={remainderDate} onChange={setRemainderDate} />
                        </motion.div>

                        <button className='selectDateButton' onClick={submitDate} > OK </button>
                    </motion.div>
                </motion.div> : ''
            }
        </>

    )
}

export default RemainderBody
