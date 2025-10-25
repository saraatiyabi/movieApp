import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import MovieCard from "../../components/MovieCard/MovieCard";
import "./Series.css";
import Footer from "../../components/Footer/Footer";
import Spinner from "../../components/Spinner/Spinner";

export default function Series() {
  const [items, setItems] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchedKeyword, setSearchedKeyword] = useState("");

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.REACT_API_KEY}`,
      },
    };

    fetch(
      `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${pageNum}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response.results) {
          setItems((prevState) => [...prevState, ...response?.results]);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      })
      .catch((err) => console.error(err));
  }, [pageNum]);

  const searchForKeyword = () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.REACT_API_KEY}`,
      },
    };

    fetch(
      `https://api.themoviedb.org/3/search/tv?query=${searchedKeyword}&include_adult=false&language=en-US&page=${pageNum}`,
      options
    )
      .then((response) => response.json())
      .then((response) =>
        setItems(response?.results?.filter((item) => item.poster_path))
      )
      .catch((err) => console.error(err));
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="movies">
          <Header title="TV Series" />
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
                  {items?.map((item) => (
                    <MovieCard {...item} />
                  ))}
                </div>
              </div>
              {/* <div className='load-more-btn'>
                                    <button className='btn btn-outline-light' onClick={() => setPageNum(prevNum => prevNum + 1)}>Load More</button>
                                </div> */}
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}
