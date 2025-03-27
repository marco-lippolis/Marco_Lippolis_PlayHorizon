import { useEffect, useState } from "react";
import { useLocation } from "react-router"
import GameCard from "../../components/GameCard";


// const url = "https://api.rawg.io/api/games?key=98ee1eb73dfc4c92b90c7d6c92636b79&dates=2025-01-01,2025-12-31&page=1";

export default function SearchResult() {



    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const game = searchParams.get("query");

    const [games, setGames] = useState([]);



    const fetchData = async () => {
        const response = await fetch(`https://api.rawg.io/api/games?key=98ee1eb73dfc4c92b90c7d6c92636b79&dates=2025-01-01,2025-12-31&page=1&search=${game}`);
        const json = await response.json();
        setGames(json.results);




    }

    useEffect(() => {
        fetchData();
    },[game])



    return (
        <div className="container">
            <h1>Pagina dei risultati</h1>
            <div className="row row-cols-1 row-cols-md-4 g-4 mt-3">
                {games.map((game) => (
                    <GameCard key={ game.id } game={game} />
                    ))}
            </div>
        </div>
    )
}