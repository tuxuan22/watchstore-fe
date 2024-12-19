import React from 'react'
import { sidebar } from 'utils/constans'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import clsx from 'clsx'

const Sidebar = () => {
    const settings = {

        infinite: false,
        slidesToShow: 5,
        slidesToScroll: 1,
    }

    const { isShowModal } = useSelector(state => state.app)

    return (

        <div className='w-main mb-5 '>
            <span className='text-[24px] font-medium my-5 flex justify-center'>Danh mục nổi bật</span>
            <Slider className='custom-slider' {...settings}>
                {sidebar.map((i) => (

                    <NavLink key={(i.name)}
                        to={(i.name)}
                    >
                        <div className='mx-2 mb-4'>
                            <img className='rounded-[10px] overflow-hidden' src={i.img} alt='' />
                        </div>
                        <div>
                            <h3 className='text-base'>{i.name}</h3>
                        </div>
                    </NavLink>

                ))}
            </Slider>
        </div>

    )
}

export default Sidebar


