import TrendingMovies from "./components/TrendingMovies/TrendingMovies";
import CategoryMovies from "./pages/CategoryMovies/CategoryMovies";
import Index from "./pages/Index/Index";
import MovieInfo from "./pages/MovieInfo/MovieInfo";
import Movies from "./pages/Movies/Movies";
import People from "./pages/People/People";
import PersonInfo from "./pages/PersonInfo/PersonInfo";
import Series from "./pages/Series/Series";

const routes = [
    { path: "/", element: <Index /> },
    { path: "/info/:mediaType/:mediaId", element: <MovieInfo /> },
    { path: "/movies", element: <Movies /> },
    { path: "/series", element: <Series /> },
    { path: "/:mediaType/:categoryName", element: <CategoryMovies /> },
    { path: "/people/:page", element: <People /> },
    { path: "/personInfo/:personId", element: <PersonInfo /> },
]

export { routes }