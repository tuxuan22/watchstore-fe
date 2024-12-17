import { BreadCrumb, Button, OrderItem } from 'components'
import withBaseComponent from 'hocs/withBaseComponent'
import React, { memo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { formatMoney } from 'utils/helpers'
import path from 'utils/path'


const DetailCart = ({ navigate }) => {
    const { isLoggedIn, current, currentCart } = useSelector(state => state.user)

    const [category, setCategory] = useState(null)
    if (!isLoggedIn || !current) return <Navigate to={`/${path.LOGIN}`} replace={true}></Navigate>

    return (
        <div>
            <div className='w-main p-4'>
                <BreadCrumb category={category} />

            </div>
            {currentCart.length === 0 && <div className='w-main flex justify-center my-6'>
                Không có gì trong giỏ hàng
            </div>}
            {currentCart.length > 0 && <div>
                <div className='w-main mx-auto mt-6 border p-2 font-semibold grid grid-cols-12'>
                    <span className='col-span-5 text-left w-full'>Thông tin sản phẩm</span>
                    <span className='col-span-2 text-center w-full'>Đơn giá</span>
                    <span className='col-span-2 text-center w-full'>Số lượng</span>
                    <span className='col-span-2 text-center w-full'>Thành tiền</span>
                    <span className='col-span-1 text-center w-full'>Thao tác</span>

                </div>
                {currentCart?.map(el => (
                    <OrderItem
                        key={el._id}
                        defaultQuantity={el.quantity}
                        color={el.color}
                        title={el.title}
                        thumb={el.thumb}
                        price={el.price}
                        pid={el.product?._id}
                    />
                ))}
                <div className='w-main my-4 mx-auto mb-8 flex flex-col justify-center items-end gap-3'>
                    <span className='flex items-center gap-4 text-sm'>
                        <span>Tổng tiền</span>
                        <span className='text-red-500'>{`${formatMoney(currentCart?.reduce((sum, el) => +el?.price * el.quantity + sum, 0))}`}</span>
                    </span>
                    <Button handleOnClick={() => {
                        navigate(`/${path.CHECKOUT}`)
                    }} name='Thanh toán' />
                </div>
            </div>}
        </div>

    )
}

export default withBaseComponent(memo(DetailCart))
