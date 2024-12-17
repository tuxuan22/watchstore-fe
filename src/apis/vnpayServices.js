import axios from 'axios'

export const createVNPayPayment = async (payload) => {
    try {
        const response = await axios.post('/api/v1/payment/vnpay', payload)
        return response.data // API trả về URL redirect của VNPay
    } catch (error) {
        console.error('VNPay payment error:', error)
        throw error
    }
}
