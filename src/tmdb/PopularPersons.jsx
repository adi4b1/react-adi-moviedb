import React, { useContext, useEffect, useState } from 'react'
import { userContextPersonDeails } from './UserProvider';
import { poster_parent_url } from './MovieDetails';
import { useNavigate, useParams } from 'react-router-dom';
const PopularPersons = () => {
    const{id}=useParams()
    let pageid=Number(id)
    console.log(typeof pageid);
    

    let{allpersons,pageId,setpageId}=useContext(userContextPersonDeails)
   
    const[pageidstate,setpageidstate]=useState(pageid||"1")
    const navigate=useNavigate()
    const pageHandler=(e)=>{
        let pagenewId=e.target.value
        setpageidstate(pagenewId)
        setpageId(pagenewId)
        navigate(`/persons/${pagenewId}`)
        if(pagenewId===null||pagenewId===undefined||pagenewId===""){
            pagenewId=1;
            navigate(`/persons/${pagenewId}`)
        }

    }

    const increment=(e)=>{
        setpageidstate(pageidstate+1)
        setpageId(pageidstate+1)
        // console.log(pageidstate+1);
        navigate(`/persons/${pageidstate}`)
        // if(pageidstate===null||pageidstate===undefined||pageidstate===""){
            
        //     navigate(`/persons/${pageidstate}`)
        // }
        
    }
    // console.log(pageidstate);
    
    const decrement=(e)=>{

        if(pageidstate>1){
            setpageidstate(pageidstate-1)
            setpageId(pageidstate-1)
            navigate(`/persons/${pageidstate}`)
        // if(pageidstate===null||pageidstate===undefined||pageidstate===""){
            
        //     navigate(`/persons/${pageidstate}`)
        // }
        }
        
    }
  return (
    <>
    {allpersons.error&&<p>error fetching data,check your network connection</p>}
    
     
    <div className="labelInputInPopularPerson">
        <span className='popularLabel'>Popular People</span>
        <div style={{display:'flex',flexDirection:'row',gap:'10px'}}>
        <button onClick={decrement}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
        </svg>
        </button>
        <input type="number" min={1} max={250} value={pageidstate} onChange={pageHandler}/>
        <button onClick={increment}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
        </svg>
        </button>
        </div>
        {allpersons.load&&
    
        <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
        </div>
    
    }
    </div>
    <div>
   
       
    </div>
     
    {

        !allpersons.load && allpersons.data&&(
            
            <div className='personImageDetails'>
               
                {
                    
                    allpersons.data.map((item)=>{
                        return(
                            <>
                            
                                <div className="" >
                                    <img key={item.profile_path} src={`${poster_parent_url}${item.profile_path}`} className="profileDimensions"alt=""/>
                                    <p key={item.id}className='actorName'>{item.name}|{item.known_for_department.slice(0,20)}</p>
                                </div>
                                
                            </>
                        )
                    })
                }
            </div>
        )
    }
        
    </>
  )
}

export default PopularPersons