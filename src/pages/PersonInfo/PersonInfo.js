import React, { useEffect, useState } from "react";
import "./PersonInfo.css";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Spinner from "../../components/Spinner/Spinner";

export default function PersonInfo() {
  const [personDetails, setPersonDetails] = useState([]);
  const [personNames, setPersonNames] = useState([]);
  const [personCredits, setPersonCredits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { personId } = useParams();

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`,
      },
    };

    fetch(
      `https://api.themoviedb.org/3/person/${personId}?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setPersonDetails(response);
        setPersonNames(response.also_known_as);
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
      `https://api.themoviedb.org/3/person/${personId}/movie_credits?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        const casts = response.cast;
        const latestCasts = casts
          .filter(
            (cast) =>
              Number(cast.release_date.slice(0, 4)) > 2015 &&
              cast.vote_average >= 5
          )
          .slice(0, 5);
        setPersonCredits(latestCasts);
      })
      .catch((err) => console.error(err));

    fetch(
      `https://api.themoviedb.org/3/person/${personId}/tv_credits?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        const casts = response.cast;
        const latestCasts = casts
          .filter(
            (cast) =>
              Number(cast.first_air_date.slice(0, 4)) > 2015 &&
              cast.vote_average >= 5
          )
          .slice(0, 5);
        setPersonCredits((prevCredits) => [...prevCredits, ...latestCasts]);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="person-info">
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="person-content">
          <div className="row">
            <div className="col-3">
              <img
                className="person-img"
                src={`https://image.tmdb.org/t/p/w300/${personDetails.profile_path}`}
              />
              <span className="personal-info-title">Personal Info</span>
              <ul className="personal-info">
                <li>
                  <span>Known For:</span>
                  <span>{personDetails.known_for_department}</span>
                </li>
                <li>
                  <span>Birthday:</span>
                  <span>{personDetails.birthday}</span>
                </li>
                <li>
                  <span>Gender:</span>
                  <span>{personDetails.gender === 1 ? "Female" : "Male"}</span>
                </li>
                <li>
                  <span>Place of Birth:</span>
                  <span>{personDetails.place_of_birth}</span>
                </li>
                <li className="person-known-as">
                  <span>Also Known As:</span>
                  {personNames.map((name) => (
                    <span>{name}</span>
                  ))}
                </li>
              </ul>
            </div>
            <div className="col-9">
              <div className="person-details-top">
                <h3>{personDetails.name}</h3>
                <h5>Biography</h5>
                <p className="person-biography">{personDetails.biography}</p>
              </div>
              <div className="person-credits-section">
                <span>Known For</span>
                <div className="credits">
                  <Swiper
                    slidesPerView={6}
                    spaceBetween={5}
                    className="mySwiper"
                  >
                    {personCredits.reverse().map((credit) => (
                      <SwiperSlide>
                        <div className="credit">
                          <img
                            src={`https://image.tmdb.org/t/p/w200/${credit.poster_path}`}
                          />
                          <span>
                            {credit.title ? credit.title : credit.name}
                          </span>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
