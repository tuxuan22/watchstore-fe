import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import path from 'utils/path'
import { AdminSidebar } from 'components'

const AdminLayout = () => {
    const { isLoggedIn, current } = useSelector(state => state.user)
    if (!isLoggedIn || !current || +current.role !== 1234) return <Navigate to={`/${path.LOGIN}`} replace={true}></Navigate>
    return (
        <div className='bg-bgc flex w-full min-h-screen relative '>
            <div className='w-[290px] top-0 bottom-0 flex-none fixed'>
                <AdminSidebar />
            </div>
            <div className='w-[290px]'></div>
            <div className='flex-auto'>
                <Outlet />
            </div>
        </div>
    )
}

export default AdminLayout
