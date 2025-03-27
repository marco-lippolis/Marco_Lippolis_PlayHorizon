import { Outlet } from "react-router";
import Navbar from "../components/Navbar";


export default function Markup() {
    return (
        <div className="">
            <Navbar />


            {/* slot da riempire con rotta annidata */}
            <Outlet />
            <footer className="mt-5 mb-2">
                <div className="d-flex justify-content-center">
                    <small className="text-light">Baci e abbracci <a href="https://github.com/marco-lippolis">Marco Lip</a></small>
                </div>
            </footer>
        </div>
    );
}