import React, { useEffect, useRef } from 'react'
import icons from 'utils/icons'

const { MdOutlineStar } = icons

const RatingLevel = ({ number, ratingCount, ratingTotal }) => {
    const persentRef = useRef()
    useEffect(() => {
        if (ratingCount > 0) {
            persentRef.current.style.cssText = `right:${100 - Math.round(ratingCount * 100 / ratingTotal)}%`
        } else {
            persentRef.current.style.cssText = 'right:100%'
        }
    }, [ratingCount, ratingTotal])
    return (
        <div className='flex items-center gap-2'>
            <div className='flex w-[10%] items-center justify-center gap-1 text-sm'>
                <span>{number}</span>
                <MdOutlineStar color='orange' />
            </div>
            <div className='w-[72%]'>
                <div className='w-full h-[6px] relative bg-gray-200 rounded'>
                    <div ref={persentRef} className='absolute inset-0 bg-main rounded'></div>
                </div>
            </div>
            <div className='w-[18%] flex justify-end text-xs'>{`${ratingCount || 0} đánh giá`}</div>
        </div>
    )
}

export default RatingLevel
