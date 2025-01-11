import React, { memo } from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import { Product } from 'components'


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

const CustomSlider = ({ products, activedTab, normal }) => {


    return (

        <div >
            {products && <Slider className='custom-slider' {...settings}>
                {products?.map((el, index) => (
                    <Product
                        key={index}
                        pid={el._id}
                        productData={el}
                        isNew={activedTab === 1 ? false : true || ''}
                        normal={normal}
                    />
                ))}
            </Slider>}
        </div>


    )
}

export default memo(CustomSlider)
