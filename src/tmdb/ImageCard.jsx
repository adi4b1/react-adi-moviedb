import React from 'react'
import { Link } from 'react-router-dom';
// import MovieDetails from './MovieDetails';

const ImageCard = ({props,daylight}) => {
    const{title,original_title,original_name,id}=props || {}


    let movieName=decodeURIComponent(title
    ? title.toLowerCase().replace(/[\s:]+/g, "-")  // Replace spaces and colons with hyphen, ensuring no multiple hyphens
    : original_title
    ? original_title.toLowerCase().replace(/[\s:]+/g, "-")
    : original_name
    ? original_name.toLowerCase().replace(/[\s:]+/g, "-")
    : "undefined");


    // let movieNameor=original_title?original_title.split(" ").join('-'):''
    // let movieNameti=title?title.split(" ").join('-'):''
    // let movieNameon=original_name?original_name.split(" ").join('-'):''
    // console.log(movieNameor,movieNameti,movieNameon);
    
    // console.log('item',props.length);

    const baseImageUrl = "https://image.tmdb.org/t/p/w300";
    
  return (
   
        
       
            <div className='forImageDisplay'>
                  
                <Link to={`/movie/${id}/${encodeURIComponent(movieName)}`} className="navlinks">
                <div className="cardImage">
                    <img src={`${baseImageUrl}${props.poster_path}`} alt="pic"  />
                </div>
                <div className="extraInfo">
                    <p className={`${daylight===true?'cardTitle':'cardTitleBlack'}`}>{original_title?.substr(0,12)||original_name.substr(0,8)}</p>
                </div>
                </Link>
            </div>
       
  
  )
}

export default ImageCard