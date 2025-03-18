import axios from 'axios';

const callAPI =async (url,method,body = {},LOG_REG = "",token="")=>{
    // console.log(url,body,LOG_REG,method,token)
    switch (method) {
        case "POST":
            try {
                if(LOG_REG == "LOGIN" || LOG_REG =="REG"){

                    const response = await axios.post(url,body);
                    if(response){
                        // console.log(response)
                        return response;
                    }
                }else {
                    const response = await axios.post(url,body,{
                        headers : {
                            authorization : `Bearer ${token}`
                        }
                    })
                    if(response.error == false){
                        return response;
                    }else {
                        console.log(response.message);
                    }
                }
            } catch (error) {
                console.log("Error occured : ",error.message)
            }
            break;
        case "GET":
            try {
                const response = await axios.get(url,{
                    headers : {
                        authorization : `Bearer ${token}`
                    }
                });
                if(response){
                    return response.data.data
                }
            } catch (error) {
                console.log("Error occured : ",error.message)
            }
            break;
        case "PUT":
            try{
                const response = await axios.put(url,body,{
                    headers : {
                        authorization : `Bearer ${token}`
                    }
                });
                if(response){
                    return response
                }
            } catch (error){
                console.log("Error occured : ",error.message);
            }
            break;
        case "DELETE":
            try {
                const response = await axios.put(url,{
                    headers : {
                        authorization : `Bearer ${token}`
                    }
                })
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