import { useEffect, useState, useRef } from "react";
import supabase from "../../supabase/client";
import { formatDate } from "../../../utils/formatDate";




export default function RealtimeChat({ game }) {

    const [messages, setMessages] = useState([]);
    const [loadingInitial, setLoadingInitial] = useState(false);
    const [error, setError] = useState('');
    const messageRef = useRef(null);

    function scrollSmoothToBottom() {
        if (messageRef.current) {
            messageRef.current.scrollTop = messageRef.current.scrollHeight;
        }
    }

    const getInitialMessages = async () => {
        setLoadingInitial(true);


        if (!game?.id) {  // Controllo per evitare errori
            setError("Game ID is undefined");
            setLoadingInitial(false);
            return;
        }

        const { data, error } = await supabase
            .from("messages")
            .select()
            .eq("game_id", game.id)
        if (error) {
            setError(error.message)
            return;
        }
        setLoadingInitial(false);
        setMessages(data);
    };

    useEffect(() => {
        getInitialMessages();
        const channel = supabase
            .channel("messages")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "messages",
                },
                () => getInitialMessages()
            )
            .subscribe();

        return () => {
            if (channel) {
                supabase.removeChannel(channel);
            }
            channel.unsubscribe();
        }
    }, [game])

    useEffect(() => {
        scrollSmoothToBottom();
    }, [messages])


    return (
        <div className="text-dark">
            {messages && messages.map((message) => (
                <div key={message.id} ref={messageRef}>
                    <div className="chatMessage">
                        <p className="ms-2"><span className="fw-bold">{message.profile_username}</span> <span className="fst-italic">said...</span></p>
                        <p className="ms-2">-{message.content}</p>
                        <small className="timeStamps d-flex justify-content-end me-2">{formatDate(message.updated_at)}</small>
                    </div>
                </div>
            ))}
        </div>
    )
}
