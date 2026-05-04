import { useEffect, useState } from "react"
import Search from "../components/Search";
import MovieCard from "../components/MovieCard"

const API_BASE_URL = 'https://api.themoviedb.org/3/';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}


function Home () {

    const [searchTerm, setSearchTerm] = useState("");
    
    
      const [movieList, setMovieList] = useState([]);
    
      const [errorMessage, setErrorMessage] = useState("");
    
      const [loading, setLoading] = useState(false);
    
    
      const fetchMovies = async (query) => {
    
        setLoading(true);
    
        try {
          const endpoint = query
          ? `${API_BASE_URL}/search/movie?query=${query}`
          : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
    
          const response = await fetch(endpoint, API_OPTIONS)
    
          if (!response.ok) {
            throw new Error("Failed to fetch movies.");
          }
    
          const data = await response.json();
    
          if (data.Response === 'False') {
            setErrorMessage(data.Error)
            setMovieList([]);
            return;
          }
    
          setMovieList(data.results || []);
    
        } catch (e) {
          console.error(`Error fetching movies: ${e}.`);
          setErrorMessage("Error Fetching movies.")
    
        } finally {
          setLoading(false);
        }
    
      };
    
      useEffect(() => {
        fetchMovies(searchTerm)
      }, [searchTerm]);
    
    
    return (

        <div className="homepage">
          <div className="pattern">
            <div className="wrapper">
              <header>
                  <img src="./hero.png" alt="Hero Banner" />
                  <h1>Explore <span className='text-gradient'>Movies</span>You'll Enjoy! </h1>
                      <Search  searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                  </header>
                  <section>
                      <h2>{searchTerm ? `Search results ${searchTerm}` : "Popular Movies"}  </h2>
                      <ul className="movie-layout">
                      {movieList.map((movie) => (
                      <MovieCard key={movie.id}  movie={movie} />
                      ))}
                      </ul>
                  </section>
              <header/>
            </div>
          </div>
        </div>

     
    )
}

export default Home;