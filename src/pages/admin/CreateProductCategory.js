import { apiCreateProductCategory, apiGetBrands } from 'apis'
import { Button, InputForm, Loading } from 'components'
import withBaseComponent from 'hocs/withBaseComponent'
import React, { memo, useEffect } from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Select from 'react-select'
import { showModal } from 'store/app/appSlice'

const CreateProductCategory = ({ dispatch }) => {
    const { register, formState: { errors }, reset, handleSubmit, watch } = useForm()
    const [brands, setBrands] = useState([])
    const [selectedBrands, setSelectedBrands] = useState([])
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const fetchBrands = async () => {
        const response = await apiGetBrands()
        if (response.success) {
            setBrands(response.brands)
        }
    }

    useEffect(() => {
        fetchBrands()
    }, [])

    const handleCheckboxSelect = (brandTitle) => {
        setSelectedBrands((prevSelectedBrands) =>
            prevSelectedBrands.includes(brandTitle)
                ? prevSelectedBrands.filter((brand) => brand !== brandTitle)
                : [...prevSelectedBrands, brandTitle]
        );
    }


    const handleCreateProductCategory = async (data) => {

        const payload = { ...data }

        dispatch(showModal({ isShowModal: true, payload: <Loading /> }))
        const response = await apiCreateProductCategory(payload)
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
                <span>Tạo danh mục</span>
            </h1>
            <div className='p-4'>
                <form onSubmit={handleSubmit(handleCreateProductCategory)}>
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

                    <div className='mt-6 relative'>
                        <label htmlFor="brands" className='block font-semibold text-gray-700'>Chọn thương hiệu</label>
                        <div
                            className='w-1/3 mt-2 p-2 border rounded-md cursor-pointer'
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            {selectedBrands.join(',') || 'Chọn thương hiệu'}
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
                        name='Tạo danh mục sản phẩm'
                    />
                </form>
            </div>
        </div>
    )
}

export default withBaseComponent(memo(CreateProductCategory))
