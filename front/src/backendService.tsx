import axios from "axios";

//First one for local development second one if you are deploying
//const apiBaseUrl = http://localhost:5057/api
const apiBaseUrl = 'https://yetizure-custom-backend-h2ame8fugcahc3ff.polandcentral-01.azurewebsites.net/api/';

export function get(endpoint: string): Promise<any> {
    return new Promise((resolve, reject) => {
        axios.get(apiBaseUrl+endpoint)
            .then(response => {
                console.log("get " + apiBaseUrl + endpoint)
                console.log(response.status);
                resolve(response.data);
            })
            .catch(error => {
                console.log(error);
                reject(error);
            });
    });
}