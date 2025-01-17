import React, { memo } from 'react'

const SelectQuantity = ({ quantity, handleQuantity, handleChangeQuantity, mh }) => {
    return (
        <div className={`flex items-center text-center border bg-white ${mh ? 'h-[28px]' : 'h-[40px]'}`}>
            <span onClick={() => handleChangeQuantity('minus')} className='hover:bg-red-500 hover:text-white cursor-pointer py-2 border-r  w-[25px]'>-</span>
            <input
                className=' outline-none text-center  w-[30px] '
                type="text"
                value={quantity}
                onChange={e => handleQuantity(e.target.value)}

            />
            <span onClick={() => handleChangeQuantity('plus')} className='hover:bg-red-500 hover:text-white cursor-pointer py-2 border-l w-[25px]' >+</span>

        </div>
    )
}

export default memo(SelectQuantity)
