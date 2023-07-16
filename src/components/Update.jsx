import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { updateUser } from '../Features/userDetailSlice';

const Update = () => {

    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [updateData, setUpdateData] = useState();

    const {users, loading} = useSelector((state)=>state.app)

    useEffect(()=>{
        if(id){
            const singleUser = users.filter((ele)=>ele.id===id);
            setUpdateData(singleUser[0]);
        }
    },[])

    const newData = (e) =>{
        setUpdateData({...updateData, [e.target.name]: e.target.value})
    }

    console.log(updateData)

    const handleUpdate = (e)=>{
        e.preventDefault();
        dispatch(updateUser(updateData))
        setTimeout(()=>{
            navigate('/read');
        },1000)
    }

  return (
    <form className='w-50 mx-auto mt-5' onSubmit={handleUpdate}>
    <h2>Edit the form</h2>
    <div className="mb-3">
        <label className="form-label">Name</label>
        <input type="text" name='name' value={updateData && updateData.name} className="form-control" onChange={newData}/>
    </div>
    <div className="mb-3">
        <label className="form-label">Email</label>
        <input type="email" name='email' value={updateData && updateData.email} className="form-control" onChange={newData}/>
    </div>
    <div className="mb-3">
        <label className="form-label">Age</label>
        <input type="password" name='age' value={updateData && updateData.age} className="form-control" onChange={newData}/>
    </div>
    <div className="mb-3">
        <input className="form-check-input" name='gender' value='Male' type="radio" checked={updateData && updateData.gender==='Male'} onChange={newData}/>
        <label className="form-check-label">
            Male
        </label>
    </div>
    <div className="mb-3">
        <input className="form-check-input" name='gender' value='Female' type="radio" checked={updateData && updateData.gender==='Female'} onChange={newData}/>
        <label className="form-check-label">
            Female
        </label>
    </div>
    <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}

export default Update