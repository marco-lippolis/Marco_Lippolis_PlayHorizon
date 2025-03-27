import { useState } from "react";
import { useNavigate } from "react-router";


export default function Searchbar() {
    const [inputSearchbar, setInputSearchbar] = useState("");


    const navigate = useNavigate();

    function handleSearchBar(e) {
        e.preventDefault();
        navigate(`/search?query=${encodeURIComponent(inputSearchbar)}`);
    }




    return (
        <>
            <div className="searchBar d-flex justify-content-center mb-2">
                <form onSubmit={handleSearchBar} className="input-group d-flex w-50" role="search">
                    <input onChange={(event) => setInputSearchbar(event.target.value)} className="form-control" type="search" placeholder="Search game and have fun..." aria-label="Search" />
                    <button className="btn btn-light " type="submit"><i className="bi bi-search"></i></button>
                </form>
            </div>
        </>
    )
}
