import React from 'react'
import { formatMoney } from 'utils/helpers'

const DetailOrder = ({ products, orders }) => {

    return (
        <div onClick={e => e.stopPropagation()} className='bg-bgc p-4 flex flex-col w-[1200px] gap-4 items-center'>
            <h2 className='text-center font-medium text-lg'>Chi tiết sản phẩm</h2>



            <div className='w-full flex flex-col text-start justify-start gap-4'>
                <span className='text-sm font-medium'>Tên khách hàng: {orders.orderBy}</span>
                <span className='text-sm font-medium'>Mã đơn hàng: {orders._id}</span>
                <span className='text-sm font-medium'>Ngày tạo: {orders.createdAt}</span>
                <span className='text-sm font-medium'>Tổng tiền: {formatMoney(Number(orders.total * 25395.02))}</span>
            </div>


            <div className='w-main mx-auto mt-6 border p-2 font-semibold grid grid-cols-6'>
                <span className='col-span-3 text-left w-full'>Thông tin sản phẩm</span>
                <span className='col-span-1 text-center w-full'>Đơn giá</span>
                <span className='col-span-1 text-center w-full'>Số lượng</span>
                <span className='col-span-1 text-center w-full'>Thành tiền</span>


            </div>
            {products.map((el) => (
                <div className='w-main mx-auto   border p-2 font-semibold grid grid-cols-6'>
                    <span className='col-span-3 w-full'>
                        <div className='flex gap-2'>
                            <img src={el.thumb} alt='thumb' className='w-28 h-28 border rounded-md  object-cover' />
                            <div className='flex flex-col justify-center gap-1'>
                                <span className='text-sm font-normal line-clamp-1'>{el.title}</span>
                                <span className='text-xs'>{el.color}</span>
                            </div>
                        </div>
                    </span>

                    <span className='col-span-1 flex justify-center items-center w-full text-red-500 text-sm'>{formatMoney(Number(el.price))}</span>
                    <span className='col-span-1 flex justify-center items-center w-full'>
                        {el.quantity}
                    </span>
                    <span className='col-span-1 flex justify-center items-center w-full text-red-500 text-sm'>{formatMoney(Number(el.price) * el.quantity)}</span>


                </div>
            ))}

        </div>
    )
}

export default DetailOrder
