import { apiDeleteOrder, apiGetOrders, apiUpdateStatusOrder } from 'apis'
import { DetailOrder, InputForm, Pagination } from 'components'
import withBaseComponent from 'hocs/withBaseComponent'
import moment from 'moment'
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { showModal } from 'store/app/appSlice'
import Swal from 'sweetalert2'
import { formatMoney } from 'utils/helpers'
import icons from 'utils/icons'

const { BiEdit, RiDeleteBin6Line, MdContentPasteSearch } = icons

const ManageOrder = ({ dispatch }) => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm()
    const [orders, setOrders] = useState(null)
    const [update, setUpdate] = useState(false)
    const [params] = useSearchParams()

    const handleUpdateStatus = async (oid, status) => {
        Swal.fire({
            title: 'Xác nhận',
            text: 'Bạn có chắc muốn cập nhật trạng thái đơn hàng?',
            showCancelButton: true,
            confirmButtonText: 'Đồng ý',
            cancelButtonText: 'Hủy'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await apiUpdateStatusOrder(oid, { status })
                if (response.success) {
                    Swal.fire('Thành công', 'Đã cập nhật trạng thái đơn hàng', 'success')
                    fetchOrders(params)
                } else {
                    Swal.fire('Thất bại', 'Không thể cập nhật trạng thái', 'error')
                }
            }
        })
    }

    const statusOptions = [
        {
            label: 'Đã hủy',
            value: 'Cancelled'
        },
        {
            label: 'Đang xử lý',
            value: 'Processing'
        },
        {
            label: 'Thành công',
            value: 'Succeed'
        }
    ]

    const fetchOrders = async (params) => {
        const response = await apiGetOrders({ ...params, limit: 5 })
        if (response.success) setOrders(response)


    }

    const render = useCallback(() => {
        setUpdate(!update)
    }, [update])

    useEffect(() => {
        const searchParams = Object.fromEntries([...params])
        fetchOrders(searchParams)
    }, [params])


    const handleDeleteOrder = (oid) => {
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
                const response = await apiDeleteOrder(oid)
                if (response.success) {
                    toast.success(response.mes)
                    fetchOrders(params)
                    render()
                } else toast.error(response.mes)
            }
        })
    }

    return (
        <div className='w-full relative'>
            <h1 className='flex justify-between items-center px-4 border-b h-[75px] text-[28px] font-semibold'>
                <span>Quản lý đơn hàng</span>
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
                                <th className='px-4 py-2'>Khách hàng</th>
                                <th className='px-4 py-2'>Mã đơn hàng</th>
                                <th className='px-4 py-2'>Trạng thái</th>
                                <th className='px-4 py-2'>Ngày tạo</th>
                                <th className='px-4 py-2'>Tổng tiền</th>
                                <th className='px-4 py-2 w-[120px]'>Hành động</th>
                            </tr>

                        </thead>
                        <tbody>
                            {orders?.orders?.map((el, idx) => (
                                <tr key={el._id} className='border border-gray-200'>
                                    <td className='py-2 px-4 '>{((+params.get('page') > 1 ? +params.get('page') - 1 : 0) * 5) + 1 + idx}</td>
                                    <td className='py-2 px-4 '>
                                        <span>{el.orderBy}</span>
                                    </td>
                                    <td>
                                        <span>{el._id}</span>
                                    </td>
                                    <td className='py-2 px-4 '>
                                        {/* <span>{el.status}</span> */}
                                        <select
                                            className="border p-2"
                                            defaultValue={el.status}
                                            onChange={(e) => handleUpdateStatus(el._id, e.target.value)}
                                        >
                                            {statusOptions.map(item => (
                                                <option key={item.value} value={item.value}>{item.label}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className='py-2 px-4 '>
                                        {moment(el.createdAt).format('DD/MM/YYYY')}
                                    </td>
                                    <td className='py-2 px-4 '>

                                        <span>{formatMoney(Number(el.total * 25395.02))}</span>

                                    </td>

                                    <td className='flex justify-between py-2 px-4'>

                                        <span
                                            onClick={() => dispatch(showModal({ isShowModal: true, modalChildren: <DetailOrder orders={el} products={el.products} /> }))}
                                            className={'cursor-pointer  py-3 text-blue-500 hover:text-blue-400 '}
                                        ><MdContentPasteSearch size={20} /></span>
                                        <span
                                            onClick={() => handleDeleteOrder(el._id)}
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
                    totalCount={orders?.counts}
                />
            </div>
        </div>
    )
}

export default withBaseComponent(ManageOrder)
