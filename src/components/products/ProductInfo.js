import React, { memo, useEffect, useState } from 'react'
import { productInfoTabs, tutorial } from 'utils/constans'
import DOMPurify from 'dompurify'
import { RatingLevel, Comment, Button } from 'components'
import { renderStar } from 'utils/helpers'

const ProductInfo = ({ product }) => {
    const [activedTab, setActivedTab] = useState(1)
    const [showAllComments, setShowAllComments] = useState(false)
    const displayComments = showAllComments
        ? product?.ratings
        : product?.ratings.slice(0, 3)

    return (
        <div>
            <div className='flex items-center px-2.5 relative '>
                {productInfoTabs.map(el => (
                    <span
                        className={`text-sm px-5 py-2.5 cursor-pointer border-b ${activedTab === el.id ? 'bg-main text-white' : 'hover:bg-main hover:text-white'}`}
                        key={el.id}
                        onClick={() => setActivedTab(el.id)}
                    >
                        {el.name}
                    </span>
                ))}
            </div>
            <div className='bg-white ml-2.5 px-2.5 py-4 w-[600px]'>
                {activedTab === 1 && (
                    <div >
                        <ul className='list-square text-sm text-gray-500'>
                            {product?.description?.length > 1 &&
                                product?.description?.map(el => (
                                    <li className='leading-6' key={el}>{el}</li>
                                ))}
                            {product?.description?.length === 1 && (
                                <div
                                    className='text-sm'
                                    dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(product?.description[0]),
                                    }}
                                ></div>
                            )}
                        </ul>
                    </div>
                )}
                {activedTab === 3 && (
                    <div
                        className='text-sm'
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(tutorial),
                        }}>
                    </div>
                )}
                {activedTab === 4 && (
                    <div>
                        <div className='flex'>
                            <div className='flex-3 flex flex-col items-center justify-center'>
                                <span className='font-nomal text-2xl'>{`${product.totalRatings}/5`}</span>
                                <span className='flex items-center gap-1'>{renderStar(product.totalRatings)?.map((el, index) => (
                                    <span key={index}>{el}</span>
                                ))}</span>
                                <span className='text-sm'>{`${product.ratings.length} đánh giá`}</span>
                            </div>
                            <div className='flex-7 flex flex-col gap-1 p-4'>
                                {Array.from(Array(5).keys()).reverse().map(el => (
                                    <RatingLevel
                                        key={el}
                                        number={el + 1}
                                        ratingTotal={`${product.ratings.length}`}
                                        ratingCount={`${product.ratings.filter(i => i.star === el + 1)?.length}`}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className=''>
                            {displayComments.map(el => (
                                <Comment
                                    key={el._id}
                                    star={el.star}
                                    updatedAt={el.updatedAt}
                                    comment={el.comment}
                                    name={`${el.postedBy?.firstname} ${el.postedBy?.lastname}`}
                                />
                            ))}

                            {product.ratings.length > 3 && (
                                <div className='flex justify-center mt-4'>
                                    <Button
                                        name={showAllComments ? 'Thu gọn' : 'Xem thêm đánh giá'}
                                        handleOnClick={() => setShowAllComments(prev => !prev)}
                                    >

                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default memo(ProductInfo)
