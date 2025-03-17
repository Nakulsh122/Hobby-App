import axios from 'axios';

const callAPI =async (url,method,body = {},LOG_REG = "",token="")=>{
    switch (method) {
        case "POST":
            try {
                if(LOG_REG == "Login" || LOG_REG =="Reg"){

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
                    if(response){
                        return response
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
                        authoriztion : `Bearer ${token}`
                    }
                });
                if(response.len >0){
                    return response
                }
            } catch (error) {
                console.log("Error occured : ",error.message)
            }
            break;
        case "PUT":
            try{
                const response = await axios.put(url,body,{
                    headers : {
                        authoriztion : `Bearer ${token}`
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
                        authoriztion : `Bearer ${token}`
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