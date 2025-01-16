import React, { useState } from "react";
// import genreIds from "./utility/genre";

function Watchlist({ watchlist, setWatchlist, handleRemoveFromWatchlist }) {
  const [search, setSearch] = useState("");
  // const [genreList, setGenreList] = useState(["All Geners"]);
  const [currentGenre, setCurrentGenre] = useState("All Geners");

  let handleSearch = (e) => {
    setSearch(e.target.value);
  };


  let sortIncreseing = () => {
    let sortedIncresing = watchlist.sort((movieA, movieB) => {
      return new Date(movieA.source_release_date) -new Date( movieB.source_release_date);
    });

    setWatchlist([...sortedIncresing]);
  };

  let sortDecreseing = () => {
    let sortedDecresing = watchlist.sort((movieA, movieB) => {
      return new Date(movieB.source_release_date) - new Date(movieA.source_release_date);
    });

    setWatchlist([...sortedDecresing]);
  };


  // useEffect(() => {
  //   let temp = watchlist.map((movieObj) => {
  //     return genreIds[movieObj.type];
  //   });
  //   temp= new Set(temp) //remove the duplicate

  //   setGenreList(["All Geners", ...temp]);
  //   console.log(temp);
  // }, [watchlist]);

  return (
    <>
      {/* <div className="flex justify-center flex-wrap m-4">
        {genreList.map((genre) => {
          return <div
            onClick={() => handleFilter(genre)}
              className={
                currentGenre == genre ?
                  "bg-blue-400 w-[8rem] h-[3rem] mx-4 flex items-center justify-center rounded-xl text-white font-bold hover-cursor"
                 :"bg-gray-400 w-[8rem] h-[3rem] mx-4 flex items-center justify-center rounded-xl text-white font-bold hover-cursor"                
                }>
                  {genre}
            </div>
          ;
        })}
      </div> */}

      <div className="flex justify-center ">
        <input
          onChange={handleSearch}
          value={search}
          className=" m-5 px-5 h-[3rem] w-[24rem] bg-gray-200 outline-none rounded-xl"
          placeholder="Search movie"
          type="text"
        />
      </div>

      <div className="flex lg:block overflow-hidden rounded-lg border border-gray-200 m-8 ">
        <table className="w-full text-gray-500 text-center">
          <thead className="hidden lg:flex w-full h-20 justify-evenly border-b-2 ">
            <tr>
              <th>Name</th>

              <th>
                <i
                  onClick={sortIncreseing}
                  className="fa-solid fa-arrow-up m-4"
                ></i>{" "}
                Release Date{" "}
                <i
                  onClick={sortDecreseing}
                  className="fa-solid fa-arrow-down m-4"
                ></i>
              </th>
              <th>
                Platform{" "}
              </th>
              <th>type</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {watchlist.filter((movieObj)=>{
              if(currentGenre=='All Geners'){
                return true
              }else{
                return genreIds[movieObj.type]==currentGenre
              }
            }).filter((movieObj) => {
                return movieObj.title
                  .toLowerCase()
                  .includes(search.toLocaleLowerCase());
              })
              .map((movieObj) => {
                return (
                  <tr className="p-5 border-b-2 justify-center items-center" key={movieObj.id}>

                    <td className= "items-center justify-start p-5">
                      <img
                        className=""
                        src={`${movieObj.poster_url}`}
                      />
                    </td>

                    <td>
                      <div className="mx-10"><a href={`https://www.imdb.com/title/${movieObj.imdb_id}`}>{movieObj.title}</a></div>
                      <p>{movieObj.source_release_date}</p>
                      <p>{movieObj.source_name}</p>
                      <p>{movieObj.type}</p>
                      <button onClick={()=>handleRemoveFromWatchlist(movieObj)} className="cursor-pointer text-red-800">Delete</button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Watchlist;
