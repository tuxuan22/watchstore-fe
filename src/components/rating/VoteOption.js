import { apiRatings } from 'apis'
import Button from 'components/buttons/Button'
import Loading from 'components/common/Loading'
import withBaseComponent from 'hocs/withBaseComponent'
import React, { memo, useState } from 'react'
import { toast } from 'react-toastify'
import { showModal } from 'store/app/appSlice'
import { voteOption } from 'utils/constans'
import icons from 'utils/icons'

const { MdOutlineStar } = icons

const VoteOption = ({ dispatch, nameProduct, pid, reset }) => {
    const [star, setStar] = useState(null)
    const [comment, setComment] = useState('')
    // console.log({ comment, star, pid })

    const handleSubmit = async ({ comment, star }) => {
        if (!comment || !pid || !star) {
            alert('Bạn phải điền đầy đầy đủ thông tin đánh giá')
            return
        }
        dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }))
        const response = await apiRatings({ star, comment, pid })
        dispatch(showModal({ isShowModal: false, modalChildren: null }))

        if (response.success) {
            toast.success(response.mes)
            reset()
        } else
            toast.error(response.mes)

    }

    return (
        <div onClick={e => e.stopPropagation()} className='bg-white p-4 flex flex-col w-[700px] gap-4 items-center'>
            <h2 className='text-center font-medium text-lg'>{nameProduct}</h2>
            <textarea
                className='p-4 w-full border placeholder:text-gray-500 text-sm'
                placeholder='Nhận xét của bạn về sản phẩm này'
                value={comment}
                onChange={e => setComment(e.target.value)}
            ></textarea>
            <div
                className='w-full flex flex-col gap-4 '
            >
                <p>Đánh giá của bạn về sản phẩm này</p>
                <div className='flex justify-center gap-4 items-center'>
                    {voteOption.map(el => (
                        <div
                            key={el.id}
                            className='w-[100px] h-[100px] bg-gray-100 hover:bg-gray-200  rounded-md  flex items-center justify-center flex-col gap-2'
                            onClick={() => {
                                setStar(el.id)
                            }}
                        >
                            {Number(star) && star >= el.id ? <MdOutlineStar color='orange' /> : <MdOutlineStar color='gray' />}
                            <span>{el.text}</span>
                        </div>
                    ))}
                </div>
            </div>
            <Button
                name='Gửi nhận xét'
                handleOnClick={() => handleSubmit({ comment, star })}
            />
        </div>
    )
}

export default withBaseComponent(memo(VoteOption))
