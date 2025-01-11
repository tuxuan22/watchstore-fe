import { apiUpdateBrand } from 'apis'
import { Button, InputForm, Loading } from 'components'
import withBaseComponent from 'hocs/withBaseComponent'
import React, { memo, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { showModal } from 'store/app/appSlice'

const UpdateBrand = ({ dispatch, editBrand, render, setEditBrand }) => {
    const { register, formState: { errors }, handleSubmit, reset, watch } = useForm()

    useEffect(() => {
        reset({
            title: editBrand?.title || '',
        })


    }, [editBrand, reset])

    const handleUpdateBrand = async (data) => {
        dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }))
        const response = await apiUpdateBrand(data, editBrand._id)
        dispatch(showModal({ isShowModal: false, modalChildren: null }))

        if (response.success) {
            toast.success(response.mes)
            render()
            setEditBrand(null)
        } else toast.error(response.mes)

    }


    return (
        <div className='w-full bg-bgc min-h-screen'>
            <h1 className='flex justify-between items-center px-4 border-b h-[75px] text-[28px] font-semibold'>
                <span>Sửa thương hiệu</span>
                <button className='text-lg bg-blue-500 hover:bg-blue-400 text-white p-2 ' onClick={() => setEditBrand(null)}>Quay lại</button>
            </h1>
            <div className='p-4'>
                <form
                    onSubmit={handleSubmit(handleUpdateBrand)}
                >
                    <InputForm
                        label='Tên thương hiệu'
                        register={register}
                        errors={errors}
                        id='title'
                        validate={{
                            required: 'Vui lòng nhập tên thương hiệu',
                        }}
                        styles='flex-auto'
                        fullWidth
                        placeholder='Tên thương hiệu'
                    />

                    <Button
                        type='submit'
                        name='Cập nhật thương hiệu'
                    />
                </form>
            </div>
        </div>
    )
}

export default withBaseComponent(memo(UpdateBrand))
