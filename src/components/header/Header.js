import React, { memo } from 'react'
import logo from 'assets/logo.png'
import { Navigation, GroupAction } from 'components'
import { Link } from 'react-router-dom'
import path from 'utils/path'

const Header = () => {
    return (
        <div className='w-main min-h-[64px] flex'>
            <div className='w-[195px] flex items-center' ><Link to={`/${path.HOME}`}><img src={logo} alt='logo' /></Link></div>

            <Navigation />


            <GroupAction />
        </div>
    )
}

export default memo(Header)
