import React, { memo, useEffect, useState } from 'react'
import { createSearchParams, useParams, useSearchParams } from 'react-router-dom'
import useDebounce from 'hooks/useDebounce'
import { apiGetBrands, apiGetProducts } from 'apis'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css' // Import rc-slider styles
import withBaseComponent from 'hocs/withBaseComponent'


const SearchItem = ({ name, activeClick, changeActiveFilter, type = 'checkbox', navigate }) => {
    const { category } = useParams()
    const [params] = useSearchParams()
    const [brands, setBrands] = useState([])

    const [selected, setSelected] = useState([])
    const [price, setPrice] = useState([0, 200000000])
    const [bestPrice, setBestPrice] = useState(null)

    const fetchBrands = async () => {
        const response = await apiGetBrands()
        if (response.success) {
            setBrands(response.brands)
        }
    }

    useEffect(() => {
        fetchBrands()
    }, [])

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
        if (bestPrice !== null) {
            setPrice([0, bestPrice])
        }
    }, [bestPrice])

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
        <div className='flex flex-col gap-2'>
            <span className='text-md'>{name}</span>
            {type === 'checkbox' && (
                <div className='mt-2 flex flex-col gap-2 max-h-[160px] overflow-y-scroll'>
                    {brands.map((el) => (
                        <div key={el._id} className='flex items-center gap-2'>
                            <input
                                type="checkbox"
                                name={el.title}
                                value={el.title}
                                onClick={handleSelect}
                                id={el._id}
                                checked={selected.some(selectedItem => selectedItem === el.title)}
                            />
                            <label htmlFor={el.title}>{el.title}</label>
                        </div>
                    ))}
                </div>
            )}
            {type === 'input' && (

                <div>
                    <div className='flex justify-between'>
                        <span className='text-xs'>{`${price[0].toLocaleString()}đ`}</span>
                        <span className='text-xs'>{`${price[1].toLocaleString()}đ`}</span>
                    </div>

                    <Slider
                        range
                        min={0}
                        max={bestPrice || 200000000}
                        step={1000000}
                        value={price}
                        onChange={setPrice}
                    />
                </div>

            )}
        </div>
    )
}

export default withBaseComponent(memo(SearchItem))
