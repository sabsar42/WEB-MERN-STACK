import axios from 'axios';

const BaseUrl = "https://crud.teamrabbil.com/api/";

export async function ReadRequest() {

    let response = await axios.get(BaseUrl+"/v1/ReadProduct");
    return response.data['data'];
}