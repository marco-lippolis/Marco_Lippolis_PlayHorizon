import { useEffect, useState } from "react"
import { Link } from "react-router"; // Assicurati di usare "react-router-dom"

const url = "https://api.rawg.io/api/genres?key=98ee1eb73dfc4c92b90c7d6c92636b79";

export default function Sidebar() {

    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchGenres = async () => {
            const response = await fetch(url);
            const json = await response.json();
            setGenres(json.results);
        }
        fetchGenres();
    }, []);

    return (
        <div className="mt-3">
            <h4 className="fst-italic fw-bold mb-3">Filters <i className="bi bi-filter"></i></h4>
            <hr className="w-50"/>
            <div className="d-flex flex-column">
                <h5>Genres: <i className="bi bi-arrow-down-short"></i></h5>

                {genres.map((genre) => (
                    <Link
                        key={genre.id}
                        to={`/games/${genre.slug}`}
                        className="text-decoration-none text-light mb-2"
                    >
                        {genre.name}
                    </Link>
                ))}
            </div>
        </div>
    )
}
