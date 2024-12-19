import { Button, CustomizeVariants, InputField, InputForm, Pagination } from 'components'
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { apiDeleteProduct, apiGetProducts } from 'apis'
import moment from 'moment'
import { useSearchParams, createSearchParams } from 'react-router-dom'
import useDebounce from 'hooks/useDebounce'
import withBaseComponent from 'hocs/withBaseComponent'
import UpdateProduct from './UpdateProduct'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import icons from 'utils/icons'
import { formatMoney } from 'utils/helpers'

const { BiEdit, RiDeleteBin6Line, GoMultiSelect } = icons

const ManageProduct = ({ navigate, location }) => {
  const { register, formState: { errors }, handleSubmit, reset, watch } = useForm()
  const [products, setProducts] = useState(null)
  const [counts, setCounts] = useState(0)
  const [params] = useSearchParams()
  const [editProduct, setEditProduct] = useState(null)
  const [update, setUpdate] = useState(false)
  const [customizeVariant, setCustomizeVariant] = useState(null)

  const fetchProducts = async (params) => {
    const response = await apiGetProducts({ ...params, limit: 5 })
    if (response.success) {
      setCounts(response.counts)
      setProducts(response.products)

    }

  }

  const render = useCallback(() => {
    setUpdate(!update)
  })

  const queriesDebounce = useDebounce(watch('q'), 800)

  useEffect(() => {

    if (queriesDebounce) {
      navigate({
        pathname: location.pathname,
        search: createSearchParams({ q: queriesDebounce }).toString(),
      })
    } else navigate({
      pathname: location.pathname,
    })
  }, [queriesDebounce]);

  useEffect(() => {
    const searchParams = Object.fromEntries([...params])
    fetchProducts(searchParams)
  }, [params, update])

  const handleDeleteProduct = (pid) => {
    Swal.fire({
      title: 'Xác nhận xóa?',
      text: 'Bạn có chắc chắn muốn xóa sản phẩm này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Hủy',
      confirmButtonText: 'Xóa'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiDeleteProduct([pid])
        if (response.success) {
          render()
          toast.success(response.mes)
        } else toast.error(response.mes)
      }
    })
  }

  return (
    <div className='w-full relative'>
      {editProduct && <div className='absolute inset-0 z-50'>
        <UpdateProduct
          editProduct={editProduct}
          render={render}
          setEditProduct={setEditProduct}
        />
      </div>}
      {customizeVariant && <div className='absolute inset-0  z-50'>
        <CustomizeVariants
          customizeVariant={customizeVariant}
          render={render}
          setCustomizeVariant={setCustomizeVariant}
        />
      </div>}
      <h1 className='flex justify-between items-center px-4 border-b h-[75px] text-[28px] font-semibold'>
        <span>Quản lý sản phẩm</span>
      </h1>
      <div className='w-full p-4'>
        <div className='flex justify-end py-4' >
          <form className='w-full'>
            <InputForm
              id='q'
              register={register}
              errors={errors}
              placeholder='Tìm kiểu theo tên sản phẩm,...'
              fullWidth
              className={'w-[500px] bg-white border border-gray-200'}
            />
          </form>
        </div>
        <form className='overflow-x-auto'>
          <table className='min-w-full table-auto mb-6 text-left'>
            <thead className='font-bold bg-gray-200 text-[13px]'>
              <tr>
                <th className='px-4 py-2'>#</th>
                <th className='px-4 py-2'>Tên sản phẩm</th>
                <th className='px-4 py-2'>Ảnh sản phẩm</th>
                <th className='px-4 py-2'>Thương hiệu</th>
                <th className='px-4 py-2'>Danh mục</th>
                <th className='px-4 py-2'>Giá</th>
                <th className='px-4 py-2'>Số lượng</th>
                <th className='px-4 py-2'>Đã bán</th>
                <th className='px-4 py-2'> Màu</th>
                <th className='px-4 py-2'> Lượt đánh giá</th>
                <th className='px-4 py-2'>Các biến thể</th>
                <th className='px-4 py-2'> Cập nhật lúc</th>
                <th className='px-4 py-2 w-[120px]'>Hành động</th>
              </tr>

            </thead>
            <tbody>
              {products?.map((el, idx) => (
                <tr key={el._id} className='border border-gray-200'>
                  <td className='py-2 px-4 '>{((+params.get('page') > 1 ? +params.get('page') - 1 : 0) * 5) + 1 + idx}</td>
                  <td className='py-2 px-4 '>

                    <span>{el.title}</span>

                  </td>
                  <td className='py-2 px-4 '>

                    <img src={el.thumb} alt="thumb" className='w-12 h-12 object-cover' />
                  </td>
                  <td className='py-2 px-4 '>

                    <span>{el.brand}</span>

                  </td>
                  <td className='py-2 px-4 '>

                    <span>{el.category}</span>

                  </td>
                  <td className='py-2 px-4 '>

                    <span>{formatMoney(Number(el.price))}</span>

                  </td>
                  <td className='py-2 px-4 '>

                    <span>{el.quantity}</span>

                  </td>
                  <td className='py-2 px-4 '>

                    <span>{el.sold}</span>

                  </td>
                  <td className='py-2 px-4 '>
                    {el.color}
                  </td>
                  <td className='py-2 px-4 '>
                    {el.totalRatings}
                  </td>
                  <td className='py-2 px-4 '>
                    {el?.variants?.length || 0}
                  </td>

                  <td className='py-2 px-4 '>
                    {moment(el.updatedAt).format('DD/MM/YYYY')}
                  </td>
                  <td className='flex justify-between py-2 px-4'>

                    <span
                      onClick={() => setEditProduct(el)}
                      className={'cursor-pointer  py-3 text-yellow-500 hover:text-yellow-400 '}
                    ><BiEdit size={20} /></span>
                    <span
                      onClick={() => handleDeleteProduct(el._id)}
                      className={'cursor-pointer py-3  text-red-600 hover:text-red-500'}
                    ><RiDeleteBin6Line size={20} /></span>
                    <span
                      onClick={() => setCustomizeVariant(el)}
                      className={'cursor-pointer py-3  text-blue-600 hover:text-blue-500'}
                    ><GoMultiSelect size={20} /></span>

                  </td>
                </tr>

              ))}
            </tbody>

          </table>
        </form>
      </div>
      <div className='flex justify-center'>
        <Pagination
          totalCount={counts}
        />
      </div>
    </div>
  )
}

export default withBaseComponent(ManageProduct)
