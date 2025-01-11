import { BreadCrumb, Product, SearchItem, InputSelect, Pagination } from 'components'
import React, { useCallback, useEffect, useState } from 'react'
import { createSearchParams, useParams, useSearchParams } from 'react-router-dom'
import { apiGetProducts } from 'apis'
import Masonry from 'react-masonry-css'
import { sortBy } from 'utils/constans'
import withBaseComponent from 'hocs/withBaseComponent'

const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
}

const Products = ({ navigate }) => {
    const [products, setProducts] = useState(null)
    const [activeClick, setActiveClick] = useState(null)
    const [params] = useSearchParams()
    const [sort, setSort] = useState('')
    const { category } = useParams()

    const fetchProductsByCategory = async (queries) => {
        if (category && category !== 'tat-ca-san-pham') queries.category = category
        const response = await apiGetProducts({ ...queries, limit: 8 })
        if (response.success) setProducts(response)

    }


    useEffect(() => {
        const queries = Object.fromEntries([...params])
        let priceQuery = {}
        if (queries.to && queries.from) {
            priceQuery = {
                $and: [
                    { price: { gte: queries.from } },
                    { price: { lte: queries.to } }
                ]
            }

            delete queries.price
        } else {
            if (queries.from) queries.price = { gte: queries.from }
            if (queries.to) queries.price = { lte: queries.to }
        }

        delete queries.to
        delete queries.from


        const q = { ...priceQuery, ...queries }

        fetchProductsByCategory(q)
        window.scrollTo(0, 0)
    }, [params])

    const changeActiveFilter = useCallback((name) => {
        if (activeClick === name) setActiveClick(null)
        else setActiveClick(name)
    }, [activeClick])


    const changeValue = useCallback((value) => {
        setSort(value)
    }, [])

    useEffect(() => {
        if (sort) {
            navigate({
                pathname: `/${category}`,
                search: createSearchParams({
                    sort
                }).toString(),
            })
        }
    }, [sort, category, navigate])

    return (
        <div className='bg-bgc'>
            <div className=' w-main p-4'>
                <BreadCrumb category={category} />
            </div>
            <div className='w-main flex'>
                <div className='w-1/4 flex flex-col gap-4 mr-2 p-4'>
                    <span className='font-semibold text-lg'>Bộ lọc</span>
                    <SearchItem
                        name='Thương hiệu'
                        changeActiveFilter={changeActiveFilter}
                        activeClick={activeClick}

                    />
                    <SearchItem
                        name='Giá'
                        changeActiveFilter={changeActiveFilter}
                        activeClick={activeClick}
                        type='input'
                    />

                </div>
                <div className='w-3/4 flex flex-col gap-4 ml-2 p-4'>
                    <div className='flex justify-end'>

                        <div className='flex flex-col gap-2'>
                            <span className='font-semibold text-lg'>Sắp xếp</span>
                            <InputSelect
                                value={sort}
                                options={sortBy}
                                changeValue={changeValue}
                            />
                        </div>

                    </div>

                    <div>
                        {products?.products?.length === 0 && (
                            <div className='flex flex-col items-center justify-center p-8'>
                                <span className='text-gray-500 text-lg'>
                                    Không tìm thấy sản phẩm nào
                                </span>
                                <span className='text-gray-400 text-sm mt-2'>
                                    Vui lòng thử lại
                                </span>
                            </div>
                        )}
                        <Masonry
                            breakpointCols={breakpointColumnsObj}
                            className="my-masonry-grid flex mx-[-10px]"
                            columnClassName="my-masonry-grid_column">
                            {products?.products?.map((el) => (
                                <Product
                                    key={el._id}
                                    pid={el._id}
                                    productData={el}
                                    normal={true}
                                />
                            ))}

                        </Masonry>
                    </div>
                    <div className=' flex justify-center'>
                        <Pagination totalCount={products?.counts}
                        />
                    </div>
                </div>
            </div>


        </div>
    )
}

export default withBaseComponent(Products)
