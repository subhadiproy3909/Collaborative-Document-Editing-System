import axios from "axios";

const fetchUserDocApi = function(owner){
    return new Promise( async (resolve, reject) => {
        const response = await axios.get(`api/document/fetch/${owner}`);
        
        if(response.status === 200){
            resolve(response.data);
        }
        else{
            reject(response.statusText);
        }
    })
}

const changeTitleApi = function(id, title) {
    return new Promise( async (resolve, reject) => {
        const config = {
            headers: {
                "Content-type": "application/json",
            }
        }

        const response = await axios.patch(`api/document/title`, {docId: id, title: title}, config);
        if(response.status === 200){
            resolve(response.data);
        }
        else{
            reject(response.statusText);
        }
    })
}

const openDocumentApi = function(id, user){
    return new Promise( async (resolve, reject) => {
        const config = {
            headers: {
                "Content-type": "application/json",
            }
        }

        const response = await axios.post(`api/document/open`, {docId: id, owner: user}, config);
        if(response.status === 200){
            resolve(response.data);
        }
        else{
            reject(response.statusText);
        }
    })
}

const saveDocumentApi = function({user, docId, data}){
    return new Promise( async (resolve, reject) => {
        const config = {
            headers: {
                "Content-type": "application/json",
            }
        }
        const response = await axios.put(`api/document/save`, { user, docId, data }, config);

        if(response.status === 200){
            resolve(response.data);
        }
        else{
            reject(response.statusText);
        }
    })
}

export {saveDocumentApi, openDocumentApi, fetchUserDocApi, changeTitleApi}