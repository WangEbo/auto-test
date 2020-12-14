import axios from 'axios'

const axiosIns = axios.create({
    baseURL: 'http://127.0.0.1:8087/',
    timeout: 10000
})

axiosIns.interceptors.response.use(
	response => {
        return  response.data
	},
	error => {
		console.log(error);
		return Promise.reject(error)
	}
)

export const getParamsKey = (type) =>{
    return !type || type==="get" || type==="GET"?'params':'data'
}

export const request = (config) => {
    let type=getParamsKey(config.type);
    let toData=config[type] || config.data || {};
    let requireObj={
        method: config.type,
        url: config.url,
        headers: config.headers,
    };
    requireObj[type]=toData;
    let promise$ = new Promise((resolve,reject)=>{
        axiosIns(requireObj).then((res)=>{
            resolve(res);
        }).catch(err=>reject(err));
    });
    return promise$;
}
