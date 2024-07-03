import React, { useEffect, useState } from 'react'
import './TopRatedMovies.css'
import TopSection from '../MoviesTopSection/TopSection'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import MovieCard from '../MovieCard/MovieCard';

export default function TopRatedMovies() {
    const [topRatedMovies, setTopRatedMovies] = useState([])

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NWViNTg4MjJjMGVhOWM1ZGM4NDY4OWUzODI3MDY1NiIsInN1YiI6IjY1NGNhMTFhMjkzODM1MDBmZTBlZDk0NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.718YCgxBiTKLTQvuVR4Po-9OpwC9uteSGM7NuS1-Djw'
            }
        };

        fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
            .then(response => response.json())
            .then(response => setTopRatedMovies(response.results.slice(0,10)))
            .catch(err => console.error(err));
    }, [])

    return (
        <div className='movies-content'>
            <TopSection title='Top Rated Movies' media_type="movies" />
            <Swiper
                slidesPerView={5}
                spaceBetween={15}
                className="mySwiper"
            >
                {
                    topRatedMovies.map(movie => (
                        <SwiperSlide key={movie.id}>
                            <MovieCard {...movie} media_type="movie" />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}
