import React, { useEffect, useState } from 'react'
import { apiGetProducts } from 'apis'
import { CustomSlider } from 'components'
import { productTabs } from 'utils/constans'
import clsx from 'clsx'
import { useSelector } from 'react-redux'

const ProductTab = () => {
  const [bestSellers, setBestSellers] = useState(null)
  const [newProducts, setNewProducts] = useState(null)
  const [activedTab, setActivedTab] = useState(1)
  const [products, setProducts] = useState(null)
  const { isShowModal } = useSelector(state => state.app)

  const fetchProducts = async () => {
    const response = await Promise.all([apiGetProducts({ sort: '-sold', }), apiGetProducts({ sort: '-createdAt' })])
    if (response[0]?.success) {
      setBestSellers(response[0].products)
      setProducts(response[0].products)
    }
    if (response[1]?.success) setNewProducts(response[1].products)
    setProducts(response[0].products)


  }
  useEffect(() => {
    fetchProducts()
  }, [])
  useEffect(() => {
    if (activedTab === 1) setProducts(bestSellers)
    if (activedTab === 2) setProducts(newProducts)
  }, [activedTab, newProducts, bestSellers])

  return (

    <div className='sm:w-[540px] md:w-[940px] lg:w-main mb-5 '>
      <div className='flex text-2xl my-5 justify-center'>
        {productTabs.map(el => (
          <span
            key={el.id}
            className={`text-lg font-normal cursor-pointer flex justify-center w-[230px] py-2 mx-1 ${activedTab === el.id ? 'bg-main text-white' : 'hover:bg-main hover:text-white'}`}
            onClick={() => setActivedTab(el.id)}
          >{el.name}</span>
        ))}

      </div>


      <CustomSlider activedTab={activedTab} products={products} />

    </div>

  )
}

export default ProductTab
