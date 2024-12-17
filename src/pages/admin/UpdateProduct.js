import { apiUpdateProduct } from 'apis'
import { Button, InputForm, Loading, MarkdownEditor, Select } from 'components'
import withBaseComponent from 'hocs/withBaseComponent'
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { showModal } from 'store/app/appSlice'
import { getBase64, validate } from 'utils/helpers'
// import icons from 'utils/icons'

// const { RiDeleteBin2Fill } = icons


const UpdateProduct = ({ editProduct, render, setEditProduct, dispatch }) => {
    const { categories } = useSelector(state => state.app)
    const { register, formState: { errors }, handleSubmit, reset, watch } = useForm()

    const [payload, setPayload] = useState({
        description: ''
    })

    const [preview, setPreview] = useState({
        thumb: null,
        images: []
    })

    useEffect(() => {
        reset({
            title: editProduct?.title || '',
            price: editProduct?.price || '',
            quantity: editProduct?.quantity || 0,
            color: editProduct?.color || '',
            category: editProduct?.category || '',
            brand: editProduct?.brand || '',

        })
        setPayload({ description: typeof editProduct?.description === 'object' ? editProduct?.description?.join(', ') : editProduct?.description });
        setPreview({
            thumb: editProduct?.thumb || '',
            images: editProduct?.images || []
        })


    }, [editProduct, reset])

    const [invalidFields, setInvalidFields] = useState([])

    const changeValue = useCallback((e) => {
        setPayload(e)
    }, [payload])



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

    const handleRemoveImage = (name) => {
        const files = [...watch('images')]
        reset({
            images: files?.filter(el => el.name !== name)
        })
        if (preview?.images?.some(el => el.name === name)) setPreview(prev => ({ ...prev, images: prev.images?.filter(el => el.name !== name) }))
    }

    useEffect(() => {
        if (watch('thumb') instanceof FileList && watch('thumb').length > 0) handlePreviewThumb(watch('thumb')[0])
    }, [watch('thumb')])

    useEffect(() => {
        if (watch('images') instanceof FileList && watch('images').length > 0) handlePreviewImages(watch('images'))
    }, [watch('images')])

    const handleUpdateProduct = async (data) => {
        const invalids = validate(payload, setInvalidFields)
        if (invalids === 0) {
            if (data.category) data.category = categories?.find(el => el.title === data.category)?.title
            const finalPayload = { ...data, ...payload }
            finalPayload.thumb = data?.thumb?.length === 0 ? preview.thumb : data.thumb[0]

            const formData = new FormData()
            for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1])

            finalPayload.images = data?.images?.length === 0 ? preview.images : data.images
            for (let image of finalPayload.images) formData.append('images', image)

            dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }))
            const response = await apiUpdateProduct(formData, editProduct._id)
            // dispatch(showModal({ isShowModal: false, modalChildren: null }))

            if (response.success) {
                toast.success(response.mes)
                render()
                setEditProduct(null)
            } else toast.error(response.mes)
        }
    }


    return (
        <div className='w-full'>
            <h1 className='flex justify-between items-center px-4 border-b h-[75px] text-[28px] font-semibold'>
                <span>Sửa sản phẩm</span>
                <button className='text-lg bg-blue-500 hover:bg-blue-400 text-white p-2 ' onClick={() => setEditProduct(null)}>Quay lại</button>
            </h1>
            <div className='p-4'>
                <form
                    onSubmit={handleSubmit(handleUpdateProduct)}
                >
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
                    <div className='w-full my-6 flex gap-4'>
                        <InputForm
                            label='Giá sản phẩm'
                            register={register}
                            errors={errors}
                            id='price'
                            validate={{
                                required: 'Vui lòng nhập giá sản phẩm',
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: 'Giá phải là số nguyên',
                                },
                            }}
                            styles='flex-auto'
                            fullWidth
                            placeholder='Giá sản phẩm'
                            type='number'
                        />
                        <InputForm
                            label='Số lượng sản phẩm'
                            register={register}
                            errors={errors}
                            id='quantity'
                            validate={{
                                required: 'Vui lòng nhập số lượng sản phẩm',

                            }}
                            styles='flex-auto'
                            fullWidth
                            placeholder='Số lượng sản phẩm'
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
                            type='text'
                        />
                    </div>
                    <div className='w-full my-6 flex gap-4'>
                        <Select
                            label='Danh mục'
                            options={categories?.map(el => ({ code: el.title, value: el.title }))}
                            register={register}
                            errors={errors}
                            id='category'
                            fullWidth
                            validate={{ required: 'Hãy chọn danh mục' }}
                            styles='flex-auto'
                        />
                        <Select
                            label='Thương hiệu'
                            options={categories?.find(el => el.title === watch('category'))?.brand?.map(el => ({ code: el, value: el }))}
                            register={register}
                            errors={errors}
                            id='brand'
                            fullWidth
                            validate={{ required: 'Hãy chọn thương hiệu' }}
                            styles='flex-auto'
                        />
                    </div>
                    <MarkdownEditor
                        name='description'
                        changeValue={changeValue}
                        label='Mô tả sản phẩm'
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                        value={payload.description}
                    />
                    <div className='flex flex-col gap-2 my-4'>
                        <label htmlFor='thumb'>Tải ảnh chính sản phẩm </label>
                        <input
                            type='file'
                            id='thumb'
                            {...register('thumb')}

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
                            {...register('images')}
                        />
                        {errors['images'] && <small className='text-xs text-red-600'>{errors['images']?.message}</small>}
                    </div>
                    {preview.images.length > 0 && <div className='my-4 flex w-full gap-3 flex-wrap'>
                        {preview.images?.map((el, idx) => (
                            <div
                                className='w-fit relative'
                                key={idx}
                            >
                                <img src={el} alt='products' className='border w-[200px] object-contain' />
                            </div>
                        ))}
                    </div>}
                    <Button
                        type='submit'
                        name='Cập nhật sản phẩm'
                    />
                </form>
            </div>
        </div>
    )
}

export default withBaseComponent(UpdateProduct)
