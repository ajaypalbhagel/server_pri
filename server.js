const axios = require('axios');
const utils = require('./utils')

var servers = [
    { url: "http://doesNotExist.boldtech.co", priority: 1 },
    { url: "http://boldtech.co", priority: 7 },
    { url: "http://offline.boldtech.co", priority: 2 },
    { url: "http://google.com", priority: 4 }
];

// Test to check the findServer function
var successUrl = []
findServer(servers, successUrl).then(
    function (serverResult) { console.log(serverResult); },
    function (error) { console.error(error); }
)

async function findServer(urlObj, successUrl) {
    await Promise.allSettled(urlObj.map(server => {
        return axios.get(server.url, { timeout: 5000 })
            .then((response) => {
                let status = response.status;
                console.log(status)
                if (status >= 200 && status <= 299) {
                    successUrl.push(server); //push the online url to list
                }
            })
            .catch((error) => {
            })
    }))
    return new Promise(function (resolve, reject) {
        if (successUrl.length > 0) {
            resolve(successUrl.sort(utils.compare)[0])  //resolve the sorted online url
        }
        else {
            reject("All servers are offline")  //reject since all servers are offline
        }
    })
}
