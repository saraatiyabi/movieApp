import React, { useEffect, useState } from "react";
import "./TopRatedMovies.css";
import TopSection from "../MoviesTopSection/TopSection";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import MovieCard from "../MovieCard/MovieCard";

export default function TopRatedMovies() {
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.REACT_API_KEY}`,
      },
    };

    fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      options
    )
      .then((response) => response.json())
      .then((response) => setTopRatedMovies(response?.results?.slice(0, 10)))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="movies-content">
      <TopSection title="Top Rated Movies" media_type="movies" />
      <Swiper slidesPerView={5} spaceBetween={15} className="mySwiper">
        {topRatedMovies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <MovieCard {...movie} media_type="movie" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
