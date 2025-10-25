import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./TrendingMovies.css";
import "swiper/css";

import MovieCard from "../MovieCard/MovieCard";
import TopSection from "../MoviesTopSection/TopSection";

export default function TrendingMovies() {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.REACT_API_KEY}`,
      },
    };

    fetch(
      "https://api.themoviedb.org/3/trending/all/day?language=en-US",
      options
    )
      .then((response) => response.json())
      .then((response) => setTrendingMovies(response.results.slice(0, 10)))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="movies-content">
      <TopSection title="Trending Movies" media_type="movies" />
      <Swiper slidesPerView={5} spaceBetween={15} className="mySwiper">
        {trendingMovies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <MovieCard {...movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
