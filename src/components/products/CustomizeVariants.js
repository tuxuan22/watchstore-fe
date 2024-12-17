import { apiAddVariant } from 'apis'
import Button from 'components/buttons/Button'
import Loading from 'components/common/Loading'
import InputForm from 'components/inputs/InputForm'
import withBaseComponent from 'hocs/withBaseComponent'
import React, { memo, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { showModal } from 'store/app/appSlice'
import Swal from 'sweetalert2'
import { getBase64, validate } from 'utils/helpers'

const CustomizeVariants = ({ render, customizeVariant, setCustomizeVariant, dispatch }) => {
    const { categories } = useSelector(state => state.app)

    const [preview, setPreview] = useState({
        thumb: '',
        images: '',
    })

    const { register, formState: { errors }, handleSubmit, reset, watch } = useForm()


    useEffect(() => {
        reset({
            title: customizeVariant?.title,
            price: customizeVariant?.price,
            color: customizeVariant?.color,
        })
    }, [customizeVariant])


    const handleAddVariant = async (data) => {

        if (data.color === customizeVariant.color)
            Swal.fire('Lỗi!', 'Không thể đổi màu', 'info')
        else {
            const formData = new FormData()
            for (let i of Object.entries(data)) formData.append(i[0], i[1])
            if (data.thumb) formData.append('thumb', data.thumb[0])
            if (data.images) {
                for (let image of data.images) formData.append('images', image)
            }
            // dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }))
            const response = await apiAddVariant(formData, customizeVariant._id)
            // dispatch(showModal({ isShowModal: false, modalChildren: null }))
            if (response.success) {
                toast.success(response.mes)
                render()
                setPreview({ thumb: '', images: [] })
            } else toast.error(response.mes)
        }
    }
    const handlePreviewThumb = async (file) => {
        const base64Thumb = await getBase64(file)
        setPreview(prev => ({ ...prev, thumb: base64Thumb }))
    }

    const handlePreviewImages = async (files) => {
        const imagesPreview = []
        for (let file of files) {
            if (file.type !== 'image/png' && file.type !== 'image/jpeg' && file.type !== 'image/webp') {
                toast.warning('Không hỗ trợ tệp này')
                return
            }
            const base64 = await getBase64(file)
            imagesPreview.push(base64)
        }
        setPreview(prev => ({ ...prev, images: imagesPreview }))

    }

    useEffect(() => {
        if (watch('thumb') instanceof FileList && watch('thumb').length > 0) handlePreviewThumb(watch('thumb')[0])
    }, [watch('thumb')])

    useEffect(() => {
        if (watch('images') instanceof FileList && watch('images').length > 0) handlePreviewImages(watch('images'))
    }, [watch('images')])
    return (
        <div className='w-full'>
            <h1 className='flex justify-between items-center px-4 border-b h-[75px] text-[28px] font-semibold'>
                <span>Thêm biến thể sản phẩm</span>
                <button className='text-lg bg-blue-500 hover:bg-blue-400 text-white p-2 ' onClick={() => setCustomizeVariant(null)}>Quay lại</button>
            </h1>
            <div className='p-4'>
                <form className='w-full flex flex-col gap-4'
                    onSubmit={handleSubmit(handleAddVariant)}
                >
                    <div className='flex gap-4 items-center'>
                        <InputForm
                            label='Tên sản phẩm'
                            register={register}
                            errors={errors}
                            id='title'
                            styles=' flex-auto'
                            fullWidth
                        // disabled={true}
                        />

                    </div>
                    <div className='flex gap-4 items-center'>
                        <InputForm
                            label='Giá sản phẩm'
                            register={register}
                            errors={errors}
                            id='price'
                            validate={{
                                required: 'Vui lòng nhập giá sản phẩm',
                            }}
                            styles='flex-auto'
                            fullWidth
                            placeholder='Giá sản phẩm'
                            type='number'
                        />
                        <InputForm
                            label='Màu'
                            register={register}
                            errors={errors}
                            id='color'
                            validate={{
                                required: 'Vui lòng nhập màu sản phẩm',
                            }}
                            styles='flex-auto'
                            fullWidth
                            placeholder='Màu'
                        />
                    </div>
                    <div className='flex flex-col gap-2 my-4'>
                        <label htmlFor='thumb'>Tải ảnh chính sản phẩm </label>
                        <input
                            type='file'
                            id='thumb'
                            {...register('thumb', { required: 'Hãy chọn ảnh chính sản phẩm' })}

                        />
                        {errors['thumb'] && <small className='text-xs text-red-600'>{errors['thumb']?.message}</small>}
                    </div>
                    {preview.thumb && <div className='my-4'>
                        <img src={preview.thumb} alt='thumbnail' className='border w-[200px] object-contain' />
                    </div>}
                    <div className='flex flex-col gap-2 my-4'>
                        <label htmlFor='products'>Tải ảnh sản phẩm</label>
                        <input
                            type='file'
                            id='products'
                            multiple
                            {...register('images', { required: 'Hãy chọn ảnh sản phẩm' })}
                        />
                        {errors['images'] && <small className='text-xs text-red-600'>{errors['images']?.message}</small>}
                    </div>
                    {preview.images.length > 0 && <div className='my-4 flex w-full gap-3 flex-wrap'>
                        {preview.images?.map((el, idx) => (
                            <div
                                className='w-fit relative'
                                key={idx}
                            // onMouseEnter={() => setHoverItem(el.name)}
                            // onMouseLeave={() => setHoverItem(null)}
                            >
                                <img src={el} alt='products' className='border w-[200px] object-contain' />
                                {/* {hoverItem === el.name && <div className='absolute inset-0 bg-overlay flex justify-center items-center'>
                                        <RiDeleteBin2Fill
                                            size={30}
                                            color='white'
                                            className='cursor-pointer'
                                        />
                                    </div>}                         */}
                            </div>
                        ))}
                    </div>}
                    <Button
                        type='submit'
                        name='Thêm biến thể'
                    />
                </form>
            </div>
        </div>
    )
}

export default withBaseComponent(memo(CustomizeVariants))
