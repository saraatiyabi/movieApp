import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import HeaderSlide from "../../components/HeaderSlide/HeaderSlide";
import TrendingMovies from "../../components/TrendingMovies/TrendingMovies";
import TopRatedMovies from "../../components/TopRatedMovies/TopRatedMovies";
import TopRatedTV from "../../components/TopRatedTV/TopRatedTV";
import TrailerModal from "../../components/TrailerModal/TrailerModal";
import UpcomingMovies from "../../components/UpcomingMovies/UpcomingMovies";
import Footer from "../../components/Footer/Footer";
import Spinner from "../../components/Spinner/Spinner";

export default function Index() {
  const [movieItems, setMovieItems] = useState([]);
  const [showTrailerModal, setShowTrailerModal] = useState(false);
  const [mainTrailer, setMainTrailer] = useState("");
  const [movieId, setMovieId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isTrailerLoading, setIsTrailerLoading] = useState(true);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`,
      },
    };

    fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setMovieItems(response.results.slice(3, 15));
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`,
      },
    };

    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setMainTrailer(
          `https://www.youtube.com/embed/${response.results?.[0]?.key}`
        );
        setIsTrailerLoading(false);
      })
      .catch((err) => console.error(err));
  }, [movieId]);

  useEffect(() => {
    setIsTrailerLoading(true);
  }, [showTrailerModal]);

  return (
    <div style={{ backgroundColor: "black" }}>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="content">
          <Swiper
            modules={showTrailerModal ? [] : [Autoplay]}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            grabCursor={true}
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
          >
            {/* {showTrailerModal && (
              <TrailerModal
                trailer={mainTrailer}
                setShowTrailerModal={setShowTrailerModal}
                isTrailerLoading={isTrailerLoading}
              />
            )} */}
            {movieItems.map((item, i) => (
              <SwiperSlide key={i}>
                <HeaderSlide
                  {...item}
                  media_type="movie"
                  setShowTrailerModal={setShowTrailerModal}
                  onMovieId={(id) => setMovieId(id)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="container">
            {/* <TrendingMovies /> */}
            <TopRatedMovies />
            <TopRatedTV />
            <UpcomingMovies />
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
}
