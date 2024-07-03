import React, { useEffect, useState } from 'react'
import './HeaderSlide.css'
import TrailerModal from '../TrailerModal/TrailerModal'
import { Link } from 'react-router-dom'

export default function HeaderSlide(props) {
    const background = `https://image.tmdb.org/t/p/original/${props.backdrop_path}`

    return (
        <div className='movie-background' style={{
            backgroundImage: `url(${background})`,
            width: "100%",
            height: "100vh",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            position: "relative"
        }}>
            <div className='movie-container container'>
                <div className='movie-details'>
                    <h1 className='movie-title'>{props.title}</h1>
                    <p className='movie-desc'>{props.overview}</p>
                    <div className='btns'>
                        <Link to={`/info/${props.media_type}/${props.id}`} className='watch-btn'>Watch Now</Link>
                        <button className='trailer-btn' onClick={() => {
                            props.onMovieId(props.id)
                            props.setShowTrailerModal(true)

                        }}>Watch Trailer</button>
                    </div>
                </div>
                <div className='movie-poster'>
                    <img className='movie-img' src={`https://image.tmdb.org/t/p/w300/${props.poster_path}`} alt='' />
                </div>
            </div>
        </div>
    )
}
