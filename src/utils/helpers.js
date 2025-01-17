import icons from './icons'
import moment from 'moment'


require('moment/locale/vi')
moment.locale('vi')
const { MdOutlineStar, MdOutlineStarOutline } = icons

export const createSlug = string => string.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').split(' ').join('-')
export const formatMoney = number => Number(number.toFixed(1)).toLocaleString('vi', { style: 'currency', currency: 'VND' })
export const formatPrice = number => Math.round(number / 1000) * 1000
export const formatDate = date => moment(date)

export const renderStar = (number, size) => {
    if (!Number(number)) return
    const starts = []
    for (let i = 0; i < +number; i++) starts.push(<MdOutlineStar color='orange' size={size || 16} />)
    for (let i = 5; i > +number; i--)starts.push(<MdOutlineStarOutline color='orange' size={size || 16} />)
    return starts


}

export const validate = (payload, setInvalidFields) => {
    let invalids = 0
    const formatPayload = Object.entries(payload)
    for (let i of formatPayload) {
        if (i[1].trim() === '') {
            invalids++
            setInvalidFields(prev => [...prev, { name: i[0], mes: 'Hãy nhập vào trường này' }])
        }
    }
    for (let i of formatPayload) {
        switch (i[0]) {
            case 'email':
                const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                if (!i[1].match(regex)) {
                    invalids++
                    setInvalidFields(prev => [...prev, { name: i[0], mes: 'Địa chỉ email không hợp lệ' }])
                }
                break
            case 'password':
                if (i[1].length < 6) {
                    invalids++
                    setInvalidFields(prev => [...prev, { name: i[0], mes: 'Mật khẩu phải có ít nhất 6 ký tự' }])
                }
                break
            case 'confirmPassword':
                if (i[1].length < 6) {
                    invalids++
                    setInvalidFields(prev => [...prev, { name: i[0], mes: 'Mật khẩu phải có ít nhất 6 ký tự' }])
                }
                if (i[1] !== payload.password) {
                    invalids++
                    setInvalidFields(prev => [...prev, { name: i[0], mes: 'Mật khẩu không khớp' }])
                }
                break
            case 'mobile':
                const regexMobile = /^0[0-9]{9,10}$/
                if (!i[1].match(regexMobile)) {
                    invalids++
                    setInvalidFields(prev => [...prev, { name: i[0], mes: 'Số điện thoại không hợp lệ' }])
                }
                break

            default:
                break
        }
    }
    return invalids
}

export const generateRange = (start, end) => {
    const length = end + 1 - start
    return Array.from({ length }, (_, i) => i + start)
}

export function getBase64(file) {
    if (!file) return ''
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
    })
}