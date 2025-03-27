import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router"
import supabase from "../supabase/client";
import SessionContext from "../context/SessionContext";
import { Toaster, toast } from 'sonner';





export default function Navbar() {
    const navigate = useNavigate();
    const { session, user } = useContext(SessionContext);
    const [username, setUsername] = useState(null);
    const [avatar_url, setAvatarUrl] = useState(null);

    useEffect(() => {
        let ignore = false
        async function getProfile() {

            if (session) {
                const { user } = session

                const { data, error } = await supabase
                    .from('profiles')
                    .select(`username, avatar_url`)
                    .eq('id', user.id)
                    .single()

                if (!ignore) {
                    if (error) {
                        console.warn(error)
                    } else if (data) {
                        setUsername(data.username)
                        setAvatarUrl(data.avatar_url)
                    }
                }

            }

        }

        getProfile()

        return () => {
            ignore = true
        }
    }, [session])


    const signOut = async () => {
        await supabase.auth.signOut();
            toast.success('See you soon... :(');
            await new Promise((resolve) => setTimeout(resolve, 1000));
        navigate("/");
        }

    useEffect(() => {
        const getInfo = async () => {
            const { data } = await supabase.auth.getSession();
        }
        getInfo();
    }, []);



    return (
        <>
            <nav className="navbar-dark navbar-expand-lg">
                <div className="container-fluid d-flex">
                    <a className="navbar-brand fw-bold fs-2" href="/">PlayHorizon<img src="/logos/rainbow.png" alt="" className="logoNav" /></a>

                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav align-items-center">
                            {session ?
                                <>
                                    <div className="d-flex align-items-center me-3">
                                        <div className="iconAvatar">
                                            <img src={`https://wagzzjxerphhtvbdmthm.supabase.co/storage/v1/object/public/avatars/${avatar_url}`} alt="User Avatar" />
                                        </div>
                                    </div>
                                    <div className="dropdown">
                                        <button className="btn btn-light btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            {session && username}
                                        </button>
                                        <ul className="mt-2 dropdown-menu dropdown-menu-dark">
                                            <li><Link to={"/account"} className="dropdown-item">Profile</Link></li>
                                            <li><hr className="dropdown-divider"/></li>
                                            <li><button onClick={signOut} className="dropdown-item" href="/">Logout</button></li>
                                        </ul>
                                    </div>
                                </> :
                                <>
                                    <li className="nav-item mx-2">
                                        <Link to="/login">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/register">Register</Link>
                                    </li>
                                </> }
                        </ul>
                    </div>
                </div>
            </nav>
            <Toaster position="top-center" />
        </>
    )
}