import { apiDeleteBrand, apiGetBrands } from 'apis'
import { InputForm, Pagination } from 'components'
import React, { useCallback, useState } from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import icons from 'utils/icons'
import UpdateBrand from './UpdateBrand'

const { BiEdit, RiDeleteBin6Line } = icons

const ManageBrand = () => {
    const { register, formState: { errors }, handleSubmit, reset, watch } = useForm()
    const [brands, setBrands] = useState(null)
    const [params] = useSearchParams()
    const [update, setUpdate] = useState(false)
    const [editBrand, setEditBrand] = useState(null)


    const fetchBrands = async (params) => {
        const response = await apiGetBrands({ ...params, limit: 5 })
        if (response.success) setBrands(response)


    }

    const render = useCallback(() => {
        setUpdate(!update)
    }, [update])

    useEffect(() => {
        const searchParams = Object.fromEntries([...params])
        fetchBrands(searchParams)
    }, [params])


    const handleDeleteBrand = (brid) => {
        Swal.fire({
            title: 'Xác nhận xóa?',
            text: 'Bạn có chắc chắn muốn xóa đon hàng này?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Hủy',
            confirmButtonText: 'Xóa'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await apiDeleteBrand(brid)
                if (response.success) {
                    toast.success(response.mes)
                    fetchBrands(params)
                    render()
                } else toast.error(response.mes)
            }
        })
    }

    return (
        <div className='w-full relative'>
            {editBrand && <div className='absolute inset-0 z-50'>
                <UpdateBrand
                    editBrand={editBrand}
                    render={render}
                    setEditBrand={setEditBrand}
                />
            </div>}
            <h1 className='flex justify-between items-center px-4 border-b h-[75px] text-[28px] font-semibold'>
                <span>Quản lý thương hiệu</span>
            </h1>
            <div className='w-full p-4'>
                <div className='flex justify-end py-4' >
                    <form className='w-full'>
                        <InputForm
                            id='q'
                            register={register}
                            errors={errors}
                            placeholder='Tìm kiếm theo tên sản phẩm,...'
                            fullWidth
                            className={'w-[500px] bg-white border border-gray-200'}
                        />
                    </form>
                </div>
                <form className='overflow-x-auto'>
                    <table className='min-w-full table-auto mb-6 text-left'>
                        <thead className='font-bold bg-gray-200 text-[13px]'>
                            <tr>
                                <th className='px-4 py-2'>#</th>
                                <th className='px-4 py-2'>Tên thương hiệu</th>

                                <th className='px-4 py-2 w-[120px]'>Hành động</th>
                            </tr>

                        </thead>
                        <tbody>
                            {brands?.brands?.map((el, idx) => (
                                <tr key={el._id} className='border border-gray-200'>
                                    <td className='py-2 px-4 '>{((+params.get('page') > 1 ? +params.get('page') - 1 : 0) * 5) + 1 + idx}</td>
                                    <td className='py-2 px-4 '>

                                        <span>{el.title}</span>

                                    </td>

                                    <td className='flex justify-between py-2 px-4'>

                                        <span
                                            onClick={() => setEditBrand(el)}
                                            className={'cursor-pointer  py-3 text-yellow-500 hover:text-yellow-400 '}
                                        ><BiEdit size={20} /></span>
                                        <span
                                            onClick={() => handleDeleteBrand(el._id)}
                                            className={'cursor-pointer py-3  text-red-600 hover:text-red-500'}
                                        ><RiDeleteBin6Line size={20} /></span>

                                    </td>
                                </tr>

                            ))}
                        </tbody>

                    </table>
                </form>
            </div>
            <div className='flex justify-center'>
                <Pagination
                    totalCount={brands?.counts}
                />
            </div>
        </div>
    )
}

export default ManageBrand
