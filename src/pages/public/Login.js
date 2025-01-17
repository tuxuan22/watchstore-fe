import React, { useState, useCallback, memo } from 'react'
import { InputField, Button, Loading } from 'components'
import path from 'utils/path'
import { Link, useSearchParams } from 'react-router-dom'
import { apiLogin, apiForgotPassword } from 'apis'
import Swal from 'sweetalert2'
import { login } from 'store/user/userSlice'
import { showModal } from 'store/app/appSlice'
import { toast } from 'react-toastify'
import icons from 'utils/icons'
import { validate } from 'utils/helpers'
import withBaseComponent from 'hocs/withBaseComponent'

const { FaFacebookF, FaGoogle } = icons


const Login = ({ dispatch, navigate }) => {


    // const location = useLocation()
    const [invalidFields, setInvalidFields] = useState([])
    const [payload, setPayload] = useState({
        email: '',
        password: '',
    })

    const [isForgotPassword, setIsForgotPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [searchParams] = useSearchParams()

    const handleForgotPassword = async () => {
        dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }))
        const response = await apiForgotPassword({ email })
        dispatch(showModal({ isShowModal: false, modalChildren: null }))

        if (response.success) {
            toast.success(response.mes)
            setIsForgotPassword(false)
        } else toast.error(response.mes)

    }
    const handleSubmit = useCallback(async () => {
        const invalids = validate(payload, setInvalidFields)
        const response = await apiLogin(payload)
        if (invalids === 0) {
            if (response.success) {
                setInvalidFields(true)
                dispatch(login({ isLoggedIn: true, token: response.accessToken, userData: response.userData }))
                searchParams.get('redirect') ? navigate(searchParams.get('redirect')) : navigate(`/${path.HOME}`)
            } else {
                setInvalidFields((prev) => [
                    ...prev,
                    { name: 'auth', mes: response.mes },
                ])
            }
        }
    }, [payload, dispatch, navigate])



    return (
        <div className='w-full flex justify-center items-center my-[100px]'>

            {isForgotPassword && <div
                onClick={() => setIsForgotPassword(false)}
                className='absolute inset-0 z-50 bg-overlay flex flex-col items-center py-8'>
                <div
                    onClick={e => e.stopPropagation()}
                    className='bg-white flex flex-col gap-2 w-[400px] py-8 px-10'>
                    <h1 className='text-center capitalize text-[#333] text-xl font-medium'>Quên mật khẩu</h1>
                    <label className='text-sm text-gray-500 my-2'>Nhập địa chỉ email đã đăng ký của bạn, chúng tôi sẽ gửi đường dẫn để đặt lại mật khẩu</label>
                    <label >Nhập địa chỉ email</label>
                    <input type="text" id='email' placeholder='Địa chỉ email'
                        className='px-4 py-2 border rounded-md outline-none'
                        value={email} onChange={e => setEmail(e.target.value)}
                    />

                    <div className='flex flex-col justify-center items-center'>
                        <Button name='Xác nhận' handleOnClick={handleForgotPassword} fw />

                        <span

                            onClick={() => setIsForgotPassword(false)}
                            className='px-4 py-2 text-semibold text-blue-600 hover:underline cursor-pointer'
                        >Quay lại</span>
                    </div>
                </div>

            </div>}

            <div className='flex flex-col items-center p-8 bg-white rounded-md min-w-[390px] shadow shadow-slate-400'>
                <h1 className='capitalize text-center text-[24px] text-[#333] font-medium'>đăng nhập</h1>

                <InputField
                    placeholder='Email'
                    value={payload.email}
                    setValue={setPayload}
                    nameKey='email'
                    invalidFields={invalidFields}
                    setInvalidFields={setInvalidFields}
                />
                <InputField
                    type='password'
                    placeholder='Mật khẩu'
                    value={payload.password}
                    setValue={setPayload}
                    nameKey='password'
                    invalidFields={invalidFields}
                    setInvalidFields={setInvalidFields}
                />


                <Button

                    name='Đăng nhập'
                    handleOnClick={handleSubmit}
                    fw
                />

                {invalidFields?.some(el => el.name === 'auth') && (
                    <small className='text-red-600 italic w-full text-left'>
                        {invalidFields.find(el => el.name === 'auth')?.mes}
                    </small>
                )}
                <div className='flex items-center justify-between my-2 w-full text-sm'>
                    <Link className='hover:text-main cursor-pointer' onClick={() => setIsForgotPassword(true)}>Quên mật khẩu</Link>
                    <Link className='hover:text-main cursor-pointer' to={`/${path.REGISTER}`}>Đăng ký tài khoản</Link>
                </div>
                {/* <span className='text-sm flex text-center mb-2'>Hoặc đăng nhập bằng</span>
                <div>
                    <Button
                        name='Facebook'
                        styles={'bg-[#4267b2] hover:bg-[#365899] text-white mx-1 w-[130px] py-2 px-4 inline-flex items-center'}
                        iconBefore={<FaFacebookF className='mr-3' />}
                    />
                    <Button
                        name='Google'
                        styles={'bg-[#E82E1E] hover:bg-[#D62516] text-white mx-1 w-[130px] py-2 px-4 inline-flex items-center'}
                        iconBefore={<FaGoogle className='mr-3' />}

                    />
                </div> */}
            </div>
        </div>
    )
}

export default withBaseComponent(memo(Login))
