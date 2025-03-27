
import { useContext, useEffect,useState } from "react";
import { useParams } from "react-router";
import SessionContext from "../../context/SessionContext";
import supabase from "../../supabase/client";
import { Toaster, toast } from 'sonner';
import Chatbox from "../../components/chat/Chatbox";




export default function Game() {

    const { session } = useContext(SessionContext);
    const { id } = useParams();
    const [game, setGame] = useState({});
    const [fav, setFav] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://api.rawg.io/api/games/${id}?key=98ee1eb73dfc4c92b90c7d6c92636b79`);
            const json = await response.json();
            //console.log(json);
            setGame(json);
        }
        fetchData();
    }, []);

    //insert
    const addToFav = async () => {
        if (!session || !game.id) return;
        //console.log("Inserting game to favourites:", game); // Log per il controllo
        const {  error } = await supabase
        .from('favourites')
        .insert([
            {
                profile_id: session.user.id,
                game_id: game.id,
                game_name: game.name
            },
        ])
        .select();
        if (error) {
            toast.error('ops something was wrong')
            //console.error('Error adding to favourites:', error); // Log errore
            //console.log("ops something was wrong", error);
        } else {
            toast.success('Game insert with success :)');
            //console.log('Game successfully added to favourites'); // Log successo

            readFav();
        }
    }

    //read
    const readFav = async () => {

        if (!game.id) return;
        //console.log("Reading favourites for user:", session.user.id, "and game:", game.id); // Log per il controllo

        let { data: favourites, error } = await supabase
        .from('favourites')
        .select("*")
        .eq('profile_id', session.user.id)
        .eq('game_id', game.id)

        if (error) {
            toast.error('ops game not found');
            //console.error('Error reading favourites:', error); // Log errore

        } else {
            setFav(favourites);
            //console.log('Favourites read:', favourites); // Log per il controllo

        }
    }

    //delete
    const removeFav = async () => {

        //console.log("Removing game from favourites:", game); // Log per il controllo
        const { error } = await supabase
            .from('favourites')
            .delete()
            .eq('game_id', game.id)
            .eq('profile_id', session.user.id)
        if (error) {
            toast.error('Non hai rimosso correttamente')
            //console.error('Error removing from favourites:', error); // Log errore

        } else {
            toast.success('Game removed');
            //console.log('Game successfully removed from favourites'); // Log successo
            readFav();
            setFav([]);
        }
    }

    useEffect(() => {
        if (session && game.id) {
            readFav();
        }
    }, [game]);


    return (
        <div className=" text-light container">
            <div className="row bg-black rounded">
                <div className="mt-1 col-7">
                    <small className="fst-italic">released at <span className="fw-bold">{ game.released }</span></small>
                    <h1>{game.name}</h1>
                    <hr/>
                    <p>{game.description_raw}</p>

                    <div className="d-flex flex-column">
                        <h2> <i className=" bi bi-star-fill text-warning"></i> {game.rating} </h2>
                    </div>
                </div>
                <div className="col-5">
                    <img className="img-fluid mt-2" src={game.background_image} alt="" />

                    {session && (
                        <div className="mb-2">
                            {fav.length == 0 ? (
                                <button onClick={() => addToFav(game)} className="btn btn-light btn-sm mt-3">Add to Whishlist</button>
                            ) : (
                                <button onClick={() => removeFav(game)} className="btn btn-danger btn-sm mt-3">Remove to Wishlist</button>
                            )}
                        </div>
                    )}
                </div>
            </div>
                    <div className="container col-5">
                        {session && (
                            <Chatbox game={ game } session={session} />
                        )}
                    </div>
            <Toaster position="top-center" />

        </div>
    )
}
