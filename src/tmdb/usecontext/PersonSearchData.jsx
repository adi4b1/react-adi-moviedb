import React, { createContext, useEffect, useReducer, useState } from 'react'


export const createpersonsearchdata=createContext()

const personSearchDataHandler=(state,action)=>{
    switch(action.type){
        case "load":
            return {...state,load:true,error:null}
        case "data":
            return {...state,load:false,data:action.payload,error:null}
        case "error":
            return {...state,error:action.payload}
        default:
            return state
    }
}



const PersonSearchData = ({children}) => {

    const initialState={
        load:true,
        data:null,
        error:null,
    }

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5N2NkMWY2ZDIwMjRkZjQ1NzM2MDJlYTQ3Nzg2OTg0NCIsIm5iZiI6MTcyNzk1MzAxMC43NDY3NDQsInN1YiI6IjYzY2EzYzAwYmIwNzBkMDA4NGU0NDQ0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uzIz5CRuollNf3uW62pJqEU6G1Ot9kBVXpFSvdqqZ_M'
        }
      };
    
     
    const getPersonDataFromApi=async()=>{
       try{
        dispatch({type:'load'})
        const APId=`https://api.themoviedb.org/3/search/person?query=${searchname}&include_adult=false&language=en-US`
        const fetchData=await fetch(APId,options)

        const convertToJson=await fetchData.json()
        dispatch({type:'data',payload:convertToJson.results})
        // console.log(convertToJson.results);
        
       }catch(error){
            dispatch({type:"error",payload:"error fetch data"})
       }



    }
    const[getPersonSearchData,dispatch]=useReducer(personSearchDataHandler,initialState)
      const [searchname,setsearchname]=useState("")
  
// console.log('fuc',searchname);


    useEffect(()=>{
        getPersonDataFromApi()
    },[searchname])
  return (
   <createpersonsearchdata.Provider value={{getPersonSearchData,searchname,setsearchname}}>
    {children}
   </createpersonsearchdata.Provider>
  )
}

export default PersonSearchData;