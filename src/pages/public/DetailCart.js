import { BreadCrumb, Button, OrderItem } from 'components'
import withBaseComponent from 'hocs/withBaseComponent'
import React, { memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { createSearchParams, Link, Navigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { formatMoney } from 'utils/helpers'
import path from 'utils/path'


const DetailCart = ({ navigate, location }) => {
    const { isLoggedIn, current, currentCart } = useSelector(state => state.user)


    const [category, setCategory] = useState(null)
    if (!isLoggedIn || !current) return <Navigate to={`/${path.LOGIN}`} replace={true}></Navigate>

    const handleSubmit = () => {
        if (!current?.address) return Swal.fire({
            icon: 'error',
            title: 'Vui lòng cập nhật địa chỉ giao hàng',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Cập nhật',
            showCancelButton: true,
            cancelButtonText: 'Quay lại',

        }).then((rs) => {
            if (rs.isConfirmed) navigate({
                pathname: `/${path.MEMBER}/${path.PERSONAL}`,
                search: createSearchParams({ redirect: location.pathname }).toString()
            })
        })
        else navigate(`/${path.CHECKOUT}`)

    }

    return (
        <div className='bg-bgc overflow-y-auto'>
            <div className='w-main p-4'>
                <BreadCrumb category={category} />

            </div>
            {currentCart.length === 0 &&
                <div className=' flex flex-col items-center justify-center p-8'>
                    <span className='text-gray-500 text-lg'>
                        Không có gì trong giỏ hàng
                    </span>

                    <Link
                        to={`/${path.HOME}`}
                        className='text-gray-400 text-sm mt-2'
                    >
                        Hãy thêm sản phẩm vào giỏ hàng
                    </Link>
                </div>
            }
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
                        color={el.product.color}
                        title={el.product.title}
                        thumb={el.product.thumb}
                        // price={el.price}
                        finalPrice={el.product.finalPrice}
                        pid={el.product?._id}
                    />
                ))}
                <div className='w-main my-4 mx-auto mb-8 flex flex-col justify-center items-end gap-3'>
                    <span className='flex items-center gap-4 text-sm'>
                        <span>Tổng tiền</span>
                        <span className='text-red-500'>{`${formatMoney(currentCart?.reduce((sum, el) => +el?.product.finalPrice * el.quantity + sum, 0))}`}</span>
                    </span>
                    <Button handleOnClick={handleSubmit} name='Thanh toán' />

                </div>
            </div>}
        </div>

    )
}

export default withBaseComponent(memo(DetailCart))
