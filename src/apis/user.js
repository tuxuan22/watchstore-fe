import axios from '../axios'

export const apiRegister = (data) => axios({
    url: '/user/register/',
    method: 'POST',
    data,
    withCredentials: true
})

export const apiEmailVerify = (token) => axios({
    url: '/user/email/verify/' + token,
    method: 'PUT',
})

export const apiLogin = (data) => axios({
    url: '/user/login/',
    method: 'POST',
    data
})

export const apiForgotPassword = (data) => axios({
    url: '/user/forgotpassword/',
    method: 'POST',
    data
})

export const apiResetPassword = (data) => axios({
    url: '/user/resetpassword/',
    method: 'PUT',
    data
})

export const apiGetCurrent = () => axios({
    url: '/user/current/',
    method: 'GET',
})

export const apiGetUsers = (params) => axios({
    url: '/user/',
    method: 'GET',
    params
})

export const apiUpdateUser = (data, uid) => axios({
    url: '/user/' + uid,
    method: 'PUT',
    data
})

export const apiDeleteUser = (uid) => axios({
    url: '/user/' + uid,
    method: 'DELETE',
})

export const apiUpdateCart = (data) => axios({
    url: '/user/cart/',
    method: 'PUT',
    data
})

export const apiRemoveCart = (pid, color) => axios({
    url: `/user/remove-cart/${pid}/${color}`,
    method: 'DELETE',
})