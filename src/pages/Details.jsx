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
    const [cast, setCast] = useState([])

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

            const creditsResponse = await fetch(
                `https://api.themoviedb.org/3/movie/${id}/credits`,
                API_OPTIONS
            );

            if (!creditsResponse.ok) {
                throw new Error("Failed to fetch movie credits.");
            }

            const creditsData = await creditsResponse.json();
            setCast(creditsData.cast);



        } catch (e) {
            console.error("Error fetching movie details:",  e);
        }
    };


    useEffect(() => {
        fetchDetails();
    }, [id] );

    return (
        <>
        <div className="wrapper">
            <div className="film-description">
                <div className="movie-card">
                    <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : 
                            ""}
                        alt={movie.title} 
                    />
                </div>
                <div>
                    <h1 className="mt-3 mb-3">{movie.title}</h1>
                    <p className="mb-5">{movie.overview}</p>
                    <hr /> 
                    <div>
                        <h3 className="mt-5 px-2 text-start text-3xl">Cast:</h3>
                        <ul className="flex text-center flex-wrap gap-3 mt-4 mb-5 overflow-x-auto">

                            {cast.length > 0 ? (
                                cast.map((actor) => (
                                <li key={actor.cast_id} className="text-sm">
                                    {actor.name},
                                </li>
                                ))
                            ) : (
                                <p>No cast information available.</p>
                            )}
                        </ul>
                        <hr />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
};

export default Details;