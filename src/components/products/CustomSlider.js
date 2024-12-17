import React, { memo } from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import { Product } from 'components'
import clsx from 'clsx'
import { useSelector } from 'react-redux'

const settings = {

    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 1,
}

const CustomSlider = ({ products, activedTab, normal }) => {

    const { isShowModal } = useSelector(state => state.app)

    return (
        <div className='h-[341px]'>
            <div className={clsx(isShowModal ? ' hidden' : '')}>
                {products && <Slider className='custom-slider' {...settings}>
                    {products?.map((el, index) => (
                        <Product
                            key={index}
                            pid={el.id}
                            productData={el}
                            isNew={activedTab === 1 ? false : true || ''}
                            normal={normal}
                        />
                    ))}
                </Slider>}
            </div>
        </div>

    )
}

export default memo(CustomSlider)
