import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./MovieInfo.css";
import CastList from "../../components/CastList/CastList";
import MovieCard from "../../components/MovieCard/MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import MoviesTopSection from "../../components/MoviesTopSection/TopSection";
import Footer from "../../components/Footer/Footer";

export default function MovieInfo() {
  const { mediaId, mediaType } = useParams(); // Fixed: both from useParams

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [movieBackdrop, setMovieBackdrop] = useState("");
  const [moviePoster, setMoviePoster] = useState("");
  const [movieTitle, setMovieTitle] = useState("");
  const [genres, setGenres] = useState([]);
  const [overview, setOverview] = useState("");
  const [trailerKey, setTrailerKey] = useState("");
  const [similar, setSimilar] = useState([]);

  const API_KEY = process.env.REACT_API_KEY;

  // Helper: get title
  const getTitle = (data) => data.title || data.name || "Untitled";

  // Fetch movie/TV details
  useEffect(() => {
    console.log(mediaId, mediaType, process.env.REACT_API_KEY);
    if (!mediaId || !mediaType || process.env.REACT_API_KEY) {
      setError("Invalid URL? Missing ID, type, or API key.");
      setIsLoading(false);
      return;
    }

    const endpoint =
      mediaType === "movie"
        ? `https://api.themoviedb.org/3/movie/${mediaId}`
        : `https://api.themoviedb.org/3/tv/${mediaId}`;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.REACT_API_KEY}`,
      },
    };

    fetch(`${endpoint}?language=en-US`, options)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch movie details");
        return res.json();
      })
      .then((data) => {
        setMovieBackdrop(
          data.backdrop_path
            ? `https://image.tmdb.org/t/p/original${data.backdrop_path}`
            : "/images/no-backdrop.jpg"
        );
        setMoviePoster(
          data.poster_path
            ? `https://image.tmdb.org/t/p/w300${data.poster_path}`
            : "/images/no-poster.jpg"
        );
        setMovieTitle(getTitle(data));
        setGenres(data.genres || []);
        setOverview(data.overview || "No overview available.");
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load movie details.");
      })
      .finally(() => setIsLoading(false));
  }, [mediaId, mediaType, API_KEY]);

  // Fetch trailer
  useEffect(() => {
    if (!mediaId || !mediaType || !API_KEY) return;

    const endpoint =
      mediaType === "movie"
        ? `https://api.themoviedb.org/3/movie/${mediaId}/videos`
        : `https://api.themoviedb.org/3/tv/${mediaId}/videos`;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.REACT_API_KEY}`,
      },
    };

    fetch(`${endpoint}?language=en-US`, options)
      .then((res) => res.json())
      .then((data) => {
        const videos = data.results || [];
        const official = videos.find((v) =>
          v.name?.includes("Official Trailer")
        );
        const fallback = videos.find((v) => v.type === "Trailer") || videos[0];
        setTrailerKey(official?.key || fallback?.key || "");
      })
      .catch((err) => console.error("Trailer fetch error:", err));
  }, [mediaId, mediaType, API_KEY]);

  // Fetch similar movies
  useEffect(() => {
    if (mediaType !== "movie" || !mediaId || !API_KEY) return;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.REACT_API_KEY}`,
      },
    };

    fetch(
      `https://api.themoviedb.org/3/movie/${mediaId}/similar?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((data) => {
        const filtered = (data.results || []).filter((m) => m.poster_path);
        setSimilar(filtered.slice(0, 10)); // limit
      })
      .catch((err) => console.error("Similar movies error:", err));
  }, [mediaId, mediaType, API_KEY]);

  // Loading state
  if (isLoading) {
    return (
      <div className="container text-center py-5">
        <div>Loading movie details...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container text-center py-5 text-danger">
        <h3>Error</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="main-container">
      {/* Hero Section */}
      <div
        className="movie-info"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${movieBackdrop})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="movie-container">
            <div className="movie-info__left">
              <img
                className="movie-info-img"
                src={moviePoster}
                alt={movieTitle}
                onError={(e) => (e.target.src = "/images/no-poster.jpg")}
              />
            </div>
            <div className="movie-info__right">
              <div className="movie-info-title">
                <h1>{movieTitle}</h1>
              </div>
              <div className="movie-info-genres">
                {genres.length > 0 ? (
                  genres.map((genre) => (
                    <span key={genre.id} className="genre">
                      {genre.name}
                    </span>
                  ))
                ) : (
                  <span className="text-muted">No genres</span>
                )}
              </div>
              <div className="movie-info-desc">{overview}</div>
              <div className="movie-info-casts">
                <span>Cast</span>
                <CastList movieId={mediaId} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Section */}
      <div style={{ backgroundColor: "#111", padding: "40px 0" }}>
        <div className="container">
          <div className="movie-trailer">
            <span className="video-title">Official Trailer</span>
            {trailerKey ? (
              <iframe
                title="Official Trailer"
                width="100%"
                height="600"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            ) : (
              <p className="text-muted text-center py-5">
                No trailer available.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Similar Movies */}
      {similar.length > 0 && (
        <div className="similar-movies container py-5">
          <MoviesTopSection title="Similar Movies" />
          <Swiper slidesPerView={5} spaceBetween={15} className="mySwiper">
            {similar.map((movie) => (
              <SwiperSlide key={movie.id}>
                <MovieCard {...movie} mediaType="movie" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      <Footer />
    </div>
  );
}
