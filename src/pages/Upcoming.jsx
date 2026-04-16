import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

function Upcoming () {

    const [movies, setMovies] = useState([]);

    const fetchUpcomingMovies = async () => {
        try {
            const response = await fetch(
                "https://api.themoviedb.org/3/movie/upcoming",
                API_OPTIONS
            );

            console.log("Status:", response.status);

            if (!response.ok) {
                throw new Error("Failed to fetch upcoming movies.");
            }


            const data = await response.json();
            setMovies(data.results);
        } catch (e) {
            console.error("Error fetching upcoming movies:", e);
        }
    };

    useEffect(() => {
        fetchUpcomingMovies();
    }, [] );

    return (
        <div>
            <h1 className="mb-5 pb-5">Upcoming Movies</h1>
             <ul className="movie-layout">
            {movies.map((movie) => (
        <MovieCard key={movie.id}  movie={movie} />
      ))}
      </ul>
        </div>
    )
};
export default Upcoming;