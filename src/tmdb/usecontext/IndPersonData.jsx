import React, { createContext, useEffect, useReducer, useState } from 'react'

export const IndPersonDataContext=createContext()

const personDetailsHandler=(state,action)=>{
    switch(action.type){
        case 'load':
            return{...state,load:true,error:null}
        case 'data':
            return {...state,load:false,data:action.payload,error:null}
        case 'error':
            return{...state,error:action.payload}
        default:
            return state
    }
}
const IndPersonData = ({children}) => {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5N2NkMWY2ZDIwMjRkZjQ1NzM2MDJlYTQ3Nzg2OTg0NCIsIm5iZiI6MTcyNzk1MzAxMC43NDY3NDQsInN1YiI6IjYzY2EzYzAwYmIwNzBkMDA4NGU0NDQ0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uzIz5CRuollNf3uW62pJqEU6G1Ot9kBVXpFSvdqqZ_M'
        }
      }; 

    const initialState={
        load:true,
        data:null,
        error:null,
    }


    const[persondetails,dispatch]=useReducer(personDetailsHandler,initialState)
    // const[indpersonId,setindpersonId]=useState("")
    // console.log('indpersid',indpersonId);
    
    const getIndividualPersonData=async(id)=>{
        try{
            dispatch({type:"load"})
            const API=`https://api.themoviedb.org/3/person/${id}?language=en-US`
            const fetchIndData=await fetch(API,options)

            const convertIndData=await fetchIndData.json()
            // console.log('indpersondet',convertIndData);
            
            dispatch({type:'data',payload:convertIndData})
        }catch(error){

            dispatch({type:'error',payload:'errror fetching  data'})
        }
    }
 
    return (
    <IndPersonDataContext.Provider value={{persondetails,getIndividualPersonData}}>
        {children}
    </IndPersonDataContext.Provider>
  )
}

export default IndPersonData