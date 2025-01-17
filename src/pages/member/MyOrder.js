import { apiGetUserOrders, apiGetUserRatings } from 'apis'
import { Button, DetailOrder, InputForm, Pagination, VoteOption } from 'components'
import withBaseComponent from 'hocs/withBaseComponent'
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { createSearchParams, useSearchParams } from 'react-router-dom'
import { formatMoney } from 'utils/helpers'
import { orderStatus } from 'utils/constans'
import { showModal } from 'store/app/appSlice'
import { useSelector } from 'react-redux'

const MyOrder = ({ navigate, location, dispatch }) => {
    const [statusTab, setStatusTab] = useState('all')
    const [orders, setOrders] = useState([])
    const [counts, setCounts] = useState(0)
    const [userRatings, setUserRatings] = useState([])
    const [params] = useSearchParams()
    const { current } = useSelector((state) => state.user)

    const { register, formState: { errors }, watch, setValue } = useForm()
    const q = watch('q')
    const fetchOrders = async (params) => {
        if (params.status === 'all') {
            delete params.status
        }
        const response = await apiGetUserOrders({
            ...params,
            limit: 5,
            sort: '-createdAt'
            // isMine: true
        })

        if (response.success) {
            setCounts(response.counts)
            setOrders(response.orders)
        }
    }

    const fetchUserRatings = async () => {
        const response = await apiGetUserRatings()
        if (response.success) setUserRatings(response.ratings)

    }
    const handleRatingSuccess = () => {
        const qr = Object.fromEntries([...params])
        fetchOrders(qr)
        fetchUserRatings()
    }

    useEffect(() => {
        const qr = Object.fromEntries([...params])
        fetchOrders(qr)
    }, [params])

    useEffect(() => {
        fetchUserRatings()
    }, [])

    const hasUserRated = useCallback((product) => {
        return orders.some(order =>
            // order.status === 'Succeed' &&
            order.products?.some(item =>
                item.product._id === product._id &&
                product.ratings?.some(rating =>
                    rating.postedBy.toString() === current?._id
                )
            )
        )

    }, [orders, current])

    console.log(orders)

    const handleSearchStatus = ({ status }) => {
        setStatusTab(status)
        navigate({
            pathname: location.pathname,
            search: createSearchParams({ status }).toString()
        })
    }



    return (
        <div className=''>
            <div className='w-full bg-bgc my-8'>
                <header className='text-2xl font-semibold p-4 border-b '>
                    Đơn hàng của tôi
                </header>

                <div className='flex  overflow-x-auto mx-4 mt-4'>
                    {orderStatus.map((el) => (
                        <button
                            key={el.value}
                            onClick={() =>
                                handleSearchStatus({ status: el.value })
                            }
                            className={`px-4 py-2 bg-white border
                            ${statusTab === el.value ? ' text-main' : 'hover:text-main'}`}
                        >
                            {el.label}
                        </button>
                    ))}
                </div>

                <div className='flex justify-end py-4' >
                    <form className='w-full mx-4'>
                        <InputForm
                            id='q'
                            register={register}
                            errors={errors}
                            placeholder='Tìm kiếm theo tên sản phẩm,...'
                            fullWidth
                            className={'w-[500px] border border-gray-200'}
                        />
                    </form>

                </div>
                <div className='flex flex-col'>
                    {orders.length > 0
                        ? (<div>
                            {orders?.map((el) => (
                                <div key={el._id} className='m-4 p-4 bg-white flex flex-col gap-4 justify-between'>
                                    {el.products?.map((item) => (
                                        <div key={item._id} className='flex justify-between gap-2'>
                                            <div className='flex gap-2'>
                                                <img src={item.product.thumb} alt='thumb' className='w-16 h-16 border rounded-md  object-cover' />
                                                <div className='flex flex-col gap-1'>
                                                    <span className='text-sm line-clamp-1'>{item.product.title}</span>
                                                    <span className='text-xs'>{item.product.color}</span>
                                                    <span className='text-sm' >Số lượng: {item.quantity}</span>
                                                </div>
                                            </div>
                                            <span className=' flex flex-col justify-end text-sm' >
                                                <span>{formatMoney(Number(item.product.price))}</span>
                                                {!hasUserRated(item.product)
                                                    ? (
                                                        <Button name='Đánh giá'
                                                            handleOnClick={() => dispatch(showModal({
                                                                isShowModal: true, modalChildren:
                                                                    <VoteOption
                                                                        reset={handleRatingSuccess}
                                                                        pid={item.product} nameProduct={item.title} />
                                                            }))}
                                                        />
                                                    )
                                                    : (
                                                        <div className=' my-2 w-[87px] h-[36px]'>

                                                        </div>
                                                    )}

                                            </span>
                                        </div>
                                    ))}
                                    <hr />
                                    <span className=' flex justify-end p-2 text-red-500'>{formatMoney(el?.products.reduce((sum, el) => sum + Number(el?.product.finalPrice * el.quantity), 0))}</span>
                                    <div className='flex justify-end'>
                                        <span
                                            onClick={() => dispatch(showModal({ isShowModal: true, modalChildren: <DetailOrder orders={el} products={el.products} /> }))}
                                            className={'cursor-pointer p-2 rounded-md border border-blue-400   text-blue-400 hover:text-white hover:bg-blue-400 '}
                                        >Xem chi tiết</span>
                                    </div>
                                </div>
                            ))}
                        </div>)
                        : (
                            <div className='flex justify-center mt-8'>
                                <span className='text-gray-500 text-lg'>
                                    Chưa có đơn hàng
                                </span>
                            </div>
                        )}

                </div>

                <div className='flex justify-center'>
                    <Pagination
                        totalCount={counts}
                    />
                </div>
            </div>
        </div>
    )
}

export default withBaseComponent(MyOrder)
