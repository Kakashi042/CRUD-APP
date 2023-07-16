import React from 'react'
import { useSelector } from 'react-redux'
import './CustomModal.css'

const CustomModal = ({id, showPopup, setShowPopup}) => {

  const allUsers = useSelector((state)=>state.app.users)
  
  const [singleUser] = allUsers.filter((ele)=>ele.id===id)
  

  return (
    <div className='modalBackground'>
        <div className='modalContainer'>
          <button onClick={()=>setShowPopup(false)}>Close</button>
          <h2>{singleUser.name}</h2>
          <h3>{singleUser.email}</h3>
          <h4>{singleUser.age}</h4>
          <p>{singleUser.gender}</p>
        </div>
    </div>
  )
}

export default CustomModal