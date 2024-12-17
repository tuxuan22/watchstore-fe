import React, { memo } from 'react'

const Button = ({ name, handleOnClick, styles, iconBefore, iconAfter, fw, type = 'button' }) => {
    return (
        <button
            type={type}
            className={styles ? styles : `px-4 py-2 my-2 text-white bg-red-700 text-semibold hover:text-red-700 hover:bg-white hover:border hover:border-red-700     ${fw ? 'w-full' : 'w-fit'}`}
            onClick={() => { handleOnClick && handleOnClick() }}
        >
            {iconBefore}
            <span>{name}</span>
            {iconAfter}
        </button>
    )
}

export default memo(Button)
