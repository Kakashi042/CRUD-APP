import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//create Action
export const createUser = createAsyncThunk('createUser', async (data, {rejectWithValue}) => {
    const response = await fetch('https://64b02baac60b8f941af55987.mockapi.io/crud',{
        method: 'POST',
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    try{
        const result = await response.json();
        console.log(result);
        return result;
    }catch(error){
        return rejectWithValue(error)
    }
})

//read action
export const showUser = createAsyncThunk('showUser', async()=>{
    const response = await fetch('https://64b02baac60b8f941af55987.mockapi.io/crud');
    try{
        const result = await response.json();
        console.log(result)
        return result;
    }catch(error){
        return error;
    }
})

//delete action
export const deleteUser = createAsyncThunk('deleteUser', async(id)=>{
    const response = await fetch(`https://64b02baac60b8f941af55987.mockapi.io/crud/${id}`,{
        method:"DELETE"
    });
    try{
        const result = await response.json();
        console.log(result)
        return result;
    }catch(error){
        return error;
    }
})

//update action
export const updateUser = createAsyncThunk('updateUser', async(data)=>{
    console.log('updated data', data)
    const response = await fetch(`https://64b02baac60b8f941af55987.mockapi.io/crud/${data.id}`,{
        method:"PUT",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    try{
        const result = await response.json();
        console.log(result)
        return result;
    }catch(error){
        return error;
    }
})

export const userDetail = createSlice({
    name:'userDetail',
    initialState:{
        users:[],
        loading:false, 
        error:null,
        searchData:[],
    },
    reducers:{
        searchUser:(state,action)=>{
            console.log(action.payload)
            state.searchData = action.payload
        }
    }
    ,
    extraReducers:{
        [createUser.pending]:(state)=>{
            state.loading = true
        },
        [createUser.fulfilled]:(state, action)=>{
            state.loading = false
            state.users.push(action.payload)
        },
        [createUser.rejected]:(state, action)=>{
            state.loading = false
            state.error = action.payload.message
        },
        [showUser.pending]:(state)=>{
            state.loading = true
        },
        [showUser.fulfilled]:(state, action)=>{
            state.loading = false
            state.users = action.payload
                
        },
        [showUser.rejected]:(state, action)=>{
            state.loading = false
            state.error = action
        },
        [deleteUser.pending]:(state)=>{
            state.loading = true
        },
        [deleteUser.fulfilled]:(state, action)=>{
            state.loading = false

            const {id} = action.payload
            if(id){
                state.users = state.users.filter((ele)=> ele.id!==id);
            }
            console.log('Delete',action.payload)
            
        },
        [deleteUser.rejected]:(state, action)=>{
            state.loading = false
            state.error = action
        },
        [updateUser.pending]:(state)=>{
            state.loading = true
        },
        [updateUser.fulfilled]:(state, action)=>{
            state.loading = false
            // state.users = state.users.map((data)=>{
            //    return data.id == action.payload.id ? action.payload : data
            // })
            state.users = state.users.map(e=>{
                // if(e.id == action.payload.id){
                //     return action.payload
                // }else{ return e }
                return e.id === action.payload.id ? action.payload : e}
            )

            console.log('data',state.users)
        },
        [updateUser.rejected]:(state, action)=>{
            state.loading = false
            state.error = action.payload
        }
    }
})

export default userDetail.reducer;

export const {searchUser} = userDetail.actions;