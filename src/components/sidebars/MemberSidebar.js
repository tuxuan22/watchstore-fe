import React, { memo, Fragment, useState } from 'react'
import avatar from 'assets/avatar.png'
import { memberSidebar } from 'utils/constans'
import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import icons from 'utils/icons'
import { useSelector } from 'react-redux'

const activedStyle = 'px-4 py-2 flex items-center gap-2 bg-gray-200 text-slate-900'
const notActivedStyle = 'px-4 py-2 flex items-center gap-2 hover:bg-gray-300 hover:text-slate-900'

const { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowDown } = icons
const MemberSidebar = () => {
    const [actived, setActived] = useState([])
    const { current } = useSelector(state => state.user)
    const handleShowTabs = (tabId) => {
        if (actived.some(el => el === tabId)) setActived(prev => prev.filter(el => el !== tabId))
        else setActived(prev => [...prev, tabId])
    }
    return (
        <div className='bg-white w-[290px] h-full text-gray-500 '>
            <div className='w-main flex items-center p-4'>
                <img src={current?.avatar || avatar} alt="logo" className='w-[40px] object-contain' />
                <small>{`${current?.firstname} ${current?.lastname}`}</small>
            </div>
            <div>
                {memberSidebar.map(el => (
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
                            <div className='flex items-center justify-between px-4 py-2 hover:bg-gray-300 hover:text-slate-900 cursor-pointer'>
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
            </div>
        </div>
    )
}

export default memo(MemberSidebar)
