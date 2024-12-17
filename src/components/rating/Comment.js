import React from 'react'
import avatar from 'assets/avatar.png'
import moment from 'moment'
import { renderStar } from 'utils/helpers'
require('moment/locale/vi')
moment.locale('vi')

const Comment = ({ avt = avatar, name = 'name', updatedAt, star, comment }) => {
    console.log(updatedAt);

    console.log(moment(updatedAt).fromNow());

    return (
        <div className='flex mt-4 border-b'>
            <div className=' flex-none'>
                <img src={avt} alt="" className='w-[40px] h-[40px] object-cover rounded-full' />
            </div>
            <div className='flex  mb-4 flex-col flex-auto'>
                <div className='flex flex-col gap-1 pl-4'>
                    <div className='flex justify-between'>
                        <div>
                            <h3 className='font-semibold'>{name}</h3>
                            <span className='flex items-center gap-1'>
                                {renderStar(star)?.map((el, index) => (
                                    <span key={index}>{el}</span>
                                ))}
                            </span>
                        </div>
                        <span className='text-xs italic'>{moment(updatedAt)?.fromNow()}</span>
                    </div>

                    <span className='pt-4'>
                        {comment}
                    </span>

                </div>
            </div>
        </div>
    )
}

export default Comment
