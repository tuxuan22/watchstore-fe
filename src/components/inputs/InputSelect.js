import React, { memo } from 'react'

const InputSelect = ({ value, changeValue, options }) => {
    return (
        <select
            className='p-2 cursor-pointer text-xs gap-4 bg-white relative border flex justify-center items-center'
            value={value}
            onChange={e => changeValue(e.target.value)}
        >
            <option value="">Mặc định</option>
            {options?.map(el => (
                <option key={el.id} value={el.value}>{el.text}</option>
            ))}
        </select>
    )
}

export default memo(InputSelect)
