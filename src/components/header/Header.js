import React, { memo, useState } from 'react'
import logo from 'assets/logo.png'
import { Navigation, GroupAction } from 'components'
import { Link } from 'react-router-dom'
import path from 'utils/path'
import icons from 'utils/icons'

const { HiMenuAlt3 } = icons
const Header = () => {
    const [showMenu, setShowMenu] = useState(false)
    return (
        <div className='w-full px-4 lg:px-0'>
            <div className='w-full lg:w-main min-h-[64px] flex flex-col lg:flex-row mx-auto'>
                <div className='flex items-center justify-between  lg:justify-normal lg:w-[150px]'>
                    <Link to={`/${path.HOME}`}>
                        <img src={logo} alt='logo' className='w-[150px]' />
                    </Link>
                    <div className='lg:hidden flex items-center gap-4'>
                        <GroupAction />
                        <button
                            onClick={() => setShowMenu(!showMenu)}
                            className='lg:hidden text-gray-700'
                        >
                            <HiMenuAlt3 size={24} />
                        </button>
                    </div>
                </div>

                <div className={`${showMenu ? 'flex' : 'hidden'} lg:flex lg:top-0 lg:flex-row lg:flex-1 lg:justify-between
                absolute lg:relative top-[64px] left-0 w-[200px] bg-white shadow-lg lg:shadow-none z-40`}>
                    <Navigation />
                    <div className='hidden lg:flex'>
                        <GroupAction />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(Header)
