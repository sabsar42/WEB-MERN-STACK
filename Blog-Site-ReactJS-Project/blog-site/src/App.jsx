import React from "react";
import {BrowserRouter, Routes, Route } from "react-router-dom";

const App = () =>{
    return(
        <BrowserRouter>
            <Routes>
                <Route> path = "/" element = {<HomePage/>}</Route>
                <Route> path = "/byCategory/:categoryID" element = {<ByCategoryPage/>}</Route>
                <Route> path = "/details/:postID" element = {<DetailsPage/>}</Route>
            </Routes>
        </BrowserRouter>
    )
};