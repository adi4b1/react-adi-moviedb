import React, { useContext, useRef,useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import PopularPersons from './PopularPersons'
import {userContextPersonDeails} from './UserProvider'
import { createpersonsearchdata } from './usecontext/PersonSearchData'
import { poster_parent_url } from './MovieDetails'
import { changemode } from '../redux/darkmodeSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

const Nav = () => {
  const inp=useRef(null)

const{pageId,setpageId}=useContext(userContextPersonDeails)
// const[showdarkMode,setshowdarkMode]=useState(false)



useEffect(()=>{
  inp.current.focus()
},[])
///for searching data results from (useContext hook)
const{getPersonSearchData,searchname,setsearchname}=useContext(createpersonsearchdata)



const[forresults,setforresults]=useState(null)

// const[forpersonname,setpersonname]=useState('')

const dis=useDispatch()

const getDarkData=useSelector((state)=>state.darkmode.value)
const darkModeHandler=()=>{
  dis(changemode(!getDarkData))
  // setshowdarkMode(getDarkData)
  console.log(getDarkData);
  
}
const displayDropdownHandler=()=>{
  
  setforresults(!forresults)
}

const personnameHandler=(e)=>{
  // setpersonname(e.target.value)
  let personName=e.target.value
  // console.log(personName);
  
  setsearchname(personName)
  // if(personName.length>1){
  //   setforresults(!forresults)
  // }else{
  //   setforresults(null)
  // }
}


// useEffect(()=>{
          
//   // if(pageId===null||pageId===undefined){
//   //   pageId=1
//   // }
//   // getApipersonData()
    
// },[pageId])
  return (
    <div className='navbar'>
       
          <Link to="/">
            Adimoviedb
          </Link>

          <Link to={`/persons/${pageId}`}>
          Persons
          </Link>
         
         
   
        <button className='darkModeButton' onClick={darkModeHandler}>
          {getDarkData?
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-brightness-low" viewBox="0 0 16 16">
           <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8m.5-9.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m0 11a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m5-5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m-11 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m9.743-4.036a.5.5 0 1 1-.707-.707.5.5 0 0 1 .707.707m-7.779 7.779a.5.5 0 1 1-.707-.707.5.5 0 0 1 .707.707m7.072 0a.5.5 0 1 1 .707-.707.5.5 0 0 1-.707.707M3.757 4.464a.5.5 0 1 1 .707-.707.5.5 0 0 1-.707.707"/>
         </svg>
         :
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-brightness-low-fill" viewBox="0 0 16 16">
          <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0M8.5 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m0 11a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m5-5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m-11 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m9.743-4.036a.5.5 0 1 1-.707-.707.5.5 0 0 1 .707.707m-7.779 7.779a.5.5 0 1 1-.707-.707.5.5 0 0 1 .707.707m7.072 0a.5.5 0 1 1 .707-.707.5.5 0 0 1-.707.707M3.757 4.464a.5.5 0 1 1 .707-.707.5.5 0 0 1-.707.707"/>
        </svg>
          
          
         
          }
          </button>
        {/* {showdarkMode&&'hlo'} */}
        <div className='searchBarBody'>
         
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
          </svg>
          <input type="search" ref={inp}value={searchname} onChange={personnameHandler}onInput={displayDropdownHandler}/>
          
          {
            forresults&&

            <div className='forResults'>
                {
                  getPersonSearchData.error&&<p>error fetch the data</p>
                }
                {
                  getPersonSearchData.load&&

                  <div className="personsearchspin d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                }

                {
                  !getPersonSearchData.load && getPersonSearchData.data&&(
                      <div>
                        {
                          getPersonSearchData.data.map((item,index)=>{
                            return(

                              <>
                              <Link key={index} to={`/person/${item.id}/${item.name}`}>
                              
                              <div key={item.name}  className='forsearchpeoplebody' >
                                
                                <img src={item.profile_path?`${poster_parent_url}${item.profile_path}`:"pic"} className='searchPersonImage' alt="" />
                                <p>{item.name.slice(0,20)}</p>
                            
                              </div>
                              
                              </Link>
                              
                              </>
                             
                            )
                          })
                        }
                      </div>
                  )
                }
            </div>
          }
          
        </div>
    </div>
  )
}

export default Nav