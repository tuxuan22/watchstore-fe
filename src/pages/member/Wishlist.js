import { Product } from 'components'
import React from 'react'
import { useSelector } from 'react-redux'

const Wishlist = () => {
    const { current } = useSelector(state => state.user)
    return (
        <div className='w-full bg-bgc my-8'>
            <header className='text-2xl font-semibold p-4 border-b '>
                Sản phẩm yêu thích
            </header>
            {current?.wishlist?.length > 0 ? (
                // <div className='py-4 w-full grid grid-cols-4'>

                <div className='py-4 w-full grid grid-cols-4'>
                    {current?.wishlist?.map((el) => (
                        <div key={el._id}>
                            <Product
                                pid={el._id}
                                productData={el}
                                normal={true}
                            />
                        </div>
                    ))}
                </div>
                // </div>
            ) : (
                <div className='flex items-center justify-center py-8'>
                    <p className='text-gray-500'>Bạn chưa có sản phẩm yêu thích nào</p>
                </div>
            )}
        </div>
    )
}

export default Wishlist
