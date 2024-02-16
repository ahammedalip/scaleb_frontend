import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    currentUser :null,
    loading: false,
    error: false
}

const userSlice = createSlice({
    name: 'retailer',
    initialState,
    reducers :{
        signInStart : (state)=>{
            state.loading= true
        },
        signInSuccess: (state, action) =>{
            state.currentUser= action.payload.user

        },
        
    }
})

export const{
    signInStart,
    signInSuccess

}= userSlice.actions

export default userSlice.reducer
