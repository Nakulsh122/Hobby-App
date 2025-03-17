import axios from 'axios';

const callAPI =async (url,method,body = {})=>{
    switch (method) {
        case "POST":
            try {
                const response = await axios.post(url,body);
                if(response){
                    return response;
                }
            } catch (error) {
                console.log("Error occured : ",error.message)
            }
            break;
        case "GET":
            try {
                const response = await axios.get(url);
                if(response.len >0){
                    return response
                }
            } catch (error) {
                console.log("Error occured : ",error.message)
            }
            break;
        case "PUT":
            try{
                const response = await axios.put(url,body);
                if(response){
                    return response
                }
            } catch (error){
                console.log("Error occured : ",error.message);
            }
            break;
        case "DELETE":
            try {
                const response = await axios.put(url)
                    if(response){
                        return response
                    }
                
            } catch (error) {
                console.log("Error occured : ",error.message);
            }
            break;
        default:
            break;
    }

}

export default callAPI;