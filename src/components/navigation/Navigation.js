import React, { useState } from 'react'
import { navigation } from 'utils/constans'
import { createSearchParams, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import withBaseComponent from 'hocs/withBaseComponent'

const Navigation = ({ navigate }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const { categories } = useSelector(state => state.app)

    return (
        <div className='font-bold lg:w-[650px] flex flex-col lg:flex-row items-start lg:items-center py-4 lg-py-0'>
            {navigation.map(el => (
                <div
                    key={el.id}
                    className='relative'
                    onMouseEnter={() => el.value === 'Sản phẩm' && setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                >
                    <NavLink
                        to={el.path}
                        className={({ isActive }) =>
                            isActive
                                ? 'px-4 py-2 lg:py-0 w-full lg:w-auto hover:text-main text-main'
                                : 'px-4 py-2 lg:py-0 w-full lg:w-auto hover:text-main'
                        }
                    >
                        {el.value}
                    </NavLink>
                    {el.value === 'Sản phẩm' && isDropdownOpen && (
                        <div className='absolute top-full left-0 bg-white shadow-md rounded-md p-6 w-[900px] z-50 grid grid-cols-4 gap-4'>
                            {categories.map(el => (
                                <div key={el._id} className='space-y-2'>
                                    <NavLink
                                        key={el._id}
                                        to={`/${el.title}`}
                                        className='font-medium text-gray-800 hover:text-main block mb-2 border-b'
                                    >
                                        {el.title.toUpperCase()}
                                    </NavLink>
                                    <div className='flex flex-col space-y-1'>
                                        {el.brand?.map(item => (
                                            <span
                                                key={item}
                                                onClick={() => navigate({
                                                    pathname: `/${el.title}`,
                                                    search: createSearchParams({ brand: item }).toString()
                                                })}
                                                className='text-sm text-gray-600 hover:text-main pl-2'
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default withBaseComponent(Navigation)
