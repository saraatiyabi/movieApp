import React, { useEffect, useState } from 'react'
import './CastList.css'

export default function CastList(props) {
    const { movieId } = props
    const [casts, setCasts] = useState([])

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.PRIVATE_KEY}`
            }
        };

        fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`, options)
            .then(response => response.json())
            .then(response => setCasts(response.cast.slice(0, 5)))
            .catch(err => console.error(err));
    }, [movieId])

    return (
        <div className='d-flex gap-2 mt-4'>
            {
                casts.map(cast => (
                    <div className='cast'>
                        <img className='cast-img' src={`https://image.tmdb.org/t/p/w200/${cast.profile_path}`} />
                        <span className='cast-name'>{cast.name}</span>
                    </div>
                ))
            }
        </div>
    )
}
