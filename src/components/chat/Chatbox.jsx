import { Toaster, toast } from "sonner";
import supabase from "../../supabase/client";
import RealtimeChat from "./RealtimeChat"


export default function Chatbox({ game, session }) {

    async function handleMessageSubmit(event) {
        event.preventDefault();
        const inputMessage = event.currentTarget;
        const { message } = Object.fromEntries(new FormData(inputMessage));
        if (typeof message === "string" && message.trim().length !== 0) {
            const { data, error } = await supabase
                .from("messages")
                .insert([
                    {
                        profile_id: session.user.id,
                        profile_username: session.user.user_metadata.username,
                        game_id: game.id,
                        content: message,
                    },
                ])
                .select();
            if (error) {
                //console.log("Errore Supabase:", error);
                toast.error("Message failed :(");
            } else {
                toast.success("Message sent! :)");
                inputMessage.reset();
            }
        }
    }



    return (


            <div className="chatContainer container mt-4">
                <h2 className="text-center">Realtime Chat</h2>
                <div className="chatBox mb-3 border p-3 bg-light">
                    <div className=" p-2 border-bottom"> <RealtimeChat game={game} /> </div>
                </div>
                <form onSubmit={handleMessageSubmit} className="d-flex">
                    <input
                        type="text"
                        className="form-control me-2"
                    placeholder="Scrivi un messaggio..."
                    name="message"
                    />
                    <button type="submit" className="btn btn-light">Invia</button>
                </form>
                <Toaster position="top-center" />
            </div>

    )
}