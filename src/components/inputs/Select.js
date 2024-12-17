import clsx from 'clsx'
import React, { memo } from 'react'

const Select = ({
    label,
    options = [],
    register,
    errors,
    id,
    styles,
    validate,
    style,
    fullWidth,
    defaultValue

}) => {
    return (
        <div className={clsx(styles, 'flex flex-col gap-2')}>
            {label && <label htmlFor={id}>{label}</label>}
            <select defaultValue={defaultValue} className={clsx('p-2 outline-none border', fullWidth && 'w-full', style)} id={id} {...register(id, validate)}>
                <option value="">---Chọn---</option>
                {options?.map(el => (
                    <option key={el} value={el.code}>{el.value}</option>
                ))}
            </select>
            {errors[id] && <small className='text-xs text-red-600'>{errors[id]?.message}</small>}
        </div>
    )
}

export default memo(Select)
