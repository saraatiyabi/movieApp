import React from 'react'
import './Header.css'
export default function Header({title}) {
    return (
        <div className='page-header'>
            <span className='category'>{title}</span>
        </div>
    )
}
