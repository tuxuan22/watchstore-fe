import React, { useState } from 'react'
import { Button } from 'components'
import { useParams } from 'react-router-dom'
import { apiResetPassword } from 'apis/user'
import { toast } from 'react-toastify'

const ResetPassword = () => {
    const [password, setPassword] = useState('')
    const { token } = useParams()

    const handleResetPassword = async () => {
        const response = await apiResetPassword({ password, token })
        if (response.success) {
            toast.success(response.mes)
            window.close()
        } else toast.error(response.mes)
    }

    return (
        <div className='absolute animate-slide-top top-0 left-0 bottom-0 right-0 z-50 bg-white flex flex-col items-center py-8'>
            <div className='bg-white flex flex-col gap-4'>
                <label htmlFor="password">Nhập mật khẩu mới của bạn</label>
                <input type="text" id='password' placeholder='Mật khẩu'
                    className='w-[800px] p-4 border-b outline-none'
                    value={password} onChange={e => setPassword(e.target.value)}
                />
                <div className='flex justify-end items-center mt-4 w-full '>
                    <Button name='Xác nhận' handleOnClick={handleResetPassword} />

                </div>
            </div>

        </div>
    )
}

export default ResetPassword
