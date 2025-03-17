import callAPI from "./callAPI";
import {jwtDecode} from 'jwt-decode';

const url_user = "http://localhost:5000/api/v1/user"
const url_hobbies = "http://localhost:5000/api/v1/hobby"

const decode_token = (token)=>{
    const decoded_token = jwtDecode(token);
    return decoded_token.userId;
}

const getUserData =async(userId)=>{
    const user_url = url_user+`/:${userId}`;
    const hobby_url = url_hobbies+`/:${userId}`;
    const user = await callAPI(user_url,"GET");
    const hobbies = await callAPI(hobby_url,"GET");
    console.log(user,hobbies.data);
    return response,hobbies;
}

const calculate_level = (points)=>{
    const level = Math.floor(points/1000);
    const left_points = points%1000;
    const percentage = (left_points/1000)*100
    return {
        level : level,
        points : left_points,
        percentage : percentage
    }
}
/*
i need to get the user data then send the request to get all hobbies , setup user page for the level,decode the token 
*/

export default {
    decode_token,
    getUserData,
    calculate_level
}