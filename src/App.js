import './App.css';
import Main from './Components/Main';
import Navbar from './Components/Navbar';
import {Routes, Route, useLocation} from "react-router-dom";
import Search from './Components/Search';
import LoadingBar from 'react-top-loading-bar'
import { useState } from 'react';
import MovieDetails from './Components/MovieDetails';
import ScrollToTop from './Components/ScrollToTop';

function App() {

  const [progress, setProgress] = useState(0);
  const location = useLocation();
  
  return (
    <>
    <ScrollToTop/>
    <Navbar/>
    <LoadingBar
					color='red'
					progress={progress}
				  onLoaderFinished={() => setProgress(0)} 
		/>
    <Routes>
    <Route exact path='*' element={<Main setProgress={setProgress} key={location.pathname} category={"now_playing"}  genre={"Now Playing"}/>}/>
    <Route exact path='/popular' element={<Main setProgress={setProgress} key={location.pathname} category={"popular"}  genre={"Popular"}/>}/>
    <Route exact path='/toprated' element={<Main setProgress={setProgress} key={location.pathname} category={"top_rated"}  genre={"Top Rated"}/>}/>
    <Route exact path='/upcoming' element={<Main setProgress={setProgress} key={location.pathname} category={"upcoming"}  genre={"Upcoming"}/>}/>
    <Route path='/movie/:movieId' element={<MovieDetails key={location.pathname} setProgress={setProgress} />}/>
    <Route path='/search/:searchKey' element={<Search key={location.pathname} setProgress={setProgress}/>}/>
    </Routes>
    </>
  );
}

export default App;
