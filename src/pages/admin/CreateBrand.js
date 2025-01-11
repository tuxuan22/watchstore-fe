import { apiCreateBrand } from 'apis'
import { Button, InputForm, Loading } from 'components'
import withBaseComponent from 'hocs/withBaseComponent'
import React, { memo } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { showModal } from 'store/app/appSlice'

const CreateBrand = ({ dispatch }) => {
    const { register, formState: { errors }, reset, handleSubmit, watch } = useForm()

    const handleCreateBrand = async (data) => {
        dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }))
        const response = await apiCreateBrand(data)
        dispatch(showModal({ isShowModal: false, modalChildren: null }))

        if (response.success) {
            toast.success(response.mes)
            reset()
        }
        else toast.error(response.mes)

    }
    return (
        <div className='w-full'>
            <h1 className='flex justify-between items-center px-4 border-b h-[75px] text-[28px] font-semibold'>
                <span>Tạo thương hiệu</span>
            </h1>
            <div className='p-4'>
                <form onSubmit={handleSubmit(handleCreateBrand)}>
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
                        name='Tạo thương hiệu'
                    />
                </form>
            </div>
        </div>
    )
}

export default withBaseComponent(memo(CreateBrand))
