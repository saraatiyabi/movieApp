import React from 'react'
import { Link } from 'react-router-dom'

export default function PersonCard(props) {
    return (
        <div className='movie-card' style={{ width: "100%" }}>
            <Link to={`/personInfo/${props.id}`}>
                <img src={`https://image.tmdb.org/t/p/w200/${props.profile_path}`} alt='' />
                <div className='movie-card-detail'>
                    <span className='movie-card-name'>{props.name}</span>
                </div>
            </Link>
        </div>
    )
}
