import React from 'react'
import './Pagination.css'
import { Link } from 'react-router-dom'

export default function Pagination({ currentPage }) {
    return (
        <div className='pagination-container'>
            {
                Array(10).fill(0).map((item, index) => (
                    <Link className={Number(currentPage) === index + 1 ? 'active' : ''} to={`/people/${index + 1}`}>{index + 1}</Link>
                ))
            }
        </div>
    )
}
