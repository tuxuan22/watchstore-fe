import axios from '../axios'

export const apiGetProducts = (params) => axios({
    url: '/product/',
    method: 'get',
    params
})

export const apiGetProduct = (pid) => axios({
    url: '/product/' + pid,
    method: 'get',
})

export const apiCreateProduct = (data) => axios({
    url: '/product/',
    method: 'POST',
    data
})

export const apiUpdateProduct = (data, pid) => axios({
    url: '/product/' + pid,
    method: 'PUT',
    data
})

export const apiDeleteProduct = (pid) => axios({
    url: '/product/' + pid,
    method: 'DELETE',

})


export const apiAddVariant = (data, pid) => axios({
    url: '/product/' + pid,
    method: 'PUT',
    data

})

export const apiGetUserRatings = () => axios({
    url: '/product/ratingUser',
    method: 'GET',
})

export const apiRatings = (data) => axios({
    url: '/product/ratings',
    method: 'PUT',
    data
})



