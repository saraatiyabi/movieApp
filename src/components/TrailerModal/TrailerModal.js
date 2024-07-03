import React, { useState } from 'react'
import './TrailerModal.css'
import Spinner from '../Spinner/Spinner'

export default function TrailerModal(props) {
    return (
        <div>
            <div className='overlay'></div>
            <div className='window'>
                <div className='window-header'>
                    <span>Official Trailer</span>
                    <span className='closeBtn' onClick={() => props.setShowTrailerModal(false)}>X</span>
                </div>
                {
                    props.isTrailerLoading ? (<Spinner />) :
                        (<iframe title={props.title} width="800" height="500" src={props.trailer}></iframe>)
                }
            </div>
        </div>


    )
}
