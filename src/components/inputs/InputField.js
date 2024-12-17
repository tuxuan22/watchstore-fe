import React from 'react'
import clsx from 'clsx'

const InputField = ({ value, setValue, nameKey, placeholder, type, invalidFields, setInvalidFields, styles, fullWidth }) => {
    return (
        <div className={clsx('flex flex-col relative w-full mb-2', fullWidth && 'w-full')}>
            <input
                type={type || "text"}
                className={clsx('px-4 py-2 w-full mt-2 bg-gray-200 outline-none', styles)}
                placeholder={placeholder}
                value={value}
                onChange={e => setValue(prev => ({ ...prev, [nameKey]: e.target.value }))}
                onFocus={() => setInvalidFields && setInvalidFields([])}
            />
            {invalidFields?.some(el => el.name === nameKey) && <small className='text-red-600 italic'>{invalidFields.find
                (el => el.name === nameKey)?.mes}</small>}
        </div>
    )
}

export default InputField
