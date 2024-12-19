import { BreadCrumb, Product, SearchItem, InputSelect, Pagination } from 'components'
import React, { useCallback, useEffect, useState } from 'react'
import { createSearchParams, useParams, useSearchParams } from 'react-router-dom'
import { apiGetProducts } from 'apis'
import Masonry from 'react-masonry-css'
import { sortBy } from 'utils/constans'
import withBaseComponent from 'hocs/withBaseComponent'

const breakpointColumnsObj = {
    default: 5,
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
        const response = await apiGetProducts({ ...queries, limit: 5 })
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
        <div>
            <div className=' w-main p-4'>
                <BreadCrumb category={category} />
            </div>
            <div className='w-main p-4 flex'>
                <div className='w-4/5 flex flex-col gap-2'>
                    <span className='font-semibold text-md'>Bộ lọc</span>
                    <div className='flex items-center gap-3'>
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

                </div>
                <div className='w-1/5  flex flex-col gap-2'>
                    <span className='font-semibold text-md'>Bộ lọc</span>
                    <div className='w-full'>
                        <InputSelect
                            value={sort}
                            options={sortBy}
                            changeValue={changeValue}
                        />
                    </div>

                </div>
            </div>
            <div className='w-main p-4'>
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid flex mx-[-10px]"
                    columnClassName="my-masonry-grid_column">
                    {products?.products?.map((el, index) => (
                        <Product
                            key={index}
                            pid={el.id}
                            productData={el}
                            normal={true}
                        />
                    ))}
                </Masonry>
            </div>

            <div className='w-main p-4 flex justify-center'>
                <Pagination totalCount={products?.counts}
                />
            </div>

        </div>
    )
}

export default withBaseComponent(Products)
