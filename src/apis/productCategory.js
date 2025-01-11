import axios from '../axios'

export const apiCreateProductCategory = (data) => axios({
    url: '/product-category/',
    method: 'POST',
    data
})

export const apiGetProductCategories = (params) => axios({
    url: '/product-category/',
    method: 'GET',
    params
})

export const apiDeleteProductCategory = (pcid) => axios({
    url: '/product-category/' + pcid,
    method: 'DELETE',

})

export const apiUpdateProductCategory = (data, pcid) => axios({
    url: '/product-category/' + pcid,
    method: 'PUT',
    data
})