import { apiUpdateProductCategory, apiGetBrands } from 'apis'
import { Button, InputForm, Loading } from 'components'
import withBaseComponent from 'hocs/withBaseComponent'
import React, { memo, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { showModal } from 'store/app/appSlice'

const UpdateProductCategory = ({ dispatch, editProductCategory, render, setEditProductCategory }) => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm()
    const [brands, setBrands] = useState([])
    const [selectedBrands, setSelectedBrands] = useState([])
    const [dropdownOpen, setDropdownOpen] = useState(false)

    useEffect(() => {
        reset({
            title: editProductCategory?.title || '',
        })
        setSelectedBrands(editProductCategory?.brand || [])
        fetchBrands()
    }, [editProductCategory, reset])

    const fetchBrands = async () => {
        const response = await apiGetBrands()
        if (response.success) {
            setBrands(response.brands)
        }
    }

    const handleCheckboxSelect = (brandTitle) => {
        setSelectedBrands((prevSelectedBrands) =>
            prevSelectedBrands.includes(brandTitle)
                ? prevSelectedBrands.filter((brand) => brand !== brandTitle)
                : [...prevSelectedBrands, brandTitle]
        )
    }

    const handleUpdateProductCategory = async (data) => {
        if (selectedBrands.length === 0) {
            toast.error('Vui lòng chọn ít nhất 1 thương hiệu')
            return
        }
        const payload = { ...data, brand: selectedBrands }

        dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }))
        const response = await apiUpdateProductCategory(payload, editProductCategory._id)
        dispatch(showModal({ isShowModal: false, modalChildren: null }))

        if (response.success) {
            toast.success(response.mes)
            render()
            setEditProductCategory(null)
        } else toast.error(response.mes)
    }

    return (
        <div className='w-full bg-bgc min-h-screen'>
            <h1 className='flex justify-between items-center px-4 border-b h-[75px] text-[28px] font-semibold'>
                <span>Sửa danh mục sản phẩm</span>
                <button
                    className='text-lg bg-blue-500 hover:bg-blue-400 text-white p-2'
                    onClick={() => setEditProductCategory(null)}
                >
                    Quay lại
                </button>
            </h1>
            <div className='p-4'>
                <form onSubmit={handleSubmit(handleUpdateProductCategory)}>
                    <InputForm
                        label='Tên danh mục'
                        register={register}
                        errors={errors}
                        id='title'
                        validate={{
                            required: 'Vui lòng nhập tên danh mục',
                        }}
                        styles='flex-auto'
                        fullWidth
                        placeholder='Tên danh mục'
                    />

                    <div className="mt-6 relative">
                        <label htmlFor="brands" className="block font-semibold text-gray-700">
                            Chọn thương hiệu:
                        </label>
                        <div
                            className="w-1/3 mt-2 p-2 border rounded-md cursor-pointer"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            {selectedBrands.join(', ') || 'Chọn thương hiệu'}
                        </div>

                        {dropdownOpen && (
                            <div className="absolute z-10 w-1/3 h-[200px] overflow-y-auto bg-white border rounded-md shadow-md mt-1">
                                {brands.map((brand) => (
                                    <div
                                        key={brand._id}
                                        className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => handleCheckboxSelect(brand.title)}
                                    >
                                        <input
                                            type="checkbox"
                                            id={`brand-${brand._id}`}
                                            value={brand.title}
                                            checked={selectedBrands.includes(brand.title)}
                                            onChange={() => handleCheckboxSelect(brand.title)}
                                            className="cursor-pointer"
                                        />
                                        <label
                                            htmlFor={`brand-${brand._id}`}
                                            className="cursor-pointer text-gray-700"
                                        >
                                            {brand.title}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <Button
                        type='submit'
                        name='Cập nhật danh mục'
                    />
                </form>
            </div>
        </div>
    )
}

export default withBaseComponent(memo(UpdateProductCategory))