import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { createSearchParams, useParams } from 'react-router-dom'
import { apiGetProduct, apiGetProducts, apiUpdateCart, apiUpdateWishlist } from 'apis'
import { BreadCrumb, Button, CustomSlider, ProductInfo, SelectOption, SelectQuantity } from 'components'
import { renderStar, formatMoney, formatPrice } from 'utils/helpers'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import clsx from 'clsx'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import withBaseComponent from 'hocs/withBaseComponent'
import path from 'utils/path'
import { toast } from 'react-toastify'
import { getCurrent } from 'store/user/asyncActions'
import icons from 'utils/icons'

const { CiHeart, FaHeart } = icons

const DetailProduct = ({ isQuickView, data, dispatch, navigate, location }) => {
    const settings = {
        infinite: false,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    // slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    // slidesToScroll: 1,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 2,
                    // slidesToScroll: 1,

                }
            }
        ]
    }
    const params = useParams()
    const { current } = useSelector(state => state.user)
    const titleRef = useRef()
    const [product, setProduct] = useState(null)
    const [productRelate, setProductRelate] = useState(null)
    const [pid, setPid] = useState(null)
    const [title, setTitle] = useState(null)
    const [category, setCategory] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null)
    const [selectedProduct, setSelectedProduct] = useState({
        title: '',
        color: '',
        thumb: '',
        images: [],
        price: ''
    })
    const [update, setUpdate] = useState(false)
    const [quantity, setQuantity] = useState(1)
    const [variant, setVariant] = useState(null)

    useEffect(() => {
        if (data) {
            setPid(data.pid)
            setTitle(data.title)
            setCategory(data.category)
        } else if (params && params.pid) {
            setPid(params.pid)
            setTitle(params.title)
            setCategory(params.category)
        }

    }, [data, params]);

    const fetchProduct = async () => {
        const response = await apiGetProduct(pid)
        if (response.success) {
            setProduct(response.productData)
            setSelectedImage(response.productData?.thumb)
        }
    }

    useEffect(() => {
        if (variant) {
            setSelectedProduct({
                title: product?.variants?.find(el => el.sku === variant)?.title,
                color: product?.variants?.find(el => el.sku === variant)?.color,
                thumb: product?.variants?.find(el => el.sku === variant)?.thumb,
                images: product?.variants?.find(el => el.sku === variant)?.images,
                price: product?.variants?.find(el => el.sku === variant)?.price
            })
        } else {
            setSelectedProduct({
                title: product?.title,
                color: product?.color,
                thumb: product?.thumb,
                images: product?.images || [],
                price: product?.price
            })
        }
    }, [variant]);

    const fetchProducts = async () => {
        const response = await apiGetProducts({ category })
        if (response.success) {
            setProductRelate(response.products)

        }
    }

    useEffect(() => {
        if (pid) {
            fetchProduct()
            fetchProducts()
        }
        window.scrollTo(0, 0)
        titleRef.current.scrollIntoView({ block: 'start' });
    }, [pid])

    useEffect(() => {
        if (pid) fetchProduct()
    }, [update])


    const handleQuantity = useCallback((number) => {
        if (number === '') {
            setQuantity('')
        }
        if (!Number(number) || Number(number) < 1) {
            return
        } else {
            setQuantity(number)
        }
    }, [])

    const handleClickImage = (e, el) => {
        e.stopPropagation()
        setSelectedImage(el)
    }

    const handleChangeQuantity = useCallback((flag) => {
        if (flag === 'minus' && quantity === 1) return
        if (flag === 'minus') setQuantity(prev => +prev - 1)
        if (flag === 'plus') setQuantity(prev => +prev + 1)


    }, [quantity])

    const handleAddToCart = async () => {
        if (!current) return Swal.fire({
            title: 'Bạn phải đăng nhập để thêm vào giỏ hàng',
            text: 'Đăng nhập để mua hàng hoặc thêm vào giỏ hàng',
            icon: 'info',
            confirmButtonText: 'Đăng nhập',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            showCancelButton: true,
            cancelButtonText: 'Hủy'
        }).then((rs) => {
            if (rs.isConfirmed) navigate({
                pathname: `/${path.LOGIN}`,
                search: createSearchParams({ redirect: location.pathname }).toString()
            })
        })

        if (product?.quantity === 0) {
            toast.warning('Sản phẩm đã hết hàng')
            return
        }

        if (quantity > product?.quantity) {
            toast.warning(`Chỉ còn ${product?.quantity} sản phẩm`)
            setQuantity(product?.quantity)
            return
        }

        const currentProductInCart = current?.cart?.find(el =>
            el.product._id === pid
        )
        const currentCartQuantity = currentProductInCart?.quantity || 0

        const availableQuantity = product?.quantity - currentCartQuantity

        if (availableQuantity === 0) {
            toast.warning('Đã đạt số lượng tối đa trong giỏ hàng')
            return
        }

        if (quantity > availableQuantity) {
            toast.warning(`Chỉ có thể thêm ${availableQuantity} sản phẩm vào giỏ hàng`)
            setQuantity(availableQuantity)
            return
        }

        const response = await apiUpdateCart({
            pid,
            color: selectedProduct?.color || product?.color,
            quantity,
            price: selectedProduct?.price || product?.price,
            thumb: selectedProduct?.thumb || product?.thumb,
            title: selectedProduct?.title || product?.title,

        })
        if (response.success) {
            toast.success(response.mes)
            dispatch(getCurrent())
        }
        else toast.error(response.mes)

    }

    const handleWishlist = async (e) => {
        // e.stopPropagation()
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

    return (
        <div
            ref={titleRef}
            onClick={e => e.stopPropagation()}
            className='bg-bgc w-main flex flex-col items-center px-4 lg:px-0'
        >
            {!isQuickView && <div className='w-main p-4'>
                <BreadCrumb title={title} category={category} />
            </div>}
            <div className='w-main my-4 flex justify-center'>
                <div className='flex-1 flex flex-col gap-4 items-center px-2.5'>
                    <img src={selectedProduct.thumb || selectedImage} alt="product" className='w-[565px] h-[565px] object-cover' />
                    {!isQuickView && <div className=' w-10/12'>
                        <Slider className='sub-product-slider' {...settings}>
                            {selectedProduct.images.length === 0 && product?.images?.map((el, index) => (
                                <div className='mx-2' key={el} onClick={() => setSelectedImage(el)}>
                                    <img
                                        onClick={e => handleClickImage(e, el)}
                                        src={el}
                                        alt="sub-product"
                                        className='border w-[85px] h-[85px] object-cover cursor-pointer '
                                    />
                                </div>
                            ))}
                            {selectedProduct.images.length > 0 && selectedProduct?.images?.map((el, index) => (
                                <div className='mx-2' key={index} onClick={() => setSelectedImage(el)}>
                                    <img
                                        onClick={e => handleClickImage(e, el)}
                                        src={el}
                                        alt="sub-product"
                                        className={'border w-[85px] h-[85px] object-cover cursor-pointer '}
                                    />
                                </div>
                            ))}
                        </Slider>
                    </div>}
                </div>
                <div className='flex-1 flex flex-col px-2.5'>
                    <p className='text-sm'>Thương hiệu: <span> {`${product?.brand}`}</span>
                    </p>
                    <h1 className='text-xl mb-2'>{`${product?.title}`}</h1>
                    <div className='flex mb-1 items-center'>
                        {renderStar(product?.totalRatings)?.map(el => (<span key={el}>{el}</span>))}
                    </div>
                    {/* <span className='text-red-600 text-2xl mb-2'>{`${formatMoney(formatPrice(selectedProduct?.price || product?.price))}`}</span> */}
                    {product?.discount > 0 ? (
                        <div className='flex items-center gap-1'>

                            <span className='line-through text-lg text-gray-400'>
                                {formatMoney(product?.price || 0)}
                            </span>
                            <span className='text-main text-2xl font-medium'>
                                {formatMoney((product?.price || 0) * (1 - product?.discount / 100))}
                            </span>

                        </div>
                    ) : (
                        <div className='text-main text-2xl'>{formatMoney(product?.price || 0)} </div>

                    )}
                    <div className='flex my-4 gap-2 items-center'>
                        <span className='font-semibold'>Màu </span>
                        <div className='flex flex-wrap gap-2 items-center w-full'>
                            <div onClick={() => setVariant(null)}
                                className={clsx('flex items-center gap-1 rounded-full border cursor-pointer ', !variant && ' border-black')}>
                                <img title={product?.color} src={product?.thumb} alt="thumb" className='  w-[40px] h-[40px] border bg-white rounded-full object-cover' />
                            </div>
                            {product?.variants?.map(el => (
                                <div key={el.sku} onClick={() => setVariant(el.sku)}
                                    className={clsx('flex items-center gap-1 rounded-full border cursor-pointer', variant === el.sku && ' border-black')}>
                                    <img title={el.color} src={el.thumb} alt="thumb" className='  w-[40px] h-[40px] border bg-white rounded-full object-cover' />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='flex gap-2'>
                        {product?.quantity > 0 ? (
                            <>
                                <SelectQuantity
                                    quantity={quantity}
                                    handleQuantity={handleQuantity}
                                    handleChangeQuantity={handleChangeQuantity}
                                />
                                <Button handleOnClick={handleAddToCart} name='Thêm vào giỏ hàng'
                                    styles='h-[40px] bg-main text-white w-[200px] rounded-md hover:bg-white hover:border-main hover:text-main hover:border'
                                />
                            </>

                        )
                            : (
                                <span className='h-[40px] flex items-center justify-center text-red-500 font-normal text-md p-4 w-1/2 border border-red-500 cursor-pointer'>
                                    Sản phẩm đã hết hàng
                                </span>
                            )
                        }
                        <span
                            className='cursor-pointer'
                            title='Yêu thích' onClick={(e) => handleWishlist(e)}
                        >
                            <SelectOption
                                styles={current?.wishlist?.some(i => i._id === pid)
                                    ? 'w-[40px] h-[40px] flex items-center justify-center border border-red-500 rounded-md hover:bg-red-600 hover:text-white cursor-pointed '
                                    : 'w-[40px] h-[40px] flex items-center justify-center border border-black hover:border-none rounded-md hover:bg-red-600 hover:text-white cursor-pointed p-2'}
                                icon={current?.wishlist?.some(i => i._id === pid)
                                    ? <FaHeart color='red' size={20} />
                                    : <CiHeart size={20} />}
                            />
                        </span>
                    </div>
                </div>
            </div>
            {!isQuickView && <div className=' w-main my-4 '>
                <ProductInfo product={product} totalCount={18} />
            </div>}
            {!isQuickView && <div className='sm:w-[540px] md:w-[940px] lg:w-main mb-5 my-4'>
                <h3 className='mb-4 mx-4 text-2xl font-medium'>Sản phẩm tương tự</h3>
                <CustomSlider
                    normal={true}
                    products={productRelate?.filter(el => el._id !== product._id)}
                />
            </div>}
        </div>
    )
}

export default withBaseComponent(DetailProduct)
