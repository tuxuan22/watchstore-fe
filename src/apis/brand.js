import axios from '../axios'

export const apiCreateBrand = (data) => axios({
    url: '/brand/',
    method: 'POST',
    data
})

export const apiGetBrands = (params) => axios({
    url: '/brand/',
    method: 'GET',
    params
})

export const apiUpdateBrand = (data, brid) => axios({
    url: '/brand/' + brid,
    method: 'PUT',
    data
})

export const apiDeleteBrand = (brid) => axios({
    url: '/brand/' + brid,
    method: 'DELETE',

})