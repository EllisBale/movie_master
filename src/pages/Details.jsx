import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

function Details () {

    const { id } = useParams();
    const [movie, setMovie] = useState("");

    const fetchDetails = async () => {

        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${id}`,
                API_OPTIONS
            );

            if (!response.ok) {
                throw new Error("Failed to fetch movie data.");
            }

            const data = await response.json();
            setMovie(data);

        } catch (e) {
            console.error("Error fetching movie details:",  e);
        }
    };


    useEffect(() => {
        fetchDetails();
    }, [id] );

    return (
        <>
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>
        <div className="movie-card">
            <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : 
                            "https://placehold.co/300x400"}
                        alt={movie.title} 
             />
        </div>
        </>
    )
};

export default Details;