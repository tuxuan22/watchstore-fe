import React, { memo, useEffect, useState } from 'react'
import { createSearchParams, useParams, useSearchParams } from 'react-router-dom'
import useDebounce from 'hooks/useDebounce'
import { apiGetProducts } from 'apis'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css' // Import rc-slider styles
import icons from 'utils/icons'
import { brands } from 'utils/constans'
import withBaseComponent from 'hocs/withBaseComponent'

const { MdOutlineKeyboardArrowDown } = icons

const SearchItem = ({ name, activeClick, changeActiveFilter, type = 'checkbox', navigate }) => {
    const { category } = useParams()
    const [params] = useSearchParams()
    const [selected, setSelected] = useState([])
    const [price, setPrice] = useState([0, 200000000])
    const [bestPrice, setBestPrice] = useState(null)

    const handleSelect = (e) => {
        const alreadyEl = selected.find(el => el === e.target.value)
        if (alreadyEl) setSelected(prev => prev.filter(el => el !== e.target.value))
        else setSelected(prev => [...prev, e.target.value])
        changeActiveFilter(null)
    }

    const fetchPriceProduct = async () => {
        const response = await apiGetProducts({ sort: '-price', limit: 1 })
        if (response.success) setBestPrice(response.products[0]?.price)
    }

    useEffect(() => {
        let param = []
        for (let i of params.entries()) param.push(i)
        const queries = {}
        for (let i of param) queries[i[0]] = i[1]
        if (selected.length > 0) {
            queries.brand = selected.join(',')
        } else delete queries.brand
        queries.page = '1'
        navigate({
            pathname: `/${category}`,
            search: createSearchParams(queries).toString(),

        }, { replace: true })
    }, [selected])

    useEffect(() => {
        if (type === 'input') fetchPriceProduct()
    }, [type])

    const debouncePrice = useDebounce(price, 500)
    useEffect(() => {
        let param = []
        for (let i of params.entries()) param.push(i)
        const queries = {}
        for (let i of param) queries[i[0]] = i[1]

        if (debouncePrice[0] > 0) queries.from = debouncePrice[0]
        else delete queries.from
        if (debouncePrice[1] < Number(bestPrice)) queries.to = debouncePrice[1]
        else delete queries.to

        queries.page = '1'

        navigate({
            pathname: `/${category}`,
            search: createSearchParams(queries).toString(),
        }, { replace: true })
    }, [debouncePrice])

    return (
        <div
            className='p-2 cursor-pointer text-xs gap-4 bg-white relative border flex justify-center items-center'
            onClick={() => changeActiveFilter(name)}
        >
            <span>{name}</span>
            <MdOutlineKeyboardArrowDown />
            {activeClick === name && (
                <div className='absolute top-[calc(100%+1px)] left-0 z-50 w-fit p-4 border bg-white min-w-[150px]'>
                    {type === 'checkbox' && (
                        <div onClick={e => e.stopPropagation()} className=''>
                            <div className='border-b p-2 flex items-center justify-between '>
                                <span className='whitespace-nowrap'>{`${selected.length}`}</span>
                                <span
                                    onClick={e => {
                                        e.stopPropagation()
                                        setSelected([])
                                        changeActiveFilter(null)

                                    }}
                                    className='underline hover:text-main cursor-pointer'
                                >
                                    Đặt lại
                                </span>
                            </div>
                            <div onClick={e => e.stopPropagation()} className='mt-2 flex flex-col gap-2'>
                                {brands.map((el, index) => (
                                    <div key={index} className='flex items-center gap-2'>
                                        <input
                                            type="checkbox"
                                            name={el}
                                            value={el}
                                            onClick={handleSelect}
                                            id={el}
                                            checked={selected.some(selectedItem => selectedItem === el)}
                                        />
                                        <label htmlFor={el}>{el}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {type === 'input' && (
                        <div className='w-[300px]' onClick={e => e.stopPropagation()}>
                            <div className='border-b p-2 flex items-center justify-between'>
                                <span className='whitespace-nowrap'>
                                    {`Giá: ${Number(price[0]).toLocaleString()} đ - ${Number(price[1]).toLocaleString()} đ`}
                                </span>
                                <span
                                    onClick={e => {
                                        e.stopPropagation()
                                        setPrice([0, bestPrice])
                                        changeActiveFilter(null)
                                    }}
                                    className='underline hover:text-main cursor-pointer'
                                >
                                    Đặt lại
                                </span>
                            </div>
                            <div className='flex justify-center'>
                                <div className='p-2 w-[270px] '>
                                    <Slider
                                        range
                                        min={0}
                                        max={bestPrice || 200000000}
                                        step={1000000}
                                        value={price}
                                        onChange={setPrice}
                                        marks={{
                                            0: '0đ',
                                            [bestPrice || 200000000]: `${(bestPrice || 200000000).toLocaleString()}đ`,
                                        }}
                                        className="mt-4 "
                                    />

                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default withBaseComponent(memo(SearchItem))
