import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import path from 'utils/path'
import Swal from 'sweetalert2'
import withBaseComponent from 'hocs/withBaseComponent'

const EmailVerify = ({ navigate }) => {
    const { status } = useParams()
    useEffect(() => {
        if (status === 'success') {
            Swal.fire('Xác thực email thành công!', 'Bạn có thể đăng nhập', 'success').then(() => {
                navigate(`/${path.LOGIN}`)
            })
        } else if (status === 'failed') {
            Swal.fire('Lỗi xác thực!', 'Vui lòng kiểm tra lại email và thử lại', 'error').then(() => {
                navigate(`/${path.LOGIN}`)
            })
        }
    }, [status, navigate])
    return (
        <div className='h-screen w-screen bg-gray-100'>
        </div>
    )
}

export default withBaseComponent(EmailVerify)
