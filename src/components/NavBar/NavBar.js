import React from 'react'
import './NavBar.css'
import { Link, useLocation } from 'react-router-dom'

export default function NavBar() {
  const { pathname } = useLocation()
  return (
    <div className='header'>
      <div className='navbar-content'>
        <p className='navbar-logo'>Diamond Movies</p>
        <div className='navbar-menu'>
          <ul className='main-menu'>
            <li className='main-menu-item'>
              <Link to="/" className={pathname === "/" ? 'main-menu-link active' : 'main-menu-link'}>Home</Link>
            </li>
            <li className='main-menu-item'>
              <Link to="/movies" className={pathname === "/movies" ? 'main-menu-link active' : 'main-menu-link'}>Movies</Link>
              <ul className='sub-menu'>
                <li className="sub-menu-item">
                  <Link to="/movies/PopularMovies" className="submenu-link">Popular</Link>
                </li>
                <li className="sub-menu-item">
                  <Link to="/movies/NowPlayingMovies" className="submenu-link">Now Playing</Link>
                </li>
                <li className="sub-menu-item">
                  <Link to="/movies/Upcoming" className="submenu-link">Upcoming</Link>
                </li>
                <li className="sub-menu-item">
                  <Link to="/movies/TopRatedMovies" className="submenu-link">Top Rated</Link>
                </li>
              </ul>
            </li>
            <li className='main-menu-item'>
              <Link to="/series" className={pathname === "/series" ? 'main-menu-link active' : 'main-menu-link'}>Tv Series</Link>
              <ul className='sub-menu'>
                <li className="sub-menu-item">
                  <Link to="/tv/PopularTv" className="submenu-link">Popular</Link>
                </li>
                <li className="sub-menu-item">
                  <Link to="/tv/AiringToday" className="submenu-link">Airing Today</Link>
                </li>
                <li className="sub-menu-item">
                  <Link to="/tv/OnTheAir" className="submenu-link">On Tv</Link>
                </li>
                <li className="sub-menu-item">
                  <Link to="/tv/TopRatedTV" className="submenu-link">Top Rated</Link>
                </li>
              </ul>
            </li>
            <li className='main-menu-item'>
              <Link to="/people/1" className={pathname === "/people/1" ? 'main-menu-link active' : 'main-menu-link'}>People</Link>
              <ul className='sub-menu'>
                <li>
                  <Link to="/people/1" className="submenu-link">Popular People</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>

  )
}
