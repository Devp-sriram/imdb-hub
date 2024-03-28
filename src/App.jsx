import "./App.css";
import Navbar from "./components/Navbar";
import Movies from "./components/Movies";
import Watchlist from "./components/Watchlist";
import Banner from "./components/Banner";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  let [watchlist, setWatchlist] = useState([]);

  let handleAddtoWatchList = (movieObj) => {
    let newWatchList = [...watchlist, movieObj];
    localStorage.setItem('movies_App',JSON.stringify(newWatchList))
    
    setWatchlist(newWatchList);
    console.log(newWatchList);
  };

  let handleRemoveFromWatchlist = (movieObj) => {
    let filterWatchList = watchlist.filter((movie) => {
      return movie.id != movieObj.id;
    });

    localStorage.setItem('movies_App', JSON.stringify(filterWatchList))

    setWatchlist(filterWatchList);
    console.log(filterWatchList);

  };


  useEffect(()=>{
    let moviesFromLocalStrogae=localStorage.getItem( 'movies_App' )
    if(!moviesFromLocalStrogae){
      return
    }
    setWatchlist(JSON.parse(moviesFromLocalStrogae))
  },[])

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <Movies
                  watchlist={watchlist}
                  handleAddtoWatchList={handleAddtoWatchList}
                  handleRemoveFromWatchlist={handleRemoveFromWatchlist}
                />
              </>
            }
          />
          <Route path="/watchlist" element={<Watchlist watchlist={watchlist} setWatchlist={setWatchlist} handleRemoveFromWatchlist={handleRemoveFromWatchlist} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
