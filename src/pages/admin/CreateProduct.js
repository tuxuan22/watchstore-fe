import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { InputForm, Select, Button, MarkdownEditor, Loading } from 'components'
import { useSelector } from 'react-redux'
import { validate, getBase64 } from 'utils/helpers'
import { toast } from 'react-toastify'
import icons from 'utils/icons'
import { apiCreateProduct, apiGetBrands } from 'apis'
import { showModal } from 'store/app/appSlice'
import withBaseComponent from 'hocs/withBaseComponent'

const { RiDeleteBin2Fill } = icons


const CreateProduct = ({ dispatch }) => {
    const { categories } = useSelector(state => state.app)
    const { register, formState: { errors }, reset, handleSubmit, watch } = useForm()
    const [brands, setBrands] = useState([])

    // const fetchBrands = async () => {
    //     const response = await apiGetBrands({ limit: 50 })
    //     if (response.success)
    //         setBrands(response.brands)
    // }

    // useEffect(() => {
    //     fetchBrands()
    // }, [])

    const [hoverItem, setHoverItem] = useState(null)

    const [payload, setPayload] = useState({
        description: ''
    })

    const [preview, setPreview] = useState({
        thumb: null,
        images: []
    })

    // console.log(brands);


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
            imagesPreview.push({ name: file.name, path: base64 })
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
        handlePreviewThumb(watch('thumb')[0])
    }, [watch('thumb')])

    useEffect(() => {
        handlePreviewImages(watch('images'))

    }, [watch('images')])

    const handleCreateProduct = async (data) => {
        const invalids = validate(payload, setInvalidFields)
        if (invalids === 0) {
            if (data.category) data.category = categories?.find(el => el._id === data.category)?.title
            const finalPayload = { ...data, ...payload }
            const formData = new FormData()
            for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1])
            if (finalPayload.thumb) formData.append('thumb', finalPayload.thumb[0])
            if (finalPayload.images) {
                for (let image of finalPayload.images) formData.append('images', image)
            }
            dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }))
            const response = await apiCreateProduct(formData)
            dispatch(showModal({ isShowModal: false, modalChildren: null }))

            if (response.success) {
                toast.success(response.mes)
                reset()
                setPayload({
                    thumb: '',
                    images: [],

                })
            } else toast.error(response.mes)
        }
    }

    return (
        <div className='w-full'>
            <h1 className='flex justify-between items-center px-4 border-b h-[75px] text-[28px] font-semibold'>
                <span>Tạo sản phẩm</span>
            </h1>
            <div className='p-4'>
                <form
                    onSubmit={handleSubmit(handleCreateProduct)}
                >
                    <div className='w-full my-6 flex gap-4'>
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
                        <InputForm
                            label='Mã sản phẩm'
                            register={register}
                            errors={errors}
                            id='codecode'
                            validate={{
                                required: 'Vui lòng nhập mã sản phẩm',
                            }}
                            styles='flex-auto'
                            fullWidth
                            placeholder='Mã sản phẩm'
                        />
                    </div>
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
                            register={register}
                            errors={errors}
                            id='category'
                            options={categories?.map(el => ({ code: el._id, value: el.title }))}
                            fullWidth
                            validate={{ required: 'Hãy chọn danh mục' }}
                            styles='flex-auto'
                        />
                        <Select
                            label='Thương hiệu'
                            register={register}
                            errors={errors}
                            id='brand'
                            // options={brands?.map(el => ({ code: el._id, value: el.title }))}
                            options={categories?.find(el => el._id === watch('category'))?.brand?.map(el => ({ code: el, value: el }))}
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
                    />
                    <div className='flex flex-col gap-2 my-4'>
                        <label htmlFor='thumb'>Tải ảnh sản phẩm </label>
                        <input
                            type='file'
                            id='thumb'
                            {...register('thumb', { required: 'Hãy chọn ảnh sản phẩm' })}

                        />
                        {errors['thumb'] && <small className='text-xs text-red-600'>{errors['thumb']?.message}</small>}
                    </div>
                    {preview.thumb && <div className='my-4'>
                        <img src={preview.thumb} alt='thumbnail' className='border w-[200px] object-contain' />
                    </div>}
                    <div className='flex flex-col gap-2 my-4'>
                        <label htmlFor='products'>Tải danh sách ảnh sản phẩm</label>
                        <input
                            type='file'
                            id='products'
                            multiple
                            {...register('images', { required: 'Hãy chọn danh sách ảnh sản phẩm' })}
                        />
                        {errors['images'] && <small className='text-xs text-red-600'>{errors['images']?.message}</small>}
                    </div>
                    {preview.images.length > 0 && <div className='my-4 flex w-full gap-3 flex-wrap'>
                        {preview.images?.map((el, idx) => (
                            <div
                                key={idx}
                                className='w-fit relative'
                                onMouseEnter={() => setHoverItem(el.name)}
                                onMouseLeave={() => setHoverItem(null)}
                            >
                                <img src={el.path} alt='products' className='border w-[200px] object-contain' />
                                {hoverItem === el.name && <div className='absolute inset-0 bg-overlay flex justify-center items-center'>
                                    <RiDeleteBin2Fill
                                        size={30}
                                        color='white'
                                        className='cursor-pointer'
                                        onClick={() => handleRemoveImage(el.name)}
                                    />
                                </div>}
                            </div>
                        ))}
                    </div>}
                    <Button
                        type='submit'
                        name='Tạo sản phẩm'
                    />
                </form>
            </div>
        </div>
    )
}

export default withBaseComponent(CreateProduct)

