import { useState, useEffect } from "react"


const url = "https://api.rawg.io/api/games?key=98ee1eb73dfc4c92b90c7d6c92636b79";


export default function HeaderCarousel() {

    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchCarousel = async () => {
            const response = await fetch(url);
            const json = await response.json();
            setGames(json.results);

        }
        fetchCarousel();
    }, []);

    return (
        <>
            <div id="carouselExample" className="carousel slide">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="{game.background_image}" className="d-block w-100" alt="..."/>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </>
    )
}