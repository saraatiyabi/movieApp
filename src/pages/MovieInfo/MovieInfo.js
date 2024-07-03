import React, { useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import './MovieInfo.css'
import CastList from '../../components/CastList/CastList'
import MovieCard from '../../components/MovieCard/MovieCard'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import MoviesTopSection from '../../components/MoviesTopSection/TopSection'
import Footer from '../../components/Footer/Footer'

export default function MovieInfo() {
  const { mediaId } = useParams()
  const { mediaType } = useParams()

  const [isLoading, setIsLoading] = useState(true)
  const [movieBackdrop, setMovieBackdrop] = useState('')
  const [moviePoster, setMoviePoster] = useState('')
  const [movieTitle, setMovieTitle] = useState('')
  const [genres, setGenres] = useState([])
  const [overview, setOverview] = useState('')
  const [trailerKey, setTrailerKey] = useState('')
  const [similar, setSimilar] = useState([])

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NWViNTg4MjJjMGVhOWM1ZGM4NDY4OWUzODI3MDY1NiIsInN1YiI6IjY1NGNhMTFhMjkzODM1MDBmZTBlZDk0NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.718YCgxBiTKLTQvuVR4Po-9OpwC9uteSGM7NuS1-Djw'
      }
    };
    if (mediaType === "movie") {
      fetch(`https://api.themoviedb.org/3/movie/${mediaId}?language=en-US`, options)
        .then(response => response.json())
        .then(response => {
          setMovieBackdrop(`https://image.tmdb.org/t/p/original/${response.backdrop_path}`)
          setMoviePoster(`https://image.tmdb.org/t/p/w300/${response.poster_path}`)
          setMovieTitle(response.title)
          setGenres(response.genres)
          setOverview(response.overview)
        })
        .catch(err => console.error(err));
    } else {
      fetch(`https://api.themoviedb.org/3/tv/${mediaId}?language=en-US`, options)
        .then(response => response.json())
        .then(response => {
          setMovieBackdrop(`https://image.tmdb.org/t/p/original/${response.backdrop_path}`)
          setMoviePoster(`https://image.tmdb.org/t/p/w300/${response.poster_path}`)
          setMovieTitle(response.title ? response.title : response.name)
          setGenres(response.genres)
          setOverview(response.overview)
        })
        .catch(err => console.error(err));
    }
  }, [])

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NWViNTg4MjJjMGVhOWM1ZGM4NDY4OWUzODI3MDY1NiIsInN1YiI6IjY1NGNhMTFhMjkzODM1MDBmZTBlZDk0NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.718YCgxBiTKLTQvuVR4Po-9OpwC9uteSGM7NuS1-Djw'
      }
    };
    if (mediaType === "movie") {
      fetch(`https://api.themoviedb.org/3/movie/${mediaId}/videos?language=en-US`, options)
        .then(response => response.json())
        .then(response => {
          const videos = response.results;
          let trailer = videos.filter(videoObj => videoObj.name === "Official Trailer")
          setTrailerKey(trailer[0].key)
        })
        .catch(err => console.error(err));
    } else {
      fetch(`https://api.themoviedb.org/3/tv/${mediaId}/videos?language=en-US`, options)
        .then(response => response.json())
        .then(response => {
          console.log(response)
          const videos = response.results;
          let trailer = videos.filter(videoObj => videoObj.name === "Official Trailer")
          setTrailerKey(trailer.length > 0 ? trailer[0].key : videos[0].key)
        })
        .catch(err => console.error(err));
    }
  }, [])

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NWViNTg4MjJjMGVhOWM1ZGM4NDY4OWUzODI3MDY1NiIsInN1YiI6IjY1NGNhMTFhMjkzODM1MDBmZTBlZDk0NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.718YCgxBiTKLTQvuVR4Po-9OpwC9uteSGM7NuS1-Djw'
      }
    };

    fetch(`https://api.themoviedb.org/3/movie/${mediaId}/similar?language=en-US&page=1`, options)
      .then(response => response.json())
      .then(response => setSimilar(response.results.filter(media => media.poster_path)))
      .catch(err => console.error(err));
  }, [])

  return (
    <div className='main-container'>
      <div className='movie-info' style={{ backgroundImage: `url(${movieBackdrop})` }}>
        <div className='container'>
          <div className='movie-container'>
            <div className='movie-info__left'>
              <img className='movie-info-img' src={moviePoster} alt='' />
            </div>
            <div className='movie-info__right'>
              <div className='movie-info-title'>
                <h1>{movieTitle}</h1>
              </div>
              <div className='movie-info-genres'>
                {
                  genres.length > 0 && genres.map(genre => (
                    <span className='genre'>{genre.name}</span>
                  ))
                }
              </div>
              <div className='movie-info-desc'>{overview}</div>
              <div className='movie-info-casts'>
                <span>Castlist</span>
                <CastList movieId={mediaId} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ width: "100%", backgroundColor: "black" }}>
        <div className='container'>
          <div className='movie-trailer'>
            <span className='video-title'>Offical Trailer</span>
            <iframe title="Official Trailer" width="100%" height="600px" src={`https://www.youtube.com/embed/${trailerKey}`}></iframe>
          </div>
        </div>
      </div>

      {
        similar.length > 0 && <div className='similar-movies container'>
          <MoviesTopSection title="Similar" />
          <Swiper
            slidesPerView={5}
            spaceBetween={15}
            className="mySwiper"
          >
            {
              similar.map(movie => (
                <SwiperSlide key={movie.id}>
                  <MovieCard {...movie} mediaType="movies" />
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>
      }
      <Footer />
    </div>
  )
}
