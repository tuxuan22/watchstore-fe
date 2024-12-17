import React, { memo, useEffect, useState } from 'react'
import icons from 'utils/icons'
import { NavLink } from 'react-router-dom'
import path from 'utils/path'
import { getCurrent } from 'store/user/asyncActions'
import { useSelector } from 'react-redux'
import { clearMessage, logout } from 'store/user/userSlice'
import Swal from 'sweetalert2'
import withBaseComponent from 'hocs/withBaseComponent'
import { showCart } from 'store/app/appSlice'

const { FaUserCircle, BsBagFill, MdOutlineSearch } = icons
const GroupAction = ({ dispatch, navigate }) => {

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

    const [openProfile, setOpenProfile] = useState(false)
    return (
        <div className='flex items-center'>
            <div className='search_box flex px-4 py-2'>
                {/* <LiaTimesSolid size={27} className='ml-[50px]' /> */}
                <input type="text" placeholder='Nhập từ khóa tìm kiếm...' className='outline-none' />
                <MdOutlineSearch size={27} className=' search_btn ml-[50px]' />

            </div>
            <div className='h-[100%] flex items-center' onMouseEnter={() => setOpenProfile(true)}
                onMouseLeave={() => setOpenProfile(false)}>
                <FaUserCircle size={27} className='ml-[18px]' />
                {
                    openProfile &&
                    <div className='dropdownProfile flex flex-col'>

                        {isLoggedIn && current
                            ? <div className='flex flex-col gap-2 text-sm'>
                                <strong>{`${current?.firstname} ${current?.lastname}`}</strong>

                                <hr />
                                <NavLink to={`/${path.MEMBER}/${path.PERSONAL}`} className=' hover:text-main' > Tài khoản</NavLink>


                                {+current?.role === 1234 && <NavLink to={`/${path.ADMIN}/${path.DASHBOARD}`} className=' hover:text-main'>Quản trị hệ thống</NavLink>}
                                <NavLink to={`/${path.HOME}`} className=' hover:text-main' onClick={() => dispatch(logout())}>Đăng xuất</NavLink>

                            </div>
                            :
                            <div className='flex flex-col gap-2 text-sm'>
                                <NavLink to={`/${path.LOGIN}`} className=' hover:text-main'>Đăng nhập</NavLink>
                                <NavLink to={`/${path.REGISTER}`} className=' hover:text-main'>Đăng ký</NavLink>
                            </div>

                        }



                    </div>
                }
            </div>
            <div onClick={() => dispatch(showCart())} className='flex relative'>
                <BsBagFill size={27} className='ml-[15px]' />
                <span className='w-[15px] h-[15px] bg-red-500 text-white text-[10px] absolute text-center top-[-8px] right-[-12px] rounded-full'>{`${current?.cart?.length || 0}`}</span>
            </div>
        </div>
    )
}

export default withBaseComponent(memo(GroupAction))
