import React, { memo, Fragment, useState } from 'react'
import logo from 'assets/logo.png'
import { adminSidebar } from 'utils/constans'
import { Link, NavLink } from 'react-router-dom'
import clsx from 'clsx'
import icons from 'utils/icons'
import path from 'utils/path'
import withBaseComponent from 'hocs/withBaseComponent'
import { logout } from 'store/user/userSlice'

const activedStyle = 'px-4 py-2 flex items-center gap-2 bg-main text-white'
const notActivedStyle = 'px-4 py-2 flex items-center gap-2 hover:bg-[#ff4e50] hover:text-white'

const { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowDown, IoMdLogOut } = icons

const AdminSidebar = ({ dispatch }) => {
    const [actived, setActived] = useState([])
    const handleShowTabs = (tabId) => {
        if (actived.some(el => el === tabId)) setActived(prev => prev.filter(el => el !== tabId))
        else setActived(prev => [...prev, tabId])
    }
    return (
        <div className=' bg-white h-full text-slate-900 '>
            <div className='flex flex-col justify-center items-center gap-2'>
                <Link to='/'> <img src={logo} alt="logo" className='w-[200px] object-contain' /></Link>
                <small>Admin Dashboard</small>
            </div>
            <div>
                {adminSidebar.map(el => (
                    <Fragment key={el.id}>
                        {el.type === 'SINGLE' &&
                            <NavLink
                                to={el.path}
                                className={({ isActive }) => clsx(isActive && activedStyle, !isActive && notActivedStyle)}
                            >
                                <span>{el.icon}</span>
                                <span>{el.text}</span>
                            </NavLink>}
                        {el.type === 'PARENT' && <div onClick={() => handleShowTabs(el.id)} className='flex flex-col'>
                            <div className='flex items-center justify-between px-4 py-2 hover:bg-[#ff4e50] hover:text-white cursor-pointer'>
                                <div className='flex items-center gap-2'>
                                    <span>{el.icon}</span>
                                    <span>{el.text}</span>
                                </div>
                                {actived.some(id => id === el.id) ? <MdOutlineKeyboardArrowDown /> : <MdOutlineKeyboardArrowRight />}
                            </div>
                            {actived.some(id => id === el.id) && <div className='flex flex-col'>
                                {el.submenu.map(item => (
                                    <NavLink
                                        key={item.text}
                                        to={item.path}
                                        onClick={e => e.stopPropagation()}
                                        className={({ isActive }) => clsx(isActive && activedStyle, !isActive && notActivedStyle, 'pl-6')}
                                    >
                                        {item.text}
                                    </NavLink>
                                ))}
                            </div>}
                        </div>}

                    </Fragment>
                ))}
                <NavLink
                    to={`/${path.HOME}`}
                    className='px-4 py-2 flex items-center gap-2 hover:bg-[#ff4e50] hover:text-white'
                    onClick={() => dispatch(logout())}
                >
                    <span><IoMdLogOut /></span>
                    <span>Đăng xuất</span>
                </NavLink>
            </div>

        </div>
    )
}

export default withBaseComponent(memo(AdminSidebar))
