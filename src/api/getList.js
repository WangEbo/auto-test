import axios from 'axios'

export const getList = ()=>{
    return axios.get('/list')
}