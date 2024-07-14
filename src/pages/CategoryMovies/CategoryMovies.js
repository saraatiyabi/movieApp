import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Header from '../../components/Header/Header'
import MovieCard from '../../components/MovieCard/MovieCard'
import Footer from '../../components/Footer/Footer'
import Spinner from '../../components/Spinner/Spinner'

export default function CategoryMovies() {
    const { categoryName } = useParams()
    const { pathname } = useLocation()
    const { mediaType } = useParams()
    const [items, setItems] = useState([])
    const [pageNum, setPageNum] = useState(1)
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        setItems([])
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.PRIVATE_KEY}`
            }
        };
        switch (categoryName) {
            case 'TrendingMovies': {
                console.log('treding movies')
                fetch(`https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${pageNum}`, options)
                    .then(response => response.json())
                    .then(response => {
                        console.log(response)
                        setItems(prevState => [...prevState, ...response.results])
                        setIsLoading(false)
                    })
                    .catch(err => console.error(err));
                break;
            }
            case 'TopRatedMovies': {
                console.log('top rated movies')
                fetch(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${pageNum}`, options)
                    .then(response => response.json())
                    .then(response => {
                        console.log(response)
                        setItems(prevState => [...prevState, ...response.results])
                        setIsLoading(false)
                    })
                    .catch(err => console.error(err));
                break;
            }
            case 'PopularMovies': {
                console.log('popular movies')
                fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${pageNum}`, options)
                    .then(response => response.json())
                    .then(response => {
                        console.log(response)
                        setItems(prevState => [...prevState, ...response.results])
                        setIsLoading(false)
                    })
                    .catch(err => console.error(err));
                break;
            }
            case 'Upcoming': {
                console.log('upcoming movies')
                fetch(`https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${pageNum}`, options)
                    .then(response => response.json())
                    .then(response => {
                        console.log(response)
                        setItems(prevState => [...prevState, ...response.results])
                        setIsLoading(false)
                    })
                    .catch(err => console.error(err));
                break;
            }
            case 'NowPlayingMovies': {
                console.log('now playing movies')
                fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${pageNum}`, options)
                    .then(response => response.json())
                    .then(response => {
                        console.log(response)
                        setItems(prevState => [...prevState, ...response.results])
                        setIsLoading(false)
                    })
                    .catch(err => console.error(err));
                break;
            }
            case 'TrendingTv': {
                fetch(`https://api.themoviedb.org/3/trending/tv/day?language=en-US&page=${pageNum}`, options)
                    .then(response => response.json())
                    .then(response => {
                        setItems(prevState => [...prevState, ...response.results])
                        setIsLoading(false)
                    })
                    .catch(err => console.error(err));
                break;
            }
            case 'PopularTv': {
                fetch(`https://api.themoviedb.org/3/tv/popular?language=en-US&page=${pageNum}`, options)
                    .then(response => response.json())
                    .then(response => {
                        setItems(prevState => [...prevState, ...response.results])
                        setIsLoading(false)
                    })
                    .catch(err => console.error(err));
                break;
            }
            case 'TopRatedTV': {
                fetch(`https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=${pageNum}`, options)
                    .then(response => response.json())
                    .then(response => {
                        setItems(prevState => [...prevState, ...response.results])
                        setIsLoading(false)
                    })
                    .catch(err => console.error(err));
                break;
            }
            case 'OnTheAir': {
                fetch(`https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=${pageNum}`, options)
                    .then(response => response.json())
                    .then(response => {
                        setItems(prevState => [...prevState, ...response.results])
                        setIsLoading(false)
                    })
                    .catch(err => console.error(err));
                break;
            }
            case 'AiringToday': {
                fetch(`https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=${pageNum}`, options)
                    .then(response => response.json())
                    .then(response => {
                        setItems(prevState => [...prevState, ...response.results])
                        setIsLoading(false)
                    })
                    .catch(err => console.error(err));
                break;
            }
            default: {
                setItems([])
            }
        }
    }, [pageNum, categoryName])

    useEffect(() => {
        setIsLoading(true)
    }, [pathname])


    return (
        <>
            {
                isLoading ? (<Spinner />) : (
                    <div className='movies'>
                        <Header title={categoryName} />
                        <div className='page-content' key={pathname}>
                            <div className='container mt-3'>
                                <div className='media-container'>
                                    <div className='row'>
                                        {
                                            items.map((item, index) => (
                                                <MovieCard key={index} {...item} media_type={mediaType === "movies" ? "movie" : "tv"} />
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className='load-more-btn'>
                                    <button className='btn btn-outline-light' onClick={() => setPageNum(prevNum => prevNum + 1)}>Load More</button>
                                </div>
                            </div>
                            <Footer />
                        </div>
                    </div>
                )
            }
        </>
    )
}
