import Searchbar from "./SearchBar";

export default function Header() {
    return (
        <div className="">
            <Searchbar />

            <div className="video-wrapper">
                <video playsInline autoPlay muted loop className="video-container">
                    <source src="/videos/TheWitcher.mp4" type="video/mp4" />
                </video>
            </div>
        </div>
    )
}
