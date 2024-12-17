import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import path from 'utils/path'
import logo from 'assets/logo.png'
import { useSelector } from 'react-redux'
import { formatMoney } from 'utils/helpers'
import { Button, InputForm, Paypal } from 'components'
import { useForm } from 'react-hook-form'
import withBaseComponent from 'hocs/withBaseComponent'
import { getCurrent } from 'store/user/asyncActions'
import { createVNPayPayment } from 'apis'

const Checkout = ({ dispatch }) => {
    const { currentCart, current } = useSelector(state => state.user)
    const [paymentMethod, setPaymentMethod] = useState('cod')
    const [isSuccess, setIsSuccess] = useState(false)
    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value)
    }
    const { register, formState: { errors }, watch, setValue } = useForm()
    const address = watch('address')

    useEffect(() => {
        setValue('address', current?.address)
    }, [current])

    useEffect(() => {
        if (isSuccess) dispatch(getCurrent())
    }, [isSuccess])

    const handleVNPayPayment = async () => {
        try {
            const payload = {
                amount: currentCart?.reduce((sum, el) => +el?.price * el.quantity + sum, 0),
                orderBy: current?._id,
                address,
                orderDescription: 'Thanh toán đơn hàng VNPay'
            }

            // Gọi API để lấy URL VNPay
            const { paymentUrl } = await createVNPayPayment(payload)

            // Chuyển hướng người dùng đến VNPay
            window.location.href = paymentUrl
        } catch (error) {
            console.error('VNPay Payment Error:', error)
            alert('Thanh toán VNPay thất bại. Vui lòng thử lại.')
        }
    }

    return (
        <div className='bg-bgc min-h-screen overflow-y-auto'>
            <div className='bg-white'>

                <h1 className=' flex h-[64px]  items-center w-main mx-auto py-4   text-2xl font-normal'>
                    <div className='w-[195px] mr-3' ><Link to={`/${path.HOME}`}><img src={logo} alt='logo' /></Link></div>
                    <span>Thanh toán</span>
                </h1>
            </div>
            <div className=' w-main mx-auto '>
                <div className=' py-4 grid grid-cols-10  gap-4'>

                    <div className='flex flex-col col-span-7 gap-4'>
                        <div className='bg-white p-4'>
                            {currentCart.map(el => (
                                <div key={el._id} className='my-2 border p-4 rounded-lg flex items-center justify-between'>
                                    <div className='flex gap-2'>
                                        <img src={el.thumb} alt={el.product.name} className='w-16 h-16 border rounded-md  object-cover' />
                                        <div className='flex flex-col gap-1'>
                                            <span className='text-sm line-clamp-1'>{el.title}</span>
                                            <span className='text-xs'>{el.color}</span>
                                            <span className='text-sm' >{el.quantity} x {formatMoney(Number(el.price))}</span>
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
                                        value='cod'
                                        className='w-4 h-4 mr-2'
                                        checked={paymentMethod === 'cod'}
                                        onChange={handlePaymentMethodChange} />
                                    <span>Thanh toán khi nhận hàng</span>
                                </label>
                                <label className='flex items-center'>
                                    <input
                                        type='radio'
                                        name='paymentMethod'
                                        value='paypal'
                                        className='w-4 h-4 mr-2'
                                        checked={paymentMethod === 'paypal'}
                                        onChange={handlePaymentMethodChange} />
                                    <span>Thanh toán Paypal</span>
                                </label>
                                <label className='flex items-center'>
                                    <input
                                        type='radio'
                                        name='paymentMethod'
                                        value='vnpay'
                                        className='w-4 h-4 mr-2'
                                        checked={paymentMethod === 'vnpay'}
                                        onChange={handlePaymentMethodChange}
                                    />
                                    <span>Thanh toán VNPay</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className='bg-white  flex flex-col col-span-3 gap-4 p-4 h-fit'>
                        <div>

                            <div className='flex flex-col gap-4'>
                                <InputForm
                                    label='Địa chỉ'
                                    register={register}
                                    errors={errors}
                                    id='address'
                                    validate={{
                                        required: 'Vui lòng nhập địa chỉ',
                                    }}
                                    styles='flex gap-2 items-center'

                                    type='text'
                                />
                                <span className='text-sm'>

                                </span>
                            </div>
                            <div className='flex gap-4'>
                                <span className='text-sm font-medium'>Phí vận chuyển</span>
                                {/* <span className='text-lg'>{formatMoney(120)}</span> */}
                            </div>
                            <div className='flex gap-4'>
                                <span className='text-sm font-medium'>Tổng tiền</span>
                                <span className='text-red-500'>{`${formatMoney(currentCart?.reduce((sum, el) => +el?.price * el.quantity + sum, 0))}`}</span>
                            </div>
                        </div>
                        {address && <div>
                            {paymentMethod === 'cod' && (

                                <div className='flex justify-center'>
                                    <Button name='Thanh toán' />
                                </div>
                            )}
                            {paymentMethod === 'paypal' && (
                                <Paypal
                                    setIsSuccess={setIsSuccess}
                                    payload={{
                                        products: currentCart,
                                        total: Math.round(+currentCart?.reduce((sum, el) => +el?.price * el.quantity + sum, 0) / 25395.02),
                                        orderBy: current?._id,
                                        address
                                    }}
                                    amount={Math.round(+currentCart?.reduce((sum, el) => +el?.price * el.quantity + sum, 0) / 25395.02)} />

                            )}
                            {paymentMethod === 'vnpay' && (
                                <div className='flex justify-center'>
                                    <Button
                                        name='Thanh toán với VNPay'
                                        onClick={handleVNPayPayment}
                                    />
                                </div>
                            )}
                        </div>}
                        {/* <Paypal /> */}

                    </div>
                </div>
            </div>
        </div>

    )
}

export default withBaseComponent(Checkout)
