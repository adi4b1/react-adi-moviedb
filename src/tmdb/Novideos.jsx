import React from 'react'
import video from '../assets/video.png'
const Novideos = () => {
  return (
    <>
        <div className='novideo'>
            <img src={video} alt="videos" className='novideoimg'/>
            <h4>No videos found</h4>
        </div>
    </>
  )
}

export default Novideos