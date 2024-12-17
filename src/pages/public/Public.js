import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header, Footer } from 'components'

const Public = () => {
    return (
        <div className='overflow-y-auto w-full flex flex-col items-center'>
            <Header />
            <div className='min-h-screen bg-bgc w-full border-t flex flex-col items-center'>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default Public
