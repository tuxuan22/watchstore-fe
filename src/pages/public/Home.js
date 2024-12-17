import React from 'react'
import { Sidebar, Banner, ProductTab } from 'components'

const Home = () => {
    return (
        <div className='w-full flex flex-col items-center mb-5'>
            <Banner />
            <Sidebar />
            <ProductTab />
        </div>
    )
}

export default Home
