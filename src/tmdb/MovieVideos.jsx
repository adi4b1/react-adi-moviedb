import React, { useEffect, useState, useRef } from "react";
import { fetchVideos } from "../redux/videoSlice";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Loader from "./Loader";
import NotFound from "./NotFound";
import Novideos from "./Novideos";
const MovieVideos = () => {
  const controlVideo = useRef([]);
  const [videoType, setVideoType] = useState("");
  const [playingVideo, setplayingVideo] = useState(null);
  // useEffect(()=>{
  //     inputRef.current.focus()
  // },[])
  const { id } = useParams();
  const movieid = Number(id);

  // console.log('movieid',movieid);
  // console.log('mid',movieid);

  const dispatch = useDispatch();

  const { videos, status, error } = useSelector((state) => state.videos);
//   console.log(videos.results.length);

  useEffect(() => {
    if (movieid) {
      dispatch(fetchVideos(movieid));
      console.log("sdasdasd", videos.results);
    }
  }, [movieid, dispatch]);

  if (status === "loading") {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (status === "failed") {
    return <div>error:{error}</div>;
  }

  const changeHandler = (e) => {
    setVideoType(e.target.value);
    // console.log('dsd',e.target.value);
  };

  const playVideo = (index) => {
    if (playingVideo !== null && playingVideo !== index) {
      pauseVideo(playingVideo);
    }

    setplayingVideo(index);
    // alert('sdfasdfasfrr',index);
    if (controlVideo.current[index]) {
      controlVideo.current[index].contentWindow.postMessage(
        JSON.stringify({ event: "command", func: "playVideo" }),
        "*"
      );
    }
  };

  const pauseVideo = (index) => {
    if (controlVideo.current[index]) {
      controlVideo.current[index].contentWindow.postMessage(
        JSON.stringify({ event: "command", func: "pauseVideo" }),
        "*"
      );
    }
  };

  return (
    <>
    <div className="videosParent">
    {/* {videos.results} */}
        {videos?.results?.length>0?
        <>
        <div className="firstBlockinvideos">
        <h2>Types</h2>
        <small>
          <em>Please select the types</em>
        </small>
        <select name="type" onChange={(e) => changeHandler(e)}>
          {[...new Set(videos?.results?.map((i, index) => i.type))].map(
            (type, index) => {
              return (
                <option key={type} value={type}>
                  {type}
                </option>
              );
            }
          )}
        </select>
      </div>
      <div className="mainVideosBody">
        {videos?.results?.length>0?<>
            {videos?.results?.map((item, index) => {
          return item.type === `${videoType}` ? (
            <div className="videosDisplay" key={index}>
              {/* {videoType} */}
              <div
                onMouseEnter={() => playVideo(index)}
                onMouseLeave={() => {
                  pauseVideo(index);

                  setplayingVideo(null);
                }}
                key={index}
              >
                <iframe
                  ref={(el) => (controlVideo.current[index] = el)}
                  key={item.key}
                  lazy="loading"
                  src={`https://www.youtube.com/embed/${item.key}?enablejsapi=1&mute=1`}
                  className="video"
                  frameBorder="0"
                ></iframe>
              </div>
              <div className="forTextVideo">
                <h6 style={{ fontSize: "14px" }}>
                  {item.name}
                  {item.official && "✅"}
                </h6>
                <small style={{ fontSize: "12px" }}>
                  ⏱️{" "}
                  {new Date(item.published_at).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                  })}
                  {/* {new Date(item.published_at).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})} */}
                </small>
              </div>
            </div>
          ) : (
            ""
          );
        })}
        </>:<h2 align="center">Please select the types from the dropdown</h2>}
      </div>
        </>
        :<Novideos/>}
      
    </div>
    </>
  );
};

export default MovieVideos;
