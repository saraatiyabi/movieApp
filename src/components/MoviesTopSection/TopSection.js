import React from 'react'
import './TopSection.css'
import { Link } from 'react-router-dom'

export default function TopSection({ title, media_type }) {
    return (
        <div className='d-flex justify-content-between align-items-center my-2 bg-dark py-1 px-3 rounded-2'>
            <span className='text-light fs-5'>{title}</span>
            {
                media_type && <Link to={`/${media_type}/${title.split(" ").join("")}`} className='btn btn-dark'>View All</Link>
            }
        </div>
    )
}
