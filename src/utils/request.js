import axios from 'axios'
import { Message } from "element-ui";
import db from '../utils/sessionStorage'
import router from '../router'
import * as config from '../utils/config'

axios.interceptors.response.use(success => {
    if (success.status && success.status === 200 && success.data.status === 500) {
        Message.error({message: success.data.msg})
        return ;
    }
    if (success.data.msg) {
        if (success.data.code === 200) {
            Message.success({message: success.data.msg})
        } else {
            Message.warning({message: success.data.msg})
        }
    }
    return success.data
}, error => {
    if (error.response.status === 504 || error.response.status === 404) {
        Message.error({message: "服务器凉了"})
    } else if (error.response.status === 403) {
        Message.error({message: "权限不足"})
    } else if (error.response.status === 401) {
        if (db.get("LOGIN") === "0") {
            Message.error({message: "尚未登陆或登录状态已过期"})
            db.remove("LOGINS")
            db.save("LOGIN", "1")
        }
        router.replace("/").then(() => {
            Message.info({message: "返回主页"})
        })
    } else {
        if (error.response.data.msg) {
            Message.error({message: error.response.data.msg})
        } else {
            Message.error({message: "unknown error"})
        }
    }
})

let base = config.baseApi

export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params
    })
}

export const getRequest = (url, params) => {
    //Message.info({message: `${base}${url}`})
    return axios({
        method: 'get',
        url: `${base}${url}`,
        params: params
    })
}