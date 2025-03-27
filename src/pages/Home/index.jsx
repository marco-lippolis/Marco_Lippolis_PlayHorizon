import { useState, useEffect } from "react";
import GameCard from "../../components/GameCard";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const api_key = "98ee1eb73dfc4c92b90c7d6c92636b79";

export default function Home() {
    const [games, setGames] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    // Funzione per ottenere i dati dal server
    const fetchData = async (page) => {
        setLoading(true);
        const url = `https://api.rawg.io/api/games?key=${api_key}&dates=2025-01-01,2025-12-31&page=${page}`;
        const response = await fetch(url);
        const json = await response.json();
        setGames(json.results);
        setLoading(false);
    };

    // Effetto per caricare i giochi quando cambia la pagina
    useEffect(() => {
        fetchData(page);
    }, [page]);

    return (
        <div className="container-lg-fluid px-3">
            <div className="headerSection">
                <Header />
            </div>

            <div className="row">
                <div className="col-2">
                    <Sidebar />
                </div>

                <div className="col-10">
                    <div className="mt-3">
                        <h1 className="fw-bold text-light">New and trending</h1>
                        <small className="fst-italic px-1 text-light">Based on player counts and release date...</small>
                        <hr />
                    </div>


                    <div className="row row-cols-2 row-cols-md-5 g-4 mt-3">
                        {games.map((game) => (
                            <GameCard key={game.id} game={game}/>
                        ))}
                    </div>


                    <div className="pagination-container mt-4">
                        <button
                            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                            className="btn btn-sm btn-light"
                            disabled={page <= 1 || loading}
                        >
                            PREV
                        </button>
                        <span className="mx-3">Page {page}</span>
                        <button
                            onClick={() => setPage((prev) => prev + 1)}
                            className="btn btn-sm btn-light"
                            disabled={loading}
                        >
                            NEXT
                        </button>
                    </div>

                    {loading && <p>Loading...</p>}
                </div>
            </div>
        </div>
    );
}
