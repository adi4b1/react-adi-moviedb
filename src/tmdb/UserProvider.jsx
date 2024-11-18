import React, { createContext, useEffect, useReducer, useState } from 'react'


export const userContextPersonDeails=createContext()
const UserProvider = ({children}) => {
    const initialState={
        load:true,
        data:null,
        error:null
      }
    
      const peopleHanlder=(state,action)=>{
        switch(action.type){
          case 'load':
            return {...state,load:true,error:null}
          case 'data':
            return {...state,load:false,data:action.payload,error:null}
          case 'error':
            return {...state,error:action.payload}
        }
      }
    
          
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5N2NkMWY2ZDIwMjRkZjQ1NzM2MDJlYTQ3Nzg2OTg0NCIsIm5iZiI6MTcyNzk1MzAxMC43NDY3NDQsInN1YiI6IjYzY2EzYzAwYmIwNzBkMDA4NGU0NDQ0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uzIz5CRuollNf3uW62pJqEU6G1Ot9kBVXpFSvdqqZ_M'
        }
      };
      
      
      
     const getApipersonData=async()=>{
          try{
              dispatch({type:'load'})
              const API=`https://api.themoviedb.org/3/person/popular?language=en-US&page=${pageId}`
      
              const fetchData=await fetch(API,options)
          
              const convertpersonData=await fetchData.json()
              // console.log('persons',convertpersonData.results);
              // apiGlobalData.push(convertData)
              
              dispatch({type:'data',payload:convertpersonData.results})
          }catch(error){
              dispatch({type:"error",payload:"error fetch data"})
          }
          
      
      }
      
      
      
      const[pageId,setpageId]=useState(1)
      const[allpersons,dispatch]=useReducer(peopleHanlder,initialState)
  
      useEffect(()=>{
          
        if(pageId===null||pageId===undefined||pageId===''){
          setpageId(1)
        }
        getApipersonData()
          
      },[pageId])


      return (
    <userContextPersonDeails.Provider value={{allpersons,pageId,setpageId}}>
        {children}

    </userContextPersonDeails.Provider>
  )
}

export default UserProvider;