import React, { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux';
import {createUser} from '../Features/userDetailSlice'
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const [users, setUsers] = useState();
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const getUserData = (e) => {
        setUsers({...users, [e.target.name]:e.target.value});
        
    }

    // useEffect(()=>{
    //     getUserData(e);
    // },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('users...',users);
        dispatch(createUser(users));
        navigate('/read');
    }

    return (
        <form className='w-50 mx-auto mt-5' onSubmit={handleSubmit}>
        <h2>Fill the form</h2>
        <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" name='name' className="form-control" onChange={getUserData}/>
        </div>
        <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" name='email' className="form-control" onChange={getUserData}/>
        </div>
        <div className="mb-3">
            <label className="form-label">Age</label>
            <input type="password" name='age' className="form-control" onChange={getUserData}/>
        </div>
        <div className="mb-3">
            <input className="form-check-input" name='gender' value='Male' type="radio" onChange={getUserData}/>
            <label className="form-check-label">
                Male
            </label>
        </div>
        <div className="mb-3">
            <input className="form-check-input" name='gender' value='Female' type="radio" onChange={getUserData}/>
            <label className="form-check-label">
                Female
            </label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}

export default Create