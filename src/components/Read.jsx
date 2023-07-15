import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showUser } from '../Features/userDetailSlice';

const Read = () => {

    const dispatch = useDispatch();

    const {users, loading} = useSelector((state)=>state.app)

    useEffect(()=>{
        dispatch(showUser());
    },[]);

    if(loading){
        return(<h2>Loading</h2>)
    }

  return (
    <div>
        <h2>ALL Data</h2>
        {users && 
            users.map((ele)=>(
            <div className="card">
            <div className="card-body">
                <h5 className="card-title">{ele.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{ele.email}</h6>
                <p className="card-text">{ele.gender}</p>
                <a href="#" className="card-link">View</a>
                <a href="#" className="card-link">Edit</a>
                <a href="#" className="card-link">Delete</a>
            </div>
            </div>))}
    </div>
  )
}

export default Read;