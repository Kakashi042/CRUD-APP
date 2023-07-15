import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showUser } from '../Features/userDetailSlice';
import CustomModal from './CustomModal';

const Read = () => {

    const dispatch = useDispatch();

    const [id, setId] = useState();

    const {users, loading} = useSelector((state)=>state.app)

    const [showPopup, setShowPopup] = useState(false);
    useEffect(()=>{
        dispatch(showUser());
    },[]);

    if(loading){
        return(<h2>Loading</h2>)
    }

  return (
    <div>
        {showPopup && <CustomModal id={id} showPopup={showPopup} setShowPopup={setShowPopup}/>}
        <h2>ALL Data</h2>
        {users && 
            users.map((ele)=>(
            <div key={ele.id} className="card">
            <div className="card-body">
                <h5 className="card-title">{ele.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{ele.email}</h6>
                <p className="card-text">{ele.gender}</p>
                <button className="card-link" onClick={()=>[setId(ele.id), setShowPopup(true)]}>View</button>
                <a href="#" className="card-link">Edit</a>
                <a href="#" className="card-link">Delete</a>
            </div>
            </div>))}
    </div>
  )
}

export default Read;