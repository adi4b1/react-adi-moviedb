import React, { useEffect, useReducer } from 'react'
import { poster_parent_url } from './MovieDetails';
import userimagenotfound from '../assets/user.png';
import NotFound from './NotFound';
import { Link } from 'react-router-dom';
const Actors = ({actordetails}) => {
// console.log(actordetails);


// console.log(actordetails);

  const initialState={
    load:true,
    data:null,
    error:null,
  }

  const actorreducerHandler=(state,action)=>{
    switch(action.type){
      case 'load':
        return {...state,load:true,error:null}
      case 'data':
        return {...state,load:false,data:action.payload,error:null}
      case 'error':
        return {...state,load:false,error:action.payload}
      default:
        return state
    }
  }


    const[actorDetailsList,dispatch]=useReducer(actorreducerHandler,initialState)
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5N2NkMWY2ZDIwMjRkZjQ1NzM2MDJlYTQ3Nzg2OTg0NCIsIm5iZiI6MTcyNzk1MzAxMC43NDY3NDQsInN1YiI6IjYzY2EzYzAwYmIwNzBkMDA4NGU0NDQ0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uzIz5CRuollNf3uW62pJqEU6G1Ot9kBVXpFSvdqqZ_M'
      }
    };

    const getMovieActorsDetails=async()=>{

      try{
        dispatch({type:'load'})
        const getDetailsApi=`https://api.themoviedb.org/3/movie/${actordetails}/credits?language=en-US`

      const fetchDataActors=await fetch(getDetailsApi,options)

      const conData=await fetchDataActors.json()
      dispatch({type:"data",payload:conData})
      console.log('dfdfs',conData);
      
      }catch(error){
        dispatch({type:'error',payload:"error fetch details"})
      }
    }

    useEffect(()=>{
      getMovieActorsDetails()
    },[])

  return (
    <div>
      {actorDetailsList.error&&
      <p>Getting error while fetch data</p>
      }

      {actorDetailsList.load&&
          <div className="actordetailspinner d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
        
      }
<label style={{padding:'5px 85px',color:'white'}}>Cast & crew</label>
      {!actorDetailsList.load&&actorDetailsList.data?(
        
        <div className='mainActorBodyForScroll'>
          
          {
            actorDetailsList?.data?.cast?.map((item)=>{
              return(
                item?(
                  <div key={item.name} className='actorInfo'>
                    <Link to={`/person/${item.id}/${item.name}`} key={item.id}>
                    <img  className="actor_image"src={
                      item.profile_path?
                      `${poster_parent_url}${item.profile_path}`:`${userimagenotfound}`
                    }  alt={item.id} />
                    <h6 style={{color:"white",padding:1}}>{item.name.substr(0,25)}</h6>
                    <span style={{color:"white",padding:0}}>{item.known_for_department} | {item.character}</span>
                    </Link>
                  </div>
                ):'not found'
                 
               
              )
            })
          }

          {
            actorDetailsList?.data?.crew?.map((item)=>{
              return(
                  item?(
                    <div className='actorInfo'>
                       <Link to={`/person/${item.id}/${item.name}`} key={item.id}>
                    <img key={item.id} className="actor_image"src={
                      item.profile_path?`${poster_parent_url}${item.profile_path}`:`${userimagenotfound}`
                    } alt="" />
                    <h6 style={{color:"white",padding:5}}>{item.name.substr(0,25)}</h6>
                    <span style={{color:"white",padding:5}}>{item.job} | {item.name}</span>
                    </Link>
                  </div>
                  ):<NotFound/>
                  
               
              )
            })
          }
        </div>


        
      ):<NotFound/>}
    </div>
  )
}

export default Actors