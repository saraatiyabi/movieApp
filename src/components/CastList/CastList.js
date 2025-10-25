import React, { useEffect, useState } from "react";
import "./CastList.css";

export default function CastList({ movieId }) {
  const [casts, setCasts] = useState([]);
  const [loading, setLoading] = useState(true); // optional: show loader

  useEffect(() => {
    if (!movieId) {
      setLoading(false);
      return;
    }

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`, // Fixed env var name
      },
    };

    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
      options
    )
      .then((res) => res.json())
      .then((data) => {
        const top5 = data.cast?.slice(0, 5) || [];
        setCasts(top5);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch cast:", err);
        setCasts([]);
        setLoading(false);
      });
  }, [movieId]);

  // Conditional rendering
  if (loading) {
    return <div className="text-muted mt-4">Loading cast...</div>;
  }

  if (!casts || casts.length === 0) {
    return (
      <div className="mt-4 text-center text-muted">
        No cast information available for this movie.
      </div>
    );
  }

  return (
    <div className="d-flex gap-3 mt-4 flex-wrap">
      {casts.map((cast) => (
        <div key={cast.id} className="cast text-center">
          <img
            className="cast-img rounded"
            src={
              cast.profile_path
                ? `https://image.tmdb.org/t/p/w200${cast.profile_path}`
                : "/images/no-cast-photo.png" // fallback image
            }
            alt={cast.name}
            onError={(e) => {
              e.target.src = "/images/no-cast-photo.png"; // fallback on error
            }}
          />
          <span className="cast-name d-block mt-1">{cast.name}</span>
          {cast.character && (
            <small className="text-muted d-block">{cast.character}</small>
          )}
        </div>
      ))}
    </div>
  );
}
