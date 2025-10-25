import React, { useEffect, useState } from "react";
import "./UpcomingMovies.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import MovieCard from "../MovieCard/MovieCard";
import TopSection from "../MoviesTopSection/TopSection";

export default function UpcomingMovies() {
  const [upcomingmovies, setUpcomingMovies] = useState([]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`,
      },
    };

    fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      options
    )
      .then((response) => response.json())
      .then((response) => setUpcomingMovies(response.results.slice(0, 10)))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="movies-content">
      <TopSection title="Upcoming" media_type="movies" />
      <Swiper slidesPerView={5} spaceBetween={15} className="mySwiper">
        {upcomingmovies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <MovieCard {...movie} media_type="movie" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
