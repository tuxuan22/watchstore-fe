import React, { memo, useEffect, useState } from 'react'
import icons from 'utils/icons'
import { createSearchParams, NavLink } from 'react-router-dom'
import path from 'utils/path'
import { getCurrent } from 'store/user/asyncActions'
import { useSelector } from 'react-redux'
import { clearMessage, logout } from 'store/user/userSlice'
import Swal from 'sweetalert2'
import withBaseComponent from 'hocs/withBaseComponent'
import { showCart } from 'store/app/appSlice'
import avatar from 'assets/avatar.png'

const { FaUserCircle, BsBagFill, MdOutlineSearch } = icons
const GroupAction = ({ dispatch, navigate }) => {
    const [search, setSearch] = useState('')

    const { isLoggedIn, current, mes } = useSelector(state => state.user)
    useEffect(() => {
        const setTimeoutId = setTimeout(() => {
            if (isLoggedIn) dispatch(getCurrent())
        }, 300)
        return () => {
            clearTimeout(setTimeoutId)
        }
    }, [dispatch, isLoggedIn])

    useEffect(() => {
        if (mes) Swal.fire('Lỗi'.mes, 'Phiên đăng nhập đã hết hạn').then(() => {
            dispatch(clearMessage())
            navigate(`/${path.LOGIN}`)
        })
    }, [mes, navigate, dispatch])

    const handleSearch = (e) => {
        if (e.keyCode === 13) {
            navigate({
                pathname: `/${path.PRODUCTS}`,
                search:
                    search.trim()
                        ? createSearchParams({
                            title: search
                        }).toString()
                        : ''
            })
        }
    }

    const [openProfile, setOpenProfile] = useState(false)
    return (
        <div className='flex items-center  gap-4 lg:gap-6  '>
            <div className='search_box flex items-center w-full lg:w-auto px-4 py-2 bg-gray-50 rounded-md'>
                <input
                    type="text"
                    placeholder='Nhập từ khóa tìm kiếm...'
                    className='w-[100px] lg:w-[200px] bg-transparent outline-none text-sm'
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    onKeyDown={handleSearch}
                />
                <MdOutlineSearch
                    size={27}
                    className='cursor-pointer'
                    onClick={() => navigate({
                        pathname: `/${path.PRODUCTS}`,
                        search: search.trim()
                            ? createSearchParams({
                                title: search
                            }).toString()
                            : ''
                    })}
                />

            </div>
            <div className='flex items-center gap-4 relative group h-[70px]'

                onMouseEnter={() => setOpenProfile(true)}
                onMouseLeave={() => setOpenProfile(false)}
            >
                <FaUserCircle size={24} className='cursor-pointer ' />
                {openProfile && (
                    <div className='absolute right border border-1 border-solid top-full w-[200px] bg-white  p-4 z-50'>
                        {isLoggedIn && current
                            ? <div className='flex flex-col gap-3'>
                                <div className='flex items-center gap-2 pb-2 border-b'>
                                    <img src={current?.avatar || avatar} alt="avatar" className='w-8 h-8 object-cover rounded-full' />
                                    <span className='font-medium'>{`${current?.firstname} ${current?.lastname}`}</span>
                                </div>
                                <NavLink to={`/${path.MEMBER}/${path.PERSONAL}`} className='hover:text-main'>
                                    Tài khoản
                                </NavLink>
                                {+current?.role === 1234 && (
                                    <NavLink to={`/${path.ADMIN}/${path.DASHBOARD}`} className='hover:text-main'>
                                        Quản trị hệ thống
                                    </NavLink>
                                )}
                                <NavLink to={`/${path.HOME}`}
                                    className='hover:text-main'
                                    onClick={() => dispatch(logout())}
                                >
                                    Đăng xuất
                                </NavLink>
                            </div>
                            : <div className='flex flex-col gap-2'>
                                <NavLink to={`/${path.LOGIN}`} className='hover:text-main'>
                                    Đăng nhập
                                </NavLink>
                                <NavLink to={`/${path.REGISTER}`} className='hover:text-main'>
                                    Đăng ký
                                </NavLink>
                            </div>
                        }
                    </div>
                )}


            </div>
            <div onClick={() => dispatch(showCart())} className='relative cursor-pointer'>
                <BsBagFill size={24} className='' />
                <span className='w-[15px] h-[15px] bg-red-500 text-white text-[10px] absolute text-center top-[-8px] right-[-12px] rounded-full'>
                    {current?.cart?.length || 0}
                </span>
            </div>
        </div>
    )
}

export default withBaseComponent(memo(GroupAction))
