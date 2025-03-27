import { useEffect, useState } from "react";
import { useParams } from "react-router";
import GameCard from "../../components/GameCard";
import Sidebar from "../../components/Sidebar";

//const url = "https://api.rawg.io/api/games?key=98ee1eb73dfc4c92b90c7d6c92636b79&genres=action&page=1";



export default function Genre() {
    const [games, setGames] = useState([]);
    const { genre } = useParams();

    useEffect(() => {
        const fetchGenre = async () => {
            const response = await fetch(`https://api.rawg.io/api/games?key=98ee1eb73dfc4c92b90c7d6c92636b79&genres=${genre}&page=1`);
            const json = await response.json();
            setGames(json.results);
        }
        fetchGenre();
    }, [genre])

    return (
        <div className="container">

            <div className="row">
                <div className="col-2">
                    <Sidebar />
                </div>

                <div className="col-10">
                    <div className="mt-3">
                        <h1 className="fw-bold text-light">New and trending</h1>
                        <small className="fst-italic px-1 text-light">Based on player counts and release date...</small>
                    </div>

                    <div className="row row-cols-2 row-cols-md-4 g-4 mt-3">
                        {games.map((game) => (
                            <GameCard key={ game.id } game={game} />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    )
}