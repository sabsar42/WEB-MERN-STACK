import React from 'react';
import AppNav from "../components/AppNav.jsx";
import {ReadRequest} from "../API_Request/ApiRequest.jsx";

const HomePage = () => {
    let [data, SetData] = React.useState([]);

    const ReadData = async () => {
        let res = await ReadRequest();
        SetData(res);
    }
    return (
        <div>
            <AppNav/>
            <h1>Home</h1>
            <button onClick={()=>{
                SetData(
                    ReadRequest
                )

            }}>Get Product List</button>
            <p>
                {
                    JSON.stringify(data, null, 2)
                }
            </p>
        </div>
    );
};

export default HomePage;