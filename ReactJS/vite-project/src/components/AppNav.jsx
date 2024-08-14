import React from 'react';
import {NavLink} from "react-router-dom";

const AppNav = () => {
    return (
        <div>
            <ul>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li><li>
                    <NavLink to="/profile">Home</NavLink>
                </li><li>
                    <NavLink to="/product">Home</NavLink>
                </li>
            </ul>
        </div>
    );
};

export default AppNav;