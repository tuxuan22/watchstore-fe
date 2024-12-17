import { InputForm } from 'components'
import React from 'react'
import { useForm } from 'react-hook-form'

const Personal = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm()
    return (
        <div className='w-full'>
            <header className='text-2xl font-semibold p-4 border-b '>
                Personal
            </header>
            <div className='w-4/5 mx-auto py-8'>
                <InputForm
                    label='Tên sản phẩm'
                    register={register}
                    errors={errors}
                    id='title'
                    validate={{
                        required: 'Vui lòng nhập tên sản phẩm',
                    }}
                    styles='flex-auto'
                    fullWidth
                    placeholder='Tên sản phẩm'
                />
            </div>
        </div>
    )
}

export default Personal
