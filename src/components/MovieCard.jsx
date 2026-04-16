import { Link } from "react-router-dom";


const MovieCard = ({ movie:
    { title, poster_path, id}}) => {


    return(
        <Link to={`/movie/${id}`}>
            <div className="movie-card">
                <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : 
                        "https://placehold.co/300x400"}
                    alt={title} 
                />
                <h3>{title}</h3>
            </div>
        </Link>
    )
};

export default MovieCard;