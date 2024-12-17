import React, { useCallback, useEffect, useState } from 'react'
import SelectQuantity from './SelectQuantity'
import { formatMoney } from 'utils/helpers'
import icons from 'utils/icons'
import { apiRemoveCart } from 'apis'
import { getCurrent } from 'store/user/asyncActions'
import withBaseComponent from 'hocs/withBaseComponent'
import { toast } from 'react-toastify'
import { updateCart } from 'store/user/userSlice'

const { RiDeleteBin6Line } = icons

const OrderItem = ({ dispatch, defaultQuantity = 1, color, title, price, thumb, pid }) => {

    const [quantity, setQuantity] = useState(() => defaultQuantity)

    const handleQuantity = useCallback((number) => {
        if (number === '') {
            setQuantity('')
        }
        if (!Number(number) || Number(number) < 1) {
            return
        } else {
            setQuantity(number)

        }
    }, [])

    const handleChangeQuantity = (flag) => {
        if (flag === 'minus') {
            if (quantity === 1) {
                removeCart(pid, color)
            } else {
                setQuantity(prev => +prev - 1)
            }
        } else if (flag === 'plus') {
            setQuantity(prev => +prev + 1)
        }
    }

    useEffect(() => {
        if (quantity === 0) {
            removeCart(pid, color)
        } else dispatch(updateCart({ pid, quantity, color }))
    }, [quantity])



    const removeCart = async (pid, color) => {
        const response = await apiRemoveCart(pid, color)
        if (response.success) {
            dispatch(getCurrent())
        } else toast.error(response.mes)
    }


    return (
        <div className='w-main mx-auto   border p-2 font-semibold grid grid-cols-12'>
            <span className='col-span-5 w-full'>
                <div className='flex gap-2'>
                    <img src={thumb} alt='thumb' className='w-28 h-28 border rounded-md  object-cover' />
                    <div className='flex flex-col justify-center gap-1'>
                        <span className='text-sm font-normal line-clamp-1'>{title}</span>
                        <span className='text-xs'>{color}</span>
                    </div>
                </div>
            </span>
            <span className='col-span-2 flex justify-center items-center w-full text-red-500 text-sm'>{formatMoney(Number(price))}</span>
            <span className='col-span-2 flex justify-center items-center w-full'>
                <div className='gap-4'>
                    <SelectQuantity
                        quantity={quantity}
                        handleQuantity={handleQuantity}
                        handleChangeQuantity={handleChangeQuantity}
                    />
                </div>
            </span>
            <span className='col-span-2 flex justify-center items-center w-full text-red-500 text-sm'>{formatMoney(Number(price) * quantity)}</span>
            <span className='col-span-1 flex justify-center items-center w-full'>
                <span onClick={() => removeCart(pid, color)} className='p-2 hover:text-red-500 cursor-pointer'><RiDeleteBin6Line size={20} /></span>

            </span>

        </div>
    )
}

export default withBaseComponent(OrderItem)
