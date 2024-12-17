import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { MemberSidebar } from 'components'
import path from 'utils/path'

const MemberLayout = () => {
    const { isLoggedIn, current } = useSelector(state => state.user)
    if (!isLoggedIn || !current) return <Navigate to={`/${path.LOGIN}`} replace={true}></Navigate>
    return (

        <div className='w-main flex min-h-screen '>
            <MemberSidebar />
            <div className='n w-full'>
                <Outlet />
            </div>
        </div>

    )
}

export default MemberLayout
