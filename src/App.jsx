

import Home,{apiGlobalData} from './tmdb/Home'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Nav from './tmdb/Nav'
import {Routes, Route } from 'react-router-dom';

import MovieDetails from './tmdb/MovieDetails'
import PopularPersons from './tmdb/PopularPersons';
import UserProvider from './tmdb/UserProvider';
import PersonSearchData from './tmdb/usecontext/PersonSearchData';
import IndvidualPersonDetails from './tmdb/IndvidualPersonDetails';
import IndPersonData from './tmdb/usecontext/IndPersonData';
import MovieVideos from './tmdb/MovieVideos';
import NotFound from './tmdb/NotFound';
// import {apiGlobalData} from '/tmdb/Home'
// console.log('from home.jsx',apiGlobalData[0].results);

function App() {
  


  return (
    <div>
      <UserProvider>
        <PersonSearchData>
          <IndPersonData>
      <Nav/>
      
      {/* <Home/> */}
      
     
        <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/movie/:id/:title" element={<MovieDetails />} />
            {/* You would map over your movies data and render ImageCard components here */}
          
            <Route path="/persons/:id" element={<PopularPersons />}/>
            <Route path="/person/:id/:name" element={<IndvidualPersonDetails/>}/>
            <Route path="/movie/:id/" element={<MovieVideos/>}/>
          <Route path="*" element={<NotFound/>}/>
          </Routes>

          </IndPersonData>
          </PersonSearchData>
          </UserProvider>
    </div>
  )
}

export default App
