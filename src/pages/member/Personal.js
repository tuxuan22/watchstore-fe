import { Button, InputForm, Loading } from 'components'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import avatar from 'assets/avatar.png'
import { apiUpdateCurrent } from 'apis'
import withBaseComponent from 'hocs/withBaseComponent'
import { getCurrent } from 'store/user/asyncActions'
import { toast } from 'react-toastify'
import { showModal } from 'store/app/appSlice'
import { useSearchParams } from 'react-router-dom'
const Personal = ({ dispatch, navigate }) => {
    const { register, formState: { errors, isDirty }, handleSubmit, reset } = useForm()
    const { current } = useSelector(state => state.user)

    const [searchParams] = useSearchParams()
    useEffect(() => {
        reset({
            firstname: current?.firstname,
            lastname: current?.lastname,
            email: current?.email,
            mobile: current?.mobile,
            avatar: current?.avatar,
            address: current?.address,
        })
    }, [])

    const handleUpdate = async (data) => {
        const formData = new FormData()
        if (data.avatar.length > 0) formData.append('avatar', data.avatar[0])
        delete data.avatar
        for (let i of Object.entries(data)) formData.append(i[0], i[1])
        dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }))
        const response = await apiUpdateCurrent(formData)
        dispatch(showModal({ isShowModal: false, modalChildren: null }))

        if (response.success) {
            dispatch(getCurrent())
            toast.success(response.mes)
            if (searchParams.get('redirect')) navigate(searchParams.get('redirect'))
        } else toast.error(response.mes)
    }

    return (
        <div className='w-full bg-bgc my-8'>
            <header className='text-2xl font-semibold p-4 border-b '>
                Tài khoản
            </header>
            <form onSubmit={handleSubmit(handleUpdate)} className='bg-white m-8 p-8 flex flex-col gap-4'>
                <div>
                    <label htmlFor="file">
                        <img src={current?.avatar || avatar} alt="avatar" className='w-28 h-28 object-cover rounded-full' />
                    </label>
                    <input type="file" id='file' hidden {...register('avatar')} />
                </div>
                <div className='flex gap-4'>
                    <InputForm
                        label='Tên'
                        register={register}
                        errors={errors}
                        id='firstname'
                        validate={{
                            required: 'Vui lòng nhập tên',
                        }}
                        styles='flex-1'
                        fullWidth
                        placeholder='Tên'
                    />
                    <InputForm
                        label='Họ'
                        register={register}
                        errors={errors}
                        id='lastname'
                        validate={{
                            required: 'Vui lòng nhập họ',
                        }}
                        styles='flex-1'
                        fullWidth
                        placeholder='Họ'
                    />
                </div>
                <div className='flex gap-4'>
                    <InputForm
                        label='Email'
                        register={register}
                        errors={errors}
                        id='email'
                        validate={{
                            required: 'Vui lòng nhập email',
                            pattern: {
                                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                message: "Email không hợp lệ"
                            }
                        }}
                        styles='flex-1'
                        fullWidth
                        placeholder='Email'
                    />
                    <InputForm
                        label='Số điện thoại'
                        register={register}
                        errors={errors}
                        id='mobile'
                        validate={{
                            required: 'Vui lòng nhập số điện thoại',
                            pattern: {
                                value: /^0[0-9]{9,10}$/,
                                message: "Số điện thoại không hợp lệ"
                            }
                        }}
                        styles='flex-1'
                        fullWidth
                        placeholder='Số điện thoại'
                    />
                </div>
                <InputForm
                    label='Địa chỉ'
                    register={register}
                    errors={errors}
                    id='address'
                    validate={{
                        required: 'Vui lòng nhập địa chỉ',

                    }}
                    styles='flex-1'
                    fullWidth
                    placeholder='Địa chỉ'
                />
                <div className='w-full flex justify-end'>
                    <Button type='submit' name='Lưu thay đổi' />
                </div>
            </form>
        </div>
    )
}

export default withBaseComponent(Personal)
