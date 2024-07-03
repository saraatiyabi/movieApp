import React from 'react'
import './Footer.css'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

export default function Footer() {
    return (
        <div className='footer w-100'>
            <div className='container'>
                <div className='site-logo'>
                    <PlayCircleOutlineIcon className='logo-icon' style={{fontSize: "30px"}} />
                    <span>Diamond Movies</span>
                </div>
                <div className='row justify-content-center'>
                    <div className='col-3'>
                        <ul className='footer-column-menu'>
                            <li>Home</li>
                            <li>Contact Us</li>
                            <li>Terms of Services</li>
                            <li>About Us</li>
                        </ul>
                    </div>
                    <div className='col-3'>
                        <ul className='footer-column-menu'>
                            <li>Live</li>
                            <li>FAQ</li>
                            <li>Premium</li>
                            <li>Privacy Policy</li>
                        </ul>
                    </div>
                    <div className='col-3'>
                        <ul className='footer-column-menu'>
                            <li>You Must Watch</li>
                            <li>Recent Release</li>
                            <li>Top IMDB</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
