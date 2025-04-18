import React, { useContext, useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import notfoundimage from "../assets/user.png";
// import PopularPersons from './PopularPersons'
import { userContextPersonDeails } from "./UserProvider";
// import { createpersonsearchdata } from "./usecontext/PersonSearchData";
import { poster_parent_url } from "./MovieDetails";
import { changemode } from "../redux/darkmodeSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import SearchresultsModal from "./SearchresultsModal";

const Nav = () => {
  // const inp = useRef(null);

  const { pageId, setpageId } = useContext(userContextPersonDeails);
  // // const[showdarkMode,setshowdarkMode]=useState(false)

  // useEffect(() => {
  //   inp.current.focus();
  // }, []);
  // ///for searching data results from (useContext hook)
  // const { getPersonSearchData, searchname, setsearchname } = useContext(
  //   createpersonsearchdata
  // );

  

  ///searchmodal

  const [modal, setModal] = useState(false);

  const showModal = () => setModal(true);
  const closeModal = () => setModal(false);

  // const[forpersonname,setpersonname]=useState('')

  const dis = useDispatch();

  const getDarkData = useSelector((state) => state.darkmode.value);
  const darkModeHandler = () => {
    dis(changemode(!getDarkData));
    // setshowdarkMode(getDarkData)
    console.log(getDarkData);
  };
  // const displayDropdownHandler = () => {
  //   setforresults(!forresults);
  // };

  // const personnameHandler = (e) => {
  //   // setpersonname(e.target.value)
  //   let personName = e.target.value;
  //   // console.log(personName);

  //   setsearchname(personName);
  //   // if(personName.length>1){
  //   //   setforresults(!forresults)
  //   // }else{
  //   //   setforresults(null)
  //   // }
  // };

  // useEffect(()=>{

  //   // if(pageId===null||pageId===undefined){
  //   //   pageId=1
  //   // }
  //   // getApipersonData()

  // },[pageId])
  return (
    <>
      <div>
        <ul className="navbardim">
          <Link to="/" className="navlinks">
            🎥&nbsp;Adimoviedb
          </Link>
          <div className="forsecondblockNav">
            <Link to={`/persons/${pageId}`} className="navlinks navlinkbut">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                className="bi bi-people"
                viewBox="0 0 16 16"
              >
                <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
              </svg>
            </Link>

            <div className="darkModeButton" onClick={darkModeHandler}>
              {getDarkData ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  fill="currentColor"
                  className="bi bi-brightness-low"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8m.5-9.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m0 11a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m5-5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m-11 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m9.743-4.036a.5.5 0 1 1-.707-.707.5.5 0 0 1 .707.707m-7.779 7.779a.5.5 0 1 1-.707-.707.5.5 0 0 1 .707.707m7.072 0a.5.5 0 1 1 .707-.707.5.5 0 0 1-.707.707M3.757 4.464a.5.5 0 1 1 .707-.707.5.5 0 0 1-.707.707" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  fill="currentColor"
                  className="bi bi-brightness-low-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0M8.5 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m0 11a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m5-5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m-11 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m9.743-4.036a.5.5 0 1 1-.707-.707.5.5 0 0 1 .707.707m-7.779 7.779a.5.5 0 1 1-.707-.707.5.5 0 0 1 .707.707m7.072 0a.5.5 0 1 1 .707-.707.5.5 0 0 1-.707.707M3.757 4.464a.5.5 0 1 1 .707-.707.5.5 0 0 1-.707.707" />
                </svg>
              )}
            </div>
            {/* <button onClick={showModal}>searchModal</button> */}
            {/* {showdarkMode&&'hlo'} */}
            <div className="searchBarBody"  onClick={showModal}>
           
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
               
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
             
              {/* <div>
              <input
                type="search"
                // ref={inp}
                // value={searchname}
                className="inputBox"
                // onClick={showModal}
                // placeholder="search persons"
                // onChange={personnameHandler}
                // onInput={displayDropdownHandler}
                readOnly
              />
              </div> */}
              

              
            </div>
            {modal && <SearchresultsModal close={closeModal} />}
          </div>
        </ul>
      </div>
    </>
  );
};

export default Nav;
