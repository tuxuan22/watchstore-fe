import React from 'react'
import { Sidebar, Banner, ProductTab } from 'components'
import { Link } from 'react-router-dom'

const brands = [
    {
        id: 1,
        name: 'Casio',
        image: 'https://www.watchstore.vn/images/manu_collections/2024/04/08/small/cs_1712552756.webp',
    },
    {
        id: 2,
        name: 'Citizen',
        image: 'https://www.watchstore.vn/images/manu_collections/2024/04/08/small/ct_1712552756.webp',
    },
    {
        id: 3,
        name: 'Seiko',
        image: 'https://www.watchstore.vn/images/manu_collections/2024/04/08/small/logo-seiko_1712552756.webp',
    },
    {
        id: 4,
        name: 'Orient',
        image: 'https://www.watchstore.vn/images/manu_collections/2024/04/08/small/ov_1712552756.webp',
    },
    {
        id: 5,
        name: 'Hublot',
        image: 'https://www.watchstore.vn/images/manu_collections/2024/04/08/small/hb_1712552838.webp',
    },
    {
        id: 6,
        name: 'Tissot',
        image: 'https://www.watchstore.vn/images/manu_collections/2024/04/08/small/logo-tissot_1712552859.webp',
    },
    // {
    //     id: 7,
    //     name: 'G-Shock',
    //     image: 'https://www.watchstore.vn/images/manu_collections/2024/04/08/small/gk_1712552838.webp',
    // },
    // {
    //     id: 8,
    //     name: 'Bentley',
    //     image: 'https://www.watchstore.vn/images/manu_collections/2024/04/08/small/bl_1712552756.webp',
    // },
];

const Home = () => {
    return (
        <div className='w-full flex flex-col items-center mb-5 px-4 lg:px-0 gap-5'>
            <div className=' sm:w-[768px] md:w-[1024px] lg:w-full '>
                <Banner />
            </div>
            <Sidebar />
            <ProductTab />
            <div className="w-main max-w-7xl mx-auto py-8">
                <h2 className="text-2xl font-medium text-center mb-8">Thương hiệu nổi bật</h2>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-6 px-4">
                    {brands.map((brand) => (
                        <Link
                            key={brand.id}
                            to={`/tat-ca-san-pham?brand=${brand.name}`}
                            className="group"
                        >
                            <div className="bg-white p-4 rounded-lg shadow-md transition-transform hover:scale-105">
                                <img
                                    src={brand.image}
                                    alt={brand.name}
                                    className="w-full h-10 object-contain"
                                />
                                {/* <p className="text-center mt-2 font-medium">{brand.name}</p> */}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home
