import React, { useState,useRef } from 'react'
import { useEffect } from 'react'
import { useReducer } from 'react'
import ImageCard from './ImageCard'
import Loader from './Loader'
import NetworkError from './NetworkError'
export const apiGlobalData=[]
import { useDispatch } from 'react-redux'

import { addUsers} from '../redux/userSlice'
import { changemode } from '../redux/darkmodeSlice'
import { useSelector } from 'react-redux'
const Home = () => {
    
    const[username,setUsername]=useState("")
    const[displayBox,setdisplayBox]=useState(false)
    const initialState={
        load:true,
        data:null,
        error:null,
    }
    const reduceHandlerFunction=(state,action)=>{
        switch(action.type){
            case 'load':
                return{...state,load:true,error:null}
            case 'data':
                return{...state,load:false,data:action.payload,error:null}

            case 'error':
                return{...state,load:false,error:action.payload}
            default:
                return state
        }
    }
    const[moviesData,dispatch]=useReducer(reduceHandlerFunction,initialState)
    const[trendRadio,settrendRadio]=useState('day')
    
    

    const newUsers=useDispatch()
    
    const newSub=useSelector((state)=>state.newSubscribers.users)
   const newsubcount=useSelector((state)=>state.newSubscribers.users.length)
   //for darkmode
   
   const getdarkmodeData=useSelector((state)=>state.darkmode.value)
   
   const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5N2NkMWY2ZDIwMjRkZjQ1NzM2MDJlYTQ3Nzg2OTg0NCIsIm5iZiI6MTcyNzk1MzAxMC43NDY3NDQsInN1YiI6IjYzY2EzYzAwYmIwNzBkMDA4NGU0NDQ0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uzIz5CRuollNf3uW62pJqEU6G1Ot9kBVXpFSvdqqZ_M'
  }
};



const getApiData=async()=>{
    try{
        dispatch({type:'load'})
        const API=`https://api.themoviedb.org/3/trending/all/${trendRadio}?language=en-US`

        const fetchData=await fetch(API,options)
    
        const convertData=await fetchData.json()
        // console.log('sddsdsdssds',convertData.results);
        // apiGlobalData.push(convertData)
        
        dispatch({type:'data',payload:convertData.results})
    }catch(error){
        dispatch({type:"error",payload:"error fetch data"})
    }
    

}

useEffect(()=>{
    
    
    getApiData()
    
},[trendRadio])

const radioHandler=(val)=>{
    settrendRadio(val)
}
const usernameHandler=(e)=>{
   
     setUsername(e.target.value)
    //  console.log(e.target.value);
     
    
 }

const subscriberHandler=(e)=>{
    e.preventDefault()
    // console.log(username);
    if(username.length>0){
        newUsers(addUsers(username))
    }
    
    setUsername("")
    

    
}

const getUsernamebox=()=>{
    setdisplayBox(true)
}
  return (
    <div className={getdarkmodeData&&'darkModeData'}>
    
      {moviesData.load&&<Loader/>}
        {
            moviesData.error&&
            <NetworkError/>
        }


            <div className='mainBody'>
                <div className='trendFilterBody'>
                    <h3>Trending</h3>
                    <label htmlFor="Today">
                        <input className='radioinput' type="radio" name="trendFilter" checked={trendRadio==="day"}  value="day" onChange={()=>radioHandler("day")}/> day
                    </label>
                    <label htmlFor="This week">
                        <input className='radioinput' type="radio" name="trendFilter" checked={trendRadio==="week"} value="week" onChange={()=>radioHandler("week")}/> week
                    </label>

                    <br />
                    
                    <div>
                        <p>Subscribers :{newsubcount}</p>
                        <button onClick={getUsernamebox}>Subscribe</button>
                        {displayBox&&<div>
                            <form onSubmit={subscriberHandler}>
                                <input type="text" className='addUsernameInput' name="username" value={username} onChange={usernameHandler}/>
                                <button type='submit'>Subscribe</button>
                            </form>
                        </div>}

                        <div>
                            {
                                newSub.map((item,index)=>{
                                    return(
                                        
                                            <ul key={index}>
                                                <li>{item}</li>
                                            </ul>
                                        
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div>
                {
                    
                    !moviesData.load && moviesData.data&&(
                        
                        <>
                        <div className='forparent'>
                       
                            {moviesData.data.map((item)=>{
                                return(
                                    
                                    <div key={item.id}>
                                        <ImageCard props={item}/>
                                    </div>
                                )
                            })
                        }
                        </div>
                        </>
                       
                    )
                }
                </div>
            </div>

        
    </div>
  )
}

export default Home