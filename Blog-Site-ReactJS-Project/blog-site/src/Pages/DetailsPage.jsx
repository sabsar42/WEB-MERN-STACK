import {useEffect, useState} from "react";
import {postLatest} from "../APIRequest/APIRequest.js";
import Layout from "../Layout/Layout.jsx";

const DetailsPage = () => {
    let {postID} = useParamas();

    let [list,SetList] = useState(null);

    useEffect(
        ()=>{
            (async ()=>{
                let res = await postDetails(postID);
                SetList(res);
            })()
        },[postID]
    )

    return(
        <Layout>
            {list===null? <Loader/> : <BlogList lost = {list}/>}
        </Layout>
    );
}

export default DetailsPage;