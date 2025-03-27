import { useState, useEffect, useContext } from 'react'
import supabase from '../supabase/client'
import SessionContext from '../context/SessionContext'
import Avatar from './Avatar';




export default function ProfileAccount() {
    const { session } = useContext(SessionContext);

    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState(null)
    const [avatar_url, setAvatarUrl] = useState(null)

    useEffect(() => {
        let ignore = false
        async function getProfile() {
            setLoading(true)
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

            setLoading(false)
        }

        getProfile()

        return () => {
            ignore = true
        }
    }, [session])

    async function updateProfile(event, avatarUrl) {
        event.preventDefault()

        setLoading(true)
        const { user } = session;

        const updates = {
            id: user.id,
            username,
            avatar_url: avatarUrl,
            updated_at: new Date(),
        }

        const { error } = await supabase.from('profiles').upsert(updates)

        if (error) {
            alert(error.message)
        } else {
            setAvatarUrl(avatarUrl);
            window.location.reload();
        }
        setLoading(false)
    }

    const signOut = async () => {
        await supabase.auth.signOut();
        toast.success('See you soon... :(');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        navigate("/");
    }

    return (
        <form onSubmit={updateProfile} className="form-widget">
            <Avatar
                url={avatar_url}
                size={150}
                onUpload={(event, url) => {
                    updateProfile(event, url)
                }}
            />
            <div>
                <label htmlFor="email" className='text-black'>Email</label>
                <input id="email" type="text" value={session.user.email} disabled />
            </div>
            <div>
                <label htmlFor="username" className='text-black'>Username</label>
                <input
                    id="username"
                    type="text"
                    required
                    value={username || ''}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div>
                <button className="button block primary" type="submit" disabled={loading}>
                    Update
                </button>
            </div>

            <div>
                <button className="button block secondary" type="button" onClick={signOut}>
                    Sign Out
                </button>
            </div>
        </form>
    )
}