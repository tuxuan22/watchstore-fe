import React, { useEffect, useState } from 'react'
import { createSearchParams, Link } from 'react-router-dom'
import path from 'utils/path'
import logo from 'assets/logo.png'
import { useSelector } from 'react-redux'
import { formatMoney } from 'utils/helpers'
import { Button, InputForm, Loading, Paypal } from 'components'
import { useForm } from 'react-hook-form'
import withBaseComponent from 'hocs/withBaseComponent'
import { getCurrent } from 'store/user/asyncActions'
import { apiCreateOrder } from 'apis'
import Swal from 'sweetalert2'
import { showModal } from 'store/app/appSlice'
import { toast } from 'react-toastify'

const Checkout = ({ dispatch, navigate, location }) => {
    const { currentCart, current } = useSelector(state => state.user)
    const [paymentMethod, setPaymentMethod] = useState('COD')
    const [coupon, setCoupon] = useState('')
    const [discount, setDiscount] = useState(0)
    const [isSuccess, setIsSuccess] = useState(false)
    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value)
    }

    useEffect(() => {
        if (isSuccess) dispatch(getCurrent())
    }, [isSuccess])


    const handleChangeAdd = () => {
        navigate({
            pathname: `/${path.MEMBER}/${path.PERSONAL}`,
            search: createSearchParams({ redirect: location.pathname }).toString()
        })
    }

    const handleCreateOrder = async () => {

        dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }))
        const response = await apiCreateOrder({
            products: currentCart,
            total: Math.round(+currentCart?.reduce((sum, el) => +el?.product.finalPrice * el.quantity + sum, 0) / 25395.02),
            orderBy: current?._id,
            address: current?.address,
            paymentMethod: paymentMethod
        })
        dispatch(showModal({ isShowModal: false, modalChildren: null }))

        if (response.success) {
            Swal.fire('Chúc mừng', 'Đã đặt hàng thành công!', 'success',)
                .then(() => {
                    navigate('/')
                })
        } else {
            toast.error(response.mes)
        }
    }

    return (
        <div className='bg-bgc min-h-screen overflow-y-auto'>
            <div className='bg-white'>

                <h1 className=' flex h-[64px]  items-center w-main mx-auto py-4   text-2xl font-medium'>
                    <div className='w-[195px] mr-3' ><Link to={`/${path.HOME}`}><img src={logo} alt='logo' /></Link></div>
                    <span >Thanh toán</span>
                </h1>
            </div>
            <div className=' w-main mx-auto '>
                <div className=' py-4 grid grid-cols-10  gap-4'>

                    <div className='flex flex-col col-span-7 gap-4'>
                        <div className='bg-white p-4'>
                            {currentCart.map(el => (
                                <div key={el._id} className='my-2 border p-4 rounded-lg flex items-center justify-between'>
                                    <div className='flex gap-2'>
                                        <img src={el.product.thumb} alt={el.product.name} className='w-16 h-16 border rounded-md  object-cover' />
                                        <div className='flex flex-col gap-1'>
                                            <span className='text-sm line-clamp-1'>{el.product.title}</span>
                                            <span className='text-xs'>{el.product.color}</span>
                                            <span className='text-sm' >{el.quantity} x {formatMoney(Number(el.product.finalPrice))}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className='bg-white p-4'>
                            <h2 className='mb-6 text-lg font-medium'>Chọn phương thức thanh toán</h2>
                            <div className='flex flex-col gap-6'>
                                <label className='flex items-center'>
                                    <input
                                        type='radio'
                                        name='paymentMethod'
                                        value='COD'
                                        className='w-4 h-4 mr-2'
                                        checked={paymentMethod === 'COD'}
                                        onChange={handlePaymentMethodChange} />
                                    <span>Thanh toán khi nhận hàng</span>
                                </label>
                                <label className='flex items-center'>
                                    <input
                                        type='radio'
                                        name='paymentMethod'
                                        value='Paypal'
                                        className='w-4 h-4 mr-2'
                                        checked={paymentMethod === 'Paypal'}
                                        onChange={handlePaymentMethodChange} />
                                    <span>Thanh toán Paypal</span>
                                </label>
                                {/* <label className='flex items-center'>
                                    <input
                                        type='radio'
                                        name='paymentMethod'
                                        value='vnpay'
                                        className='w-4 h-4 mr-2'
                                        checked={paymentMethod === 'vnpay'}
                                        onChange={handlePaymentMethodChange}
                                    />
                                    <span>Thanh toán VNPay</span>
                                </label> */}
                            </div>
                        </div>
                    </div>

                    <div className='bg-white flex flex-col col-span-3 gap-4 p-4 h-fit'>
                        <div className=' flex flex-col gap-4'>

                            <div className='flex flex-col'>
                                <div className='flex justify-between '>
                                    <span className='text-base font-medium'> Địa chỉ giao hàng </span>
                                    <span onClick={handleChangeAdd} className='text-base text-blue-600 cursor-pointer'>Thay đổi</span>
                                </div>

                                <span className='text-sm'>{current?.address} </span>
                            </div>
                            <div className='flex flex-col'>
                                <span className='text-base font-medium'>Mã giảm giá</span>
                                <div className='flex gap-2 items-center'>
                                    <input
                                        type='text'
                                        value={coupon}
                                        onChange={e => setCoupon(e.target.value)}
                                        placeholder='Nhập mã giảm giá'
                                        className='h-[40px] flex-1 px-2 border rounded outline-none'
                                    />
                                    <Button
                                        name='Áp dụng'
                                    // handleOnClick={() => handleApplyCoupon()}

                                    />
                                </div>
                                {discount > 0 && (
                                    <div className='mx-4 flex justify-between'>
                                        <div className='text-green-600 mt-2'>
                                            Đã áp dụng giảm giá
                                        </div>
                                        <span className='text-green-600 mt-2'>
                                            -{formatMoney(discount)}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className='flex gap-4'>
                                <span className='text-base font-medium'>Tổng tiền</span>
                                <span className='text-red-500'>{`${formatMoney(currentCart?.reduce((sum, el) => +el?.product.finalPrice * el.quantity + sum, 0))}`}</span>
                            </div>
                        </div>
                        <div>
                            {paymentMethod === 'COD' && (

                                <div className='flex justify-center'>
                                    <Button name='Thanh toán'
                                        handleOnClick={handleCreateOrder}
                                    />
                                </div>
                            )}
                            {paymentMethod === 'Paypal' && (
                                <Paypal
                                    setIsSuccess={setIsSuccess}
                                    payload={{
                                        products: currentCart,
                                        total: Math.round(+currentCart?.reduce((sum, el) => +el?.product.finalPrice * el.quantity + sum, 0) / 25395.02),
                                        orderBy: current?._id,
                                        address: current?.address,
                                        paymentMethod: paymentMethod
                                    }}
                                    amount={Math.round(+currentCart?.reduce((sum, el) => +el?.product.finalPrice * el.quantity + sum, 0) / 25395.02)} />

                            )}
                            {paymentMethod === 'vnpay' && (
                                <div className='flex justify-center'>
                                    <Button
                                        name='Thanh toán với VNPay'
                                    // onClick={handleVNPayPayment}
                                    />
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default withBaseComponent(Checkout)
