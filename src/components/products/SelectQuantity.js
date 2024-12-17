import React, { memo } from 'react'

const SelectQuantity = ({ quantity, handleQuantity, handleChangeQuantity, mh }) => {
    return (
        <div className={`flex items-center text-center border bg-white ${mh ? 'h-[28px]' : 'h-[50px]'}`}>
            <span onClick={() => handleChangeQuantity('minus')} className='hover:bg-red-500 hover:text-white cursor-pointer py-3 border-r  w-[30px]'>-</span>
            <input
                className='py-2 outline-none text-center  w-[40px] '
                type="text"
                value={quantity}
                onChange={e => handleQuantity(e.target.value)}

            />
            <span onClick={() => handleChangeQuantity('plus')} className='hover:bg-red-500 hover:text-white cursor-pointer py-3 border-l w-[30px]' >+</span>

        </div>
    )
}

export default memo(SelectQuantity)
