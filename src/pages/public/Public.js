import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header, Footer } from 'components'

const Public = () => {
    return (
        <div className='overflow-y-auto max-h-screen w-full flex flex-col items-center'>
            <Header />
            <div className=' bg-bgc  w-full border-t flex flex-col items-center'>
                <div className='min-h-[600px]'>
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Public
