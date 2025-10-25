import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import MovieCard from "../../components/MovieCard/MovieCard";
import "./Movies.css";
import Footer from "../../components/Footer/Footer";
import Spinner from "../../components/Spinner/Spinner";

export default function Movies() {
  const [items, setItems] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchedKeyword, setSearchedKeyword] = useState("");

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.PRIVATE_KEY}`,
      },
    };

    fetch(
      `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${pageNum}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setItems((prevState) => [...prevState, ...response.results]);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, [pageNum]);

  const searchForKeyword = () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.PRIVATE_KEY}`,
      },
    };

    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchedKeyword}&include_adult=false&language=en-US&page=${pageNum}`,
      options
    )
      .then((response) => response.json())
      .then((response) =>
        setItems(response.results.filter((item) => item.poster_path))
      )
      .catch((err) => console.error(err));
  };
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Header title="Movies" />
          <div className="page-content">
            <div className="container">
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Enter keyword..."
                  value={searchedKeyword}
                  onChange={(e) => setSearchedKeyword(e.target.value)}
                />
                <button type="submit" onClick={() => searchForKeyword()}>
                  Search
                </button>
              </div>
              <div className="media-container">
                <div className="row">
                  {items.map((item) => (
                    <MovieCard {...item} media_type="movie" />
                  ))}
                </div>
              </div>
              {/* <div className="load-more-btn">
                <button
                  className="btn btn-outline-light"
                  onClick={() => setPageNum((prevNum) => prevNum + 1)}
                >
                  Load More
                </button>
              </div> */}
            </div>
            <Footer />
          </div>
        </>
      )}
    </>
  );
}
