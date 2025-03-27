import {
    createBrowserRouter,
    createRoutesFromElements,
    Navigate,
    Outlet,
    Route,
} from "react-router";
import Markup from "../layout";
import Home from "../pages/Home";
import Genre from "../pages/Genre";
import Game from "../pages/Game";
import SearchResult from "../pages/SearchResult";
import Platform from "../pages/Platform";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import Account from "../pages/Account";
import { useContext, useState } from "react";
import SessionContext from "../context/SessionContext";

function ProtectedRoute() {
    const {session} = useContext(SessionContext);



    if (!session) {
        return <Navigate to={ "/" } />
    }

    return <Outlet/>
}

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Markup />}>
            <Route path="/" element={<Home />} />
            <Route path="/games/:genre" element={<Genre />} />
            <Route path="/games/:id/:games" element={<Game />} />
            <Route path="/games/platform" element={<Platform />} />
            <Route path="/search" element={<SearchResult />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/login" element={<SignIn />} />

            <Route element={<ProtectedRoute />}>
                <Route path="/account" element={<Account/> } />
            </Route>
        </Route>
    )
);

export default router;