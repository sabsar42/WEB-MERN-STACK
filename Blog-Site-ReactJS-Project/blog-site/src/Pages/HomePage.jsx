import {useEffect, useState} from "react";
import {postLatest} from "../APIRequest/APIRequest.jsx";
import Layout from "../Layout/Layout.jsx";

const HomePage = () => {
    let [list, SetList] = useState(null);

    useEffect(
        ()=>{
            (async ()=>{
                let res = await postLatest();
                SetList(res);
            })()
        },[]
    )

    return(
        <Layout>
            {list===null? <Loader/> : <BlogList lost = {list}/>}
        </Layout>
    );
}

export default HomePage;