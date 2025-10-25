import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import PersonCard from "../../components/PersonCard/PersonCard";
import "./People.css";
import TopSection from "../../components/MoviesTopSection/TopSection";
import Footer from "../../components/Footer/Footer";
import Pagination from "../../components/Pagination/Pagination";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";

export default function People() {
  const [people, setPeople] = useState([]);
  const { page } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`,
      },
    };

    fetch(
      `https://api.themoviedb.org/3/person/popular?language=en-US&page=${page}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.results) {
          console.log(response);
          setPeople(response.results);
          setIsLoading(false);
        }
      })
      .catch((err) => console.error(err));

    setIsLoading(true);
  }, [page]);

  return (
    <div className="people-container">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Header title="People" />
          <div className="people-page-content">
            <div className="container">
              <TopSection title="Popular People" />
              <div className="row mt-2">
                {people?.map((person) => (
                  <PersonCard {...person} />
                ))}
              </div>
              <Pagination currentPage={page} />
            </div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
}
