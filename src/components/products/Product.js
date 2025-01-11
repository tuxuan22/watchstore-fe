import React, { memo, useState } from 'react'
import { formatMoney, renderStar } from 'utils/helpers'
import bestSeller from 'assets/bestSeller.png'
import newPro from 'assets/newPro.png'
import offer from 'assets/offer.png'
import { SelectOption } from '../'
import icons from 'utils/icons'
import withBaseComponent from 'hocs/withBaseComponent'
import { showModal } from 'store/app/appSlice'
import { DetailProduct } from 'pages/public'
import { apiUpdateCart, apiUpdateWishlist } from 'apis'
import { toast } from 'react-toastify'
import { getCurrent } from 'store/user/asyncActions'
import { useSelector } from 'react-redux'
import path from 'utils/path'
import { createSearchParams } from 'react-router-dom'
const { IoEyeOutline, CiHeart, FaHeart, BsBagPlus } = icons

const Product = ({ productData, isNew, normal, navigate, dispatch, location, pid }) => {
    const [isShowOption, setIsShowOption] = useState(false)
    const { current } = useSelector(state => state.user)
    const handleClickOptions = async (e, flag) => {
        e.stopPropagation()
        if (flag === 'CART') {


            if (!current) navigate({
                pathname: `/${path.LOGIN}`,
                search: createSearchParams({ redirect: location.pathname }).toString()
            })
            else {
                if (productData?.quantity === 0) {
                    toast.warning('Sản phẩm đã hết hàng')
                    return
                }
                const response = await apiUpdateCart({
                    pid: productData?._id,
                    color: productData?.color,
                    quantity: 1,
                    price: productData?.price,
                    thumb: productData?.thumb,
                    title: productData?.title,


                })
                if (response.success) {
                    toast.success(response.mes)
                    dispatch(getCurrent())
                }
                else toast.error(response.mes)
            }
        }
        if (flag === 'WISHLIST') {

            const response = await apiUpdateWishlist(pid)
            if (response.success) {
                dispatch(getCurrent())
                toast.success(response.mes)
            } else
                navigate({
                    pathname: `/${path.LOGIN}`,
                    search: createSearchParams({ redirect: location.pathname }).toString()
                })
        }
        if (flag === 'QUICK_VIEW') {
            dispatch(showModal({ isShowModal: true, modalChildren: <DetailProduct data={{ pid: productData?._id, category: productData?.category, title: productData?.title }} isQuickView /> }))
        }
    }

    return (
        <div className='bg-white h-[325px] border-solid border rounded mx-2 mb-4 p-2.5'>
            <div
                onClick={e => navigate(`/${productData?.category}/${productData?.title}/${productData?._id}`)}
                onMouseEnter={e => {
                    e.stopPropagation()
                    setIsShowOption(true)
                }}
                onMouseLeave={e => {
                    e.stopPropagation()
                    setIsShowOption(false)
                }}
            >
                <div className='relative'>
                    {isShowOption && <div
                        className='absolute flex flex-col w-[40px] h-[calc(100%-20px)] justify-center right-[10px] bottom-[10px] animate-slide-top z-40'
                    >
                        <span
                            className='cursor-pointer'
                            title='Yêu thích' onClick={(e) => handleClickOptions(e, 'WISHLIST')}
                        >
                            {/* <SelectOption icon={<CiHeart color={current?.wishlist?.some((i) => i === pid) ? 'red' : ''} />} /> */}
                            <SelectOption icon={current?.wishlist?.some(i => i._id === pid) ? <FaHeart color='red' /> : <CiHeart />} />
                        </span>
                        <span
                            className='cursor-pointer'
                            title='Xem nhanh' onClick={(e) => handleClickOptions(e, 'QUICK_VIEW')}
                        >
                            <SelectOption icon={<IoEyeOutline />} />
                        </span>
                        {current?.cart?.some(el => el.product === productData._id)
                            ? <span className='cursor-pointer' title='Đã có trong giỏ hàng' >  <SelectOption icon={<BsBagPlus />} /></span>
                            : <span className='cursor-pointer' title='Thêm vào giỏ hàng' onClick={(e) => handleClickOptions(e, 'CART')}>  <SelectOption icon={<BsBagPlus />} /></span>
                        }
                    </div>}
                    <div className='flex justify-center'>
                        <img className='  relative w-[196px] h-[196px] object-cover mb-4'
                            src={productData?.thumb || 'https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg'} alt="" >
                        </img>
                    </div>
                    {!normal && <img src={isNew ? newPro : bestSeller || offer} alt="" className='absolute w-[35px] top-0 m-2' />}
                </div>
                <div className='flex justify-center'> {renderStar(productData?.totalRatings)?.map((el, index) => (<span key={index}>{el}</span>))} </div>

                <span className='mx-2 flex text-center text-base '>
                    <a className='line-clamp-2' href={productData.pid} title={productData.title}>{productData.title}</a>
                </span>
                {productData?.discount > 0 ? (
                    <div className='flex items-center gap-1'>

                        <span className='line-through text-sm text-gray-400'>
                            {formatMoney(productData?.price)}
                        </span>
                        <span className='text-main text-[16px] font-medium'>
                            {formatMoney(productData?.price * (1 - productData?.discount / 100))}
                        </span>

                    </div>
                ) : (
                    <div className='text-[#eb0000] text-base block text-center font-semibold'>{formatMoney(productData.price)} </div>)}
            </div>
        </div >
    )
}

export default withBaseComponent(memo(Product))
