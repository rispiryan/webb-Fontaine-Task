import axios from "axios";

export function request(method, url, data) {
    return axios({
        method: method,
        url: url,
        data: data,
    })

}


