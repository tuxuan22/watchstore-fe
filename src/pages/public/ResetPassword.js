import React, { useState } from 'react'
import { Button, InputField, Loading } from 'components'
import { useParams } from 'react-router-dom'
import { apiResetPassword } from 'apis'
import { toast } from 'react-toastify'
import { validate } from 'utils/helpers'
import withBaseComponent from 'hocs/withBaseComponent'
import { showModal } from 'store/app/appSlice'
import path from 'utils/path'

const ResetPassword = ({ dispatch, navigate }) => {
    const { token } = useParams()
    const [payload, setPayload] = useState({
        password: '',
        confirmPassword: '',
    })

    const [invalidFields, setInvalidFields] = useState([])

    const handleResetPassword = async () => {
        const invalids = validate(payload, setInvalidFields)

        if (invalids === 0) {
            dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }))
            const response = await apiResetPassword({ password: payload.password, token })
            dispatch(showModal({ isShowModal: false, modalChildren: null }))

            if (response.success) {
                toast.success(response.mes)
                navigate(`/${path.LOGIN}`)

            } else {
                toast.error(response.mes)
            }
        }
    }

    return (
        <div className='absolute animate-slide-top top-0 left-0 bottom-0 right-0 z-50 bg-white flex flex-col items-center py-8'>
            <div className='bg-white flex flex-col gap-2 min-w-[390px]'>
                <h1 className=' text-center text-xl text-[#333] font-medium'>Đặt lại mật khẩu của bạn</h1>

                <InputField
                    type='password'
                    label='Mật khẩu'
                    placeholder='Mật khẩu'
                    value={payload.password}
                    setValue={setPayload}
                    nameKey='password'
                    invalidFields={invalidFields}
                    setInvalidFields={setInvalidFields}
                    fullWidth
                />

                <InputField
                    label='Xác nhận mật khẩu'
                    type='password'
                    placeholder='Xác nhận mật khẩu'
                    value={payload.confirmPassword}
                    setValue={setPayload}
                    nameKey='confirmPassword'
                    invalidFields={invalidFields}
                    setInvalidFields={setInvalidFields}
                />

                <Button name='Xác nhận' fw handleOnClick={handleResetPassword} />

            </div>

        </div>
    )
}

export default withBaseComponent(ResetPassword)
