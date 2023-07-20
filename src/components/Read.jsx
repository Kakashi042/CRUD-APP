import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showUser, deleteUser } from '../Features/userDetailSlice';
import CustomModal from './CustomModal';
import {Link} from 'react-router-dom'

const Read = () => {

    const dispatch = useDispatch();

    const [id, setId] = useState();
    const [radioData, setRadioData] = useState('All');

    const {users, loading, searchData} = useSelector((state)=>state.app)

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
        <input className="form-check-input" name='gender' value='All' type="radio" checked={radioData==='All'} onChange={(e)=>setRadioData('All')}/>
            <label className="form-check-label">All</label>
        <input className="form-check-input" name='gender' value='Male' type="radio" checked={radioData==='Male'} onChange={(e)=>setRadioData(e.target.value)}/>
            <label className="form-check-label">Male</label>
        <input className="form-check-input" name='gender' value='Female' type="radio" checked={radioData==='Female'} onChange={(e)=>setRadioData(e.target.value)}/>
            <label className="form-check-label">Female</label>
        {users && 
            users
            .filter((ele)=>{
                if(searchData.length==0){
                    return ele
                }else{
                    return ele.name.toLowerCase().includes(searchData.toLowerCase());
                }
            })
            .filter((ele)=>{
                if(radioData==='Male'){
                    return ele.gender === radioData
                }
                else if(radioData==='Female'){
                    return ele.gender === radioData
                }else{
                    return ele
                }
            })
            .map((ele)=>(
            <div key={ele.id} className="card">
            <div className="card-body">
                <h5 className="card-title">{ele.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{ele.email}</h6>
                <p className="card-text">{ele.gender}</p>
                <button className="card-link" onClick={()=>[setId(ele.id), setShowPopup(true)]}>View</button>
                <Link to={`/edit/${ele.id}`} className="card-link">Edit</Link>
                <Link onClick={()=>dispatch(deleteUser(ele.id))} className="card-link">Delete</Link>
            </div>
            </div>))}
    </div>
  )
}

export default Read;