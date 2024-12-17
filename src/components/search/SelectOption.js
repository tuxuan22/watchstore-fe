import React from 'react'

const SelectOption = ({ icon }) => {
    return (
        <div className='w-[35px] h-[35px] shadow-lg flex items-center mb-1 justify-center rounded-full bg-white hover:bg-main hover:text-white cursor-pointed'>
            {icon}
        </div>
    )
}

export default SelectOption
