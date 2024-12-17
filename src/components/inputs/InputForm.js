import React, { memo } from 'react'
import clsx from 'clsx'

const InputForm = ({ label, styles, disabled, register, errors, id, validate, type = 'text', placeholder, fullWidth, defaultValue, readOnly }) => {
    return (
        <div className={('flex flex-col gap-2', styles)}>
            {label && <label htmlFor={id}>{label}</label>}
            <input
                type={type}
                id={id}
                {...register(id, validate)}
                disabled={disabled}
                placeholder={placeholder}
                className={clsx('border outline-none p-2 border-gray-300', fullWidth && 'w-full')}
                defaultValue={defaultValue}
                readOnly={readOnly}
            />
            {errors[id] && <small className='text-xs text-red-600'>{errors[id]?.message}</small>}
        </div>
    )
}


export default memo(InputForm)
