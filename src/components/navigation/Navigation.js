import React from 'react'
import { navigation } from 'utils/constans'
import { NavLink } from 'react-router-dom'

const Navigation = () => {
    return (
        <div className='font-bold w-[780px] flex items-center'>
            {navigation.map(el => (
                <NavLink
                    key={el.id}
                    to={el.path}
                    className={({ isActive }) => isActive ? 'mx-4 hover:text-main text-main' : 'mx-4 hover:text-main'}
                >
                    {el.value}
                </NavLink>
            ))}
        </div>
    )
}

export default Navigation
