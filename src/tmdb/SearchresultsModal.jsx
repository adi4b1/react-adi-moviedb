import React, {
  useEffect,
  useState,
  useRef,
  useContext,
  useReducer,
} from "react";
import { userContextPersonDeails } from "./UserProvider";
import { Link } from "react-router-dom";
import notfoundimage from "../assets/user.png";
import { poster_parent_url } from "./MovieDetails";
import { createpersonsearchdata } from "./usecontext/PersonSearchData";
import NotFound from "./NotFound";

const movieresultsReducer = (state, action) => {
  switch (action.type) {
    case "load":
      return { ...state, load: true, error: null };
    case "data":
      return { ...state, load: false, data: action.payload, error: null };
    case "error":
      return { ...state, load: false, data: action.payload };
    default:
      return state;
  }
};

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5N2NkMWY2ZDIwMjRkZjQ1NzM2MDJlYTQ3Nzg2OTg0NCIsIm5iZiI6MTcyNzk1MzAxMC43NDY3NDQsInN1YiI6IjYzY2EzYzAwYmIwNzBkMDA4NGU0NDQ0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uzIz5CRuollNf3uW62pJqEU6G1Ot9kBVXpFSvdqqZ_M",
  },
};
const SearchresultsModal = ({ close }) => {
  const { getPersonSearchData, searchname, setsearchname } = useContext(
    createpersonsearchdata
  );
  const [active, setActive] = useState("Movies");
  const [forresults, setforresults] = useState(null);

  const initialState = {
    load: true,
    data: null,
    error: null,
  };
  const [getmovieResults, dispatch] = useReducer(
    movieresultsReducer,
    initialState
  );

  const getmovieAPI = async () => {
    try {
      dispatch({ type: "load" });
      const movieAPI = `https://api.themoviedb.org/3/search/movie?query=${searchname}&include_adult=false&language=en-US&page=1`;
      const fetchMovies = await fetch(movieAPI, options);
      const cd = await fetchMovies.json();
      dispatch({ type: "data", payload: cd.results });
    } catch (error) {
      dispatch({ type: "error", payload: "errror fetch data" });
    }
  };

  const inp = useRef(null);

  //   const { pageId, setpageId } = useContext(userContextPersonDeails);
  // const[showdarkMode,setshowdarkMode]=useState(false)

  useEffect(() => {
    inp.current.focus();
    getmovieAPI();
  }, [searchname]);
  ///for searching data results from (useContext hook)

  const personnameHandler = (e) => {
    // setpersonname(e.target.value)
    let personName = e.target.value;
    console.log("mr", getmovieResults);

    setsearchname(personName);
    setforresults(true);
    // if(personName.length>1){
    //   setforresults(!forresults)
    // }else{
    //   setforresults(null)
    // }
  };

  const clickHandler = (e) => {
    setActive(e.target.textContent);
  };

  useEffect(() => {
    const modalElement = document.querySelector(".modal");
    if (modalElement) {
      modalElement.style.display = "block"; // Bootstrap's display property
      modalElement.classList.add("show"); // Bootstrap's show class
    }
    return () => {
      if (modalElement) {
        modalElement.style.display = "none";
        modalElement.classList.remove("show");
      }
    };
  }, []);
  return (
    <>
      <div
        className="modal fade show"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"

        // aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              {/* <h1 className="modal-title fs-5" >
                Modal title
              </h1> */}
              <input
                type="search"
                ref={inp}
                value={searchname}
                placeholder="search something"
                onChange={personnameHandler}
              />
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={close}
              ></button>
            </div>
            <div className="modal-body">
              <div className="resultslabelSearch">
                <h6
                  onClick={(e) => clickHandler(e)}
                  className={`${active === "Movies" ? "searchlabel" : ""}`}
                >
                  Movies
                </h6>

                <h6
                  onClick={(e) => clickHandler(e)}
                  className={`${active === "People" ? "searchlabel" : ""}`}
                >
                  People
                </h6>
              </div>
              <div className="resultsSearch">
                {active === "Movies" && forresults && (
                  <>
                    {getmovieResults.error && <p>error fetch the data</p>}
                    {getmovieResults.load && (
                      <div className="personsearchspin d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    )}

                    {!getmovieResults.load && getmovieResults.data && (
                      <div className="forMovieResults">
                        {getmovieResults.data ? (
                          getmovieResults.data.map((item, index) => {
                            return (
                              <>
                                <Link
                                  key={index}
                                  to={`/movie/${item.id}/${item.name}`}
                                  className="navlinks"
                                >
                                  <div
                                    key={item.name}
                                    className="forsearchpeoplebody"
                                  >
                                    <img
                                      src={
                                        item.backdrop_path
                                          ? `${poster_parent_url}${item.backdrop_path}`
                                          : `${notfoundimage}`
                                      }
                                      className="searchMovieImage"
                                      alt="pic"
                                    />
                                    <p className="peopleName">
                                      {item.original_title.slice(0, 20)}
                                    </p>
                                  </div>
                                </Link>
                              </>
                            );
                          })
                        ) : (
                          <NotFound />
                        )}
                      </div>
                    )}
                  </>
                )}

                {/* for people searchessssssssssssssssssss */}
                {active === "People" && forresults && (
                  <div className="forResults">
                    {getPersonSearchData.error && <p>error fetch the data</p>}
                    {getPersonSearchData.load && (
                      <div className="personsearchspin d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    )}

                    {!getPersonSearchData.load && getPersonSearchData.data && (
                      <div>
                        {getPersonSearchData.data
                          ? getPersonSearchData.data.map((item, index) => {
                              return (
                                <>
                                  <Link
                                    key={index}
                                    to={`/person/${item.id}/${item.name}`}
                                    className="navlinks"
                                  >
                                    <div
                                      key={item.name}
                                      className="forsearchpeoplebody"
                                    >
                                      <img
                                        src={
                                          item.profile_path
                                            ? `${poster_parent_url}${item.profile_path}`
                                            : `${notfoundimage}`
                                        }
                                        className="searchPersonImage"
                                        alt=""
                                      />
                                      <p className="peopleName">
                                        {item.name.slice(0, 20)}
                                      </p>
                                    </div>
                                  </Link>
                                </>
                              );
                            })
                          : "not found"}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            {/* <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
              
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchresultsModal;
