import React from "react";
import "./MovieCard.css";
import { Link } from "react-router-dom";

export default function MovieCard(props) {
  const { media_type } = props;

  return (
    <div className="movie-card" style={{ width: "100%" }}>
      <img
        src={`https://image.tmdb.org/t/p/w200/${props.poster_path}`}
        alt=""
      />
      <div className="movie-card-detail">
        <span className="movie-card-name">
          {props.title ? props.title : props.name}
        </span>
      </div>
      {/* <Link to={`/info/${media_type}/${props.id}`}>
                <img src={`https://image.tmdb.org/t/p/w200/${props.poster_path}`} alt='' />
                <div className='movie-card-detail'>
                    <span className='movie-card-name'>{props.title ? props.title : props.name}</span>
                </div>
            </Link> */}
    </div>
  );
}
