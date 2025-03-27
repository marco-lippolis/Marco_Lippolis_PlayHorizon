import { useState } from "react";
import { useNavigate } from "react-router";


export default function GameCard({ game }) {
    const navigate = useNavigate();
    const [hidden, setHidden] = useState(false);
    const genres = game.genres.map((genre) => genre.name).join(', ');



    return (
        <div className="">
            <div className={` bg-black card h-100 ${hidden ? 'sizeCard' : ''}`}
                onMouseEnter={() => setHidden(true)}
                onMouseLeave={() => setHidden(false)}
                onClick={() => navigate(`/games/${game.id}/${game.name}`)}
            >
                <img src={game.background_image} className="card-img-top" alt="..." />
                <div className="card-body text-light">
                    <small>{genres}</small>
                    <h4 className="card-title fw-bolder" key={game.id}>{game.name}</h4>
                    {!hidden && <small className="card-text">read more...</small>}
                    {hidden &&
                        <div>
                            <i className="bi bi-star-fill text-warning"></i> {game.rating}
                            <hr className="divider" />
                            <div>
                                <i className="bi bi-controller"> <span className="fw-bold">Platforms:</span> </i>
                                {game.platforms.map((plat) => (
                                    <div key={plat.platform.id}>
                                        <small>{plat.platform.name}</small>
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )

}