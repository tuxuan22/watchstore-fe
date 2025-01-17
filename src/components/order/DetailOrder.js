import React from 'react'
import { formatDate, formatMoney } from 'utils/helpers'

const DetailOrder = ({ products, orders }) => {
    console.log(products);

    return (
        <div onClick={e => e.stopPropagation()} className='bg-bgc p-4 flex flex-col w-[900px] gap-4 items-center'>
            <h2 className='text-center uppercase font-medium text-lg'>Chi tiết đơn hàng {orders._id?.slice(-5)}</h2>



            <div className='w-full flex   text-start justify-start gap-4'>
                <div className='flex ml-8 flex-col flex-2'>
                    <span className='font-medium'>Tên khách hàng:</span>
                    <span className='font-medium'>Điện thoại:</span>
                    <span className='font-medium'>Email:</span>
                    <span className='font-medium'>Địa chỉ:</span>
                    <span className='font-medium'>Ngày tạo: </span>
                </div>
                <div className='flex flex-col flex-8'>
                    <span className='font-medium'>{orders.orderBy.firstname} {orders.orderBy.lastname}</span>
                    <span className='font-medium'>{orders.orderBy.mobile}</span>
                    <span className='font-medium'>{orders.orderBy.email}</span>
                    <span className='font-medium'>{orders.address}</span>
                    <span className='font-medium'> {formatDate(orders.createdAt).format('DD/MM/YYYY')}</span>
                </div>
            </div>

            <form className='overflow-x-auto w-full'>
                <table className='min-w-full table-auto text-left'>
                    <thead className='font-bold bg-gray-200 text-[13px]'>
                        <tr>
                            <th className='px-4 py-2'>#</th>
                            <th className='px-4 py-2'>Tên sản phẩm</th>
                            <th className='px-4 py-2'>Màu sắc</th>
                            <th className='px-4 py-2'>Đơn giá</th>
                            <th className='px-4 py-2'>Số lượng</th>
                            <th className='px-4 py-2'>Thành tiền</th>

                        </tr>

                    </thead>
                    <tbody>
                        {products?.map((el, idx) => (
                            <tr key={el._id} className='border border-gray-200'>
                                <td className='py-2 px-4 '>{1 + idx}</td>
                                <td className='py-2 px-4 '>
                                    <span>{el.product.title}</span>
                                </td>
                                <td>
                                    <span> {el.product.color}</span>
                                </td>
                                <td className='py-2 px-4 '>
                                    {formatMoney(Number(el.product.finalPrice))}

                                </td>
                                <td className='py-2 px-4 '>
                                    {el.quantity}

                                </td>
                                <td className='py-2 px-4 '>
                                    {formatMoney(Number(el.product.finalPrice) * el.quantity)}

                                </td>


                            </tr>

                        ))}
                    </tbody>

                </table>
            </form>

            <span className='w-full flex justify-end gap-4 px-8'>
                <span>Tổng tiền:</span>
                <span className='text-red-500'>{`${formatMoney(products?.reduce((sum, el) => +el?.product.finalPrice * el.quantity + sum, 0))}`}</span>
            </span>



        </div>
    )
}

export default DetailOrder
