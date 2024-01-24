import axios from "axios";


const checkAuthApi = function () {
    return new Promise(async (resolve, reject) => {
        const response = await axios.get(`api/user/auth`);

        if (response.status === 200) {
            resolve(response.data);
        }
        else{
            reject(response.statusText);
        }
    })
}

const signupApi = function(username, email, password){
    return new Promise( async (resolve, reject) => {

        const config = {
            headers: {
                "Content-type": "application/json",
            }
        }
        const response = await axios.post(`api/user/signup`, {username, email, password}, config);

        if( response.status === 200 ){
            resolve(response.data);
        }
        else{
            reject(response.statusText);
        }
    })
}

const loginApi = function(email, password){
    return new Promise( async (resolve, reject) => {
        const config = {
            headers: {
                "Content-type": "application/json",
            }
        }
        const response = await axios.post(`api/user/login`, { email, password}, config);

        if(response.status === 200){
            resolve(response.data);
        }
        else{
            reject(response.statusText);
        }
    })
}


export {checkAuthApi, signupApi, loginApi};