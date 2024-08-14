import React from 'react';
import {BrowserRouter, HashRouter, Route, Routes} from "react-router-dom";
import ProfilePage from "./page/ProfilePage.jsx";
import HomePage from "./page/HomePage.jsx";
import ProductPage from "./page/ProductPage.jsx";


const App = () => {
    return (
        // HashRouter,  for Hash(#) URL
        // BrowserRouter
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/profile" element={<ProfilePage/>}/>
                <Route path="/product" element={<ProductPage/>}/>

            </Routes>
        </BrowserRouter>
    );
};

export default App;