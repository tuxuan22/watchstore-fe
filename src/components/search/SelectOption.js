import React from 'react'

const SelectOption = ({ icon, styles }) => {
    return (
        <div className={styles ? styles : `w-[35px] h-[35px] shadow-lg flex items-center mb-1 justify-center rounded-full bg-white hover:bg-red-600 hover:text-white cursor-pointed`}>
            {icon}
        </div>
    )
}

export default SelectOption
