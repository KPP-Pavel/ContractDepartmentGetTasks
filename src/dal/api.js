import * as axios from "axios"

//const URL='http://localhost'
//const URL='http://webdo.gk.rosatom.local/reportserver/'

export function myAxios(data = {}, method = 'POST') {
    return (
        axios({
            withCredentials: true,
            method: method,
            url: '/reportserver/',
            data: data
        }).then(response => response.data)
    )
}