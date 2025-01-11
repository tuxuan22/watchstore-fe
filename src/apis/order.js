import axios from '../axios'

export const apiDeleteOrder = (oid) => axios({
    url: '/order/' + oid,
    method: 'DELETE',

})

export const apiCreateOrder = (data) => axios({
    url: '/order/',
    method: 'POST',
    data

})

export const apiGetOrders = (params) => axios({
    url: '/order/admin/',
    method: 'GET',
    params
})

export const apiGetUserOrders = (params) => axios({
    url: '/order',
    method: 'GET',
    params
})

export const apiUpdateStatusOrder = (oid, data) => axios({
    url: '/order/status/admin/' + oid,
    method: 'PUT',
    data
})

export const apiUpdateStatusOrderUser = (oid, data) => axios({
    url: '/order/status/' + oid,
    method: 'PUT',
    data
})