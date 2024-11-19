import React, { useEffect, useReducer, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Actors from "./Actors";
import userimagenotfound from '../assets/user.png'
import { fetchVideos } from "../redux/videoSlice";
import { useDispatch, useSelector } from "react-redux";

export const poster_parent_url = `https://image.tmdb.org/t/p/w500`;
const MovieDetails = () => {
  const initialState = {
    load: true,
    data: null,
    error: null,
  };

  const movieDetailsReducer = (state, action) => {
    switch (action.type) {
      case "load":
        return { ...state, load: true, error: null };
      case "data":
        return { ...state, load: false, data: action.payload, error: null };
      case "error":
        return { ...state, load: false, errror: action.payload };
      default:
        return state;
    }
  };
  const [MovieDetailsData, dispatch] = useReducer(
    movieDetailsReducer,
    initialState
  );
  const { id } = useParams(); // Get the dynamic id from the URL
  // console.log('id',id);
  const convertId = Number(id);
  // console.log(typeof convertId);
  const dis = useDispatch();

  const { videos, status, error } = useSelector((state) => state.videos);

  // console.log('videos',videos);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5N2NkMWY2ZDIwMjRkZjQ1NzM2MDJlYTQ3Nzg2OTg0NCIsIm5iZiI6MTcyNzk1MzAxMC43NDY3NDQsInN1YiI6IjYzY2EzYzAwYmIwNzBkMDA4NGU0NDQ0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uzIz5CRuollNf3uW62pJqEU6G1Ot9kBVXpFSvdqqZ_M",
    },
  };
  const getMovieDetailsData = async () => {
    try {
      dispatch({ type: "load" });
      const movieDetailsAPI = `https://api.themoviedb.org/3/movie/${convertId}?language=en-US`;

      const fetchMovieDetails = await fetch(movieDetailsAPI, options);

      const convertDataToJson = await fetchMovieDetails.json();
      // console.log(convertDataToJson);

      dispatch({ type: "data", payload: convertDataToJson });
    } catch (error) {
      dispatch({ type: "error", payload: "error fetching data" });
    }
  };

  useEffect(() => {
    // let isMounted=true;
    // if(isMounted){
    getMovieDetailsData();
    // }
    // return ()=>{
    //   isMounted=false
    // };

    if (status === "idle") {
      dis(fetchVideos());
    }
  }, [status, dis]);

  if (status === "loading") {
    return <div>Loading.......</div>;
  }

  if (status === "failed") {
    return <div>Error:{error}</div>;
  }
  const backgroundImage = MovieDetailsData.data?.backdrop_path
    ? `${poster_parent_url}${MovieDetailsData.data.backdrop_path}`
    : MovieDetailsData.data?.poster_path
    ? `${poster_parent_url}${MovieDetailsData.data.poster_path}`
    : null;

  const backgroundposter = MovieDetailsData.data?.poster_path
    ? `${poster_parent_url}${MovieDetailsData.data.poster_path}`
    : MovieDetailsData.data?.backdrop_path_path
    ? `${poster_parent_url}${MovieDetailsData.data.backdrop_path}`
    : null;
  return (
    <div
      className="imageContainerMovieDetails"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",

        overflow: "hidden",
        backgroundSize: "cover",
        height: "632px",
        width: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 1,
      }}
    >
      <div
        style={{
          // position: 'absolute',
          // top: 0,
          // left: 0,
          width: "100%",
          height: "632px",
          backgroundColor: "rgba(0, 0, 0, 0.7)", // Black overlay with 50% opacity
          // zIndex: 2,
        }}
      >
        {MovieDetailsData.load ? (
          <p style={{ color: "white" }}>Loading.......</p>
        ) : MovieDetailsData.error ? (
          <p>getting error</p>
        ) : (
          <div className="displayMovieDetails">
            <div className="imagePoster">
              <img src={
                MovieDetailsData.data.backdrop_path?
                `${poster_parent_url}${backgroundposter}`:userimagenotfound} alt="" />
            </div>
            <div className="secondDivDetails">
              <h1
                style={{ color: "white", paddingTop: "80px", paddingLeft: 85 }}
              >
                {MovieDetailsData.data.title}(
                {MovieDetailsData.data.release_date})
                <br />
                <small style={{ color: "white", fontSize: "12px" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-clock"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
                  </svg>{" "}
                  {MovieDetailsData.data.runtime} min{" "}
                </small>
                &nbsp;
                
                <small
                  style={{ color: "white", fontSize: "12px" }}
                  data-bs-toggle="modal"
                  data-bs-target="#videoModal"
                >
                  <Link to={`/movie/${convertId}`}>Videos</Link>
                </small>
                {/* modal */}
              </h1>

              <div
                style={{
                  width: "99%",
                  maxWidth: "900px",
                  paddingLeft: "85px",
                  color: "white",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span>Overview</span>
                {MovieDetailsData.data.overview}
              </div>

              <div>
                <Actors actordetails={convertId} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
