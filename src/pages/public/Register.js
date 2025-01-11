import React, { memo, useCallback, useState } from 'react'
import { Button, InputField, Loading } from 'components'
import { Link } from 'react-router-dom'
import path from 'utils/path'
import icons from 'utils/icons'
import { apiRegister, apiEmailVerify } from 'apis'
import { showModal } from 'store/app/appSlice'
import Swal from 'sweetalert2'
import { validate } from 'utils/helpers'
import withBaseComponent from 'hocs/withBaseComponent'

const { FaFacebookF, FaGoogle } = icons

const Register = ({ dispatch, navigate }) => {
    const [payload, setPayload] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstname: '',
        lastname: '',
        mobile: ''
    })
    const [token, setToken] = useState('')
    const [isVerifiedEmail, setIsVerifiedEmail] = useState(false)
    const [invalidFields, setInvalidFields] = useState([])
    const handleSubmit = useCallback(async () => {
        const invalids = validate(payload, setInvalidFields)

        if (invalids === 0) {
            const { confirmPassword, ...payloadData } = payload
            dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }))
            const response = await apiRegister(payloadData)
            dispatch(showModal({ isShowModal: false, modalChildren: null }))
            if (response.success) {
                setIsVerifiedEmail(true)
            } else {
                setInvalidFields((prev) => [
                    ...prev,
                    { name: 'auth', mes: response.mes },
                ])
            }
        }
    }, [payload, dispatch])


    const emailVerify = async () => {
        const response = await apiEmailVerify(token)
        if (response.success) {
            Swal.fire('Đăng ký thành công', response.mes, 'success').then(() => {
                navigate(`/${path.LOGIN}`)
            })
        } else {
            Swal.fire('Lỗi!', response.mes, 'error')
        }
        setIsVerifiedEmail(false)
        setToken('')
    }

    return (
        <div className=' w-full flex justify-center items-center my-[100px]'>
            {isVerifiedEmail && <div className='absolute top-0 left-0 right-0 bottom-0 bg-overlay z-50 flex flex-col justify-center items-center'>
                <div className='bg-white w-[400px] flex flex-col gap-4 py-8 px-10'>
                    <h4 >Chúng tôi đã gửi mã về email của bạn. Hãy kiểm tra email và nhập code để hoàn tất đăng ký</h4>
                    <input type="text"
                        value={token}
                        onChange={e => setToken(e.target.value)}

                        className='px-4 py-2 border rounded-md outline-none'
                    />
                    {/* <OtpInput length={6} onOtpSubmit={onOtpSubmit} /> */}
                    <button type='button'
                        className='px-4 py-2 bg-blue-500 text-white hover:bg-blue-600'
                        onClick={emailVerify}
                    >
                        Xác nhận
                    </button>
                    <span className='cursor-pointer' onClick={() => setIsVerifiedEmail(false)}>Trở lại trang đăng ký</span>
                </div>
            </div>}
            <div className='flex flex-col items-center p-8 bg-white rounded-md min-w-[390px] shadow shadow-slate-400'>
                <h1 className='uppercase text-[24px] text-[#333] font-nomal'>đăng ký</h1>

                <InputField
                    placeholder='Họ'
                    value={payload.lastname}
                    setValue={setPayload}
                    nameKey='lastname'
                    invalidFields={invalidFields}
                    setInvalidFields={setInvalidFields}
                />
                <InputField
                    placeholder='Tên'
                    value={payload.firstname}
                    setValue={setPayload}
                    nameKey='firstname'
                    invalidFields={invalidFields}
                    setInvalidFields={setInvalidFields}
                />
                <InputField
                    placeholder='Email'
                    value={payload.email}
                    setValue={setPayload}
                    nameKey='email'
                    invalidFields={invalidFields}
                    setInvalidFields={setInvalidFields}
                />
                <InputField
                    placeholder='Số điện thoại'
                    value={payload.mobile}
                    setValue={setPayload}
                    nameKey='mobile'
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
                <InputField
                    type='password'
                    placeholder='Xác nhận mật khẩu'
                    value={payload.confirmPassword}
                    setValue={setPayload}
                    nameKey='confirmPassword'
                    invalidFields={invalidFields}
                    setInvalidFields={setInvalidFields}
                />
                <Button
                    name='Đăng ký'
                    handleOnClick={handleSubmit}
                    fw
                />
                {invalidFields?.some(el => el.name === 'auth') && (
                    <small className='text-red-600 italic w-full text-left'>
                        {invalidFields.find(el => el.name === 'auth')?.mes}
                    </small>
                )}
                <div className='flex items-center justify-between my-2 w-full text-sm'>
                    <Link className='hover:text-main cursor-pointer' to={`/${path.LOGIN}`}>Đăng nhập ngay</Link>
                </div>


                {/* <span className='text-sm flex text-center'>Hoặc đăng nhập bằng</span>
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

export default withBaseComponent(memo(Register))
