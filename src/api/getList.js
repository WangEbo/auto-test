import { request } from '../utils/request'

export const getList = ()=>{
    return request({
        method: 'get',
        url: '/list'
    })
}

// import axios from 'axios'

// export const getList = ()=>{
//     return axios.get('/list')
// }