import { apiRemoveCart } from 'apis'
import Button from 'components/buttons/Button'
import withBaseComponent from 'hocs/withBaseComponent'
import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { showCart } from 'store/app/appSlice'
import { getCurrent } from 'store/user/asyncActions'
import { formatMoney } from 'utils/helpers'
import icons from 'utils/icons'
import path from 'utils/path'

const { MdClose, RiDeleteBin6Line } = icons

const Cart = ({ dispatch, navigate }) => {
    const { currentCart } = useSelector(state => state.user)
    const removeCart = async (pid, color) => {
        const response = await apiRemoveCart(pid, color)
        if (response.success) {
            toast.success(response.mes)
            dispatch(getCurrent())
        } else toast.error(response.mes)
    }
    return (
        <div onClick={e => e.stopPropagation()} className='w-[400px] h-screen grid grid-rows-10  bg-bgc p-4'>
            <header className='p-2 border-b border-gray-400 font-semibold flex items-center justify-between row-span-1 h-full text-xl'>
                <span>Giỏ hàng</span>
                <MdClose onClick={() => dispatch(showCart())} size={40} className='cursor-pointer p-2' />
            </header>
            <section className='row-span-7 flex flex-col max-h-full overflow-y-auto py-3'>

                {currentCart.length > 0 ? (
                    currentCart.map(el => (
                        <div key={el._id} className='my-2 flex items-center justify-between'>
                            <div className='flex gap-2'>
                                <img src={el?.product?.thumb} alt={el.product.name} className='w-16 h-16 border rounded-md  object-cover' />
                                <div className='flex flex-col gap-1'>
                                    <span className='text-sm line-clamp-1'>{el.product.title}</span>
                                    <span className='text-xs'>{el.product.color}</span>
                                    <span className='text-sm' >{el.quantity} x {formatMoney(Number(el.product.finalPrice))}</span>
                                </div>
                            </div>
                            <span onClick={() => removeCart(el.product?._id, el.product.color)} className='p-2 hover:text-red-500 cursor-pointer'><RiDeleteBin6Line size={20} /></span>
                        </div>
                    )))
                    : (
                        <span className=''>Không có gì trong giỏ hàng</span>
                    )
                }
            </section>
            <div className='row-span-2 h-full'>
                {currentCart.length > 0 ? (
                    <div className='flex my-4 pt-4 border-t justify-between border-gray-400 items-center'>
                        <span>Tổng tiên</span>
                        <span>{formatMoney(currentCart?.reduce((sum, el) => sum + Number(el?.product.finalPrice * el.quantity), 0))}</span>
                    </div>
                )
                    : (
                        <div className='flex my-4 pt-4 border-t justify-between border-gray-400 items-center'></div>
                    )}


                <Button handleOnClick={() => {
                    dispatch(showCart())
                    navigate(`/${path.DETAIL_CART}`)
                }} name='Xem giỏ hàng'></Button>
            </div>
        </div>
    )
}

export default withBaseComponent(memo(Cart))
