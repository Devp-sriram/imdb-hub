import React from "react";
import Moviecard from "./Moviecard";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Pagination from "./Pagination";


function Movies({ handleAddtoWatchList, handleRemoveFromWatchlist, watchlist}) {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  const handlePrev = () => {
    if (pageNo === 1) {
      setPageNo(pageNo);
    } else {
      setPageNo(pageNo - 1)
    }
  };

  const handleNext = () => {
    setPageNo(pageNo + 1);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.watchmode.com/v1/releases/?apiKey=NCmmmV6njcyc6tI4mPQhS0AAt6Eei0Q5A7MXDBQl`
        // `https://api.themoviedb.org/3/movie/popular?api_key=c6a813b8ab2897f76c13c1487612d1ca&language=en-US&page=${pageNo}`
       )
      .then(function (res) {
        const itemsPerPage = 12;
        const startIndex = (pageNo - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setMovies(res.data.releases.slice(startIndex, endIndex))
      });
  }, [pageNo]);


  return (
    <div>
      <div className="text-center text-2xl font-bold ">Trending Movies</div>

      <div className="flex flex-row flex-wrap justify-around gap-10">
        {movies.map((movieObj) => {
          return (
            <Moviecard
              key={movieObj.id}
              movieObj={movieObj}
              poster_url={movieObj.poster_url}
              name={movieObj.title}
              handleAddtoWatchList={handleAddtoWatchList}
              handleRemoveFromWatchlist={handleRemoveFromWatchlist}
              watchlist={watchlist}
            />
          );
        })}
      </div>
      <Pagination
        handlePrev={handlePrev}
        handleNext={handleNext}
        pageNo={pageNo}
      />
    </div>
  );
}

export default Movies;
