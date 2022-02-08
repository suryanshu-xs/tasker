
import './App.css';
import Navbar from './Components/Navbar';
import SideBar from './Components/SideBar'
import MainBody from './Components/MainBody';
import RemainderBody from './Components/RemainderBody'
import ArchiveBody from './Components/ArchiveBody'
import TrashBody from './Components/TrashBody'
import { createContext, useState } from 'react';
import { signInWithPopup, GoogleAuthProvider } from "@firebase/auth";
import { auth, provider } from "./config/firebase";
import { db } from './config/firebase'
import { collection, getDocs, query, where, doc, setDoc } from '@firebase/firestore';
import logoimg from './tasks.png'



const MyContext = createContext({})
function App() {

  const [user, setuser] = useState(null)
  const [error, seterror] = useState(null)
  const [active, setActive] = useState('notes')





  let elementToRnder = <></>
  switch (active) {
    case 'trash':
      elementToRnder = <TrashBody />
      break;
    case 'remainder':
      elementToRnder = <RemainderBody />
      break;
    case 'archive':
      elementToRnder = <ArchiveBody />
      break;
    default:
      elementToRnder = <MainBody />
  }





  const Auth = () => {
    signInWithPopup(auth, provider).then((result) => {
      const credentials = GoogleAuthProvider.credentialFromResult(result)
      const token = credentials.accessToken;
      setuser(result.user)

    }).catch((error) => {
      seterror(error.message)
    })

  }


  const findDocs = async () => {

    try {
      const collectionRef = collection(db, 'users');
      const q = query(collectionRef, where('email', '==', `${user.email}`))
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        const data = {
          email: user.email,
          name: user.displayName,
          createdAt: Date.now()
        }

        await setDoc(doc(db, 'users', user.uid), data)
        //create subcollection 'tasks'
      }
    } catch (error) {
      console.log(error)
    }

  }

  if (user !== null) {
    findDocs()

  }




  return (user ? (

    <MyContext.Provider value={user}>
      <div className="App">
        <Navbar />
        <div className="mainbody-sidebar-container">
          <SideBar setActive={setActive} active={active} />
          {elementToRnder}
        </div>
      </div>
    </MyContext.Provider>


  ) : (
    <div className="login-container-backdrop">
      <div className="login-container">

        <img src={logoimg} className="login-container-logo"/>
        <h1 className='login-container-heading'>Sign in to Tasker</h1>
        <button className='login-container-button' onClick={Auth} >Sign In</button>
      </div>
    </div>))
}


export default App;
export { MyContext }
