import {createSlice} from '@reduxjs/toolkit'

export const darkmodeSlice=createSlice({
    name:'darkmode',
    initialState:{
        value:false,
        
    },
    reducers:{
        changemode:(state,action)=>{
            state.value=action.payload
        }
    }
})


export const{changemode}=darkmodeSlice.actions

export default darkmodeSlice.reducer