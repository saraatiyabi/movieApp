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
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NWViNTg4MjJjMGVhOWM1ZGM4NDY4OWUzODI3MDY1NiIsInN1YiI6IjY1NGNhMTFhMjkzODM1MDBmZTBlZDk0NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.718YCgxBiTKLTQvuVR4Po-9OpwC9uteSGM7NuS1-Djw'
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
