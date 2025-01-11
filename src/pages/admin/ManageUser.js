import { apiDeleteUser, apiGetUsers, apiUpdateUser } from 'apis'
import React, { useCallback, useEffect, useState } from 'react'
import { roles, blockStatus } from 'utils/constans'
import moment from 'moment'
import { InputField, Pagination, InputForm, Select, Button } from 'components'
import useDebounce from 'hooks/useDebounce'
import { useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import icons from 'utils/icons'

const { BiEdit, RiDeleteBin6Line, RiArrowGoBackFill, FaRegSquareCheck } = icons

const ManageUser = () => {
  const { handleSubmit, register, formState: { errors }, reset } = useForm({
    email: '',
    firstname: '',
    lastname: '',
    role: '',
    mobile: '',
    isBlocked: ''
  })
  const [user, setUser] = useState(null)
  const [queries, setQueries] = useState({
    q: ''
  })

  const [update, setUpdate] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [params] = useSearchParams()
  const fetchUsers = async (params) => {
    const response = await apiGetUsers({ ...params, limit: 5 })
    if (response.success) setUser(response)
  }

  const render = useCallback(() => {
    setUpdate(!update)
  }, [update])

  const queriesDebounce = useDebounce(queries.q, 800)

  useEffect(() => {
    const queries = Object.fromEntries([...params])
    if (queriesDebounce) queries.q = queriesDebounce
    fetchUsers(queries)
  }, [queriesDebounce, params, update])

  const handleEdit = async (data) => {
    const response = await apiUpdateUser(data, editItem._id)
    if (response.success) {
      setEditItem(null)
      render()
      toast.success(response.mes)
    } else toast.error(response.mes)
  }

  const handleDelete = (uid) => {
    Swal.fire({
      title: 'Xác nhận xóa?',
      text: 'Bạn có chắc chắn muốn xóa người dùng này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Hủy',
      confirmButtonText: 'Xóa'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiDeleteUser(uid)
        if (response.success) {
          render()
          toast.success(response.mes)
        } else toast.error(response.mes)
      }
    })
  }

  useEffect(() => {
    if (editItem) reset(
      {
        email: editItem.email,
        firstname: editItem.firstname,
        lastname: editItem.lastname,
        role: editItem.role,
        mobile: editItem.mobile,
        isBlocked: editItem.isBlocked.toString()
      }
    )
  }, [editItem, reset])

  return (
    <div className='w-full'>
      <h1 className='flex justify-between items-center px-4 border-b h-[75px] text-[28px] font-semibold'>
        <span>Quản lý người dùng</span>
      </h1>
      <div className='w-full p-4'>
        <div className='flex justify-end py-4'>
          <InputField
            nameKey={'q'}
            value={queries.q}
            setValue={setQueries}
            styles={'w-[500px] bg-white border border-gray-200'}
            placeholder='Tìm kiếm theo người dùng hoặc email'
          />
        </div>
        <form onSubmit={handleSubmit(handleEdit)} >
          {/* {editItem && <Button type='submit' name='Xác nhận' />} */}
          <table className='table-auto mb-6 text-left w-full'>
            <thead className='font-bold bg-gray-200 text-[13px] text-center'>
              <tr className='border border-gray-200'>
                <th className='px-4 py-2'>#</th>
                <th className='px-4 py-2'>Địa chỉ email</th>
                <th className='px-4 py-2'>Tên</th>
                <th className='px-4 py-2'>Họ</th>
                <th className='px-4 py-2 w-[170px]'>Vai trò</th>
                <th className='px-4 py-2'>Số điện thoại</th>
                <th className='px-4 py-2'>Trạng thái</th>
                <th className='px-4 py-2 w-[125px]'>Ngày tạo</th>
                <th className='px-4 py-2 w-[100px]'>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {user?.users?.map((el, idx) => (
                <tr key={el._id} className='border border-gray-200'>
                  <td className='py-2 px-4 '>{((+params.get('page') > 1 ? +params.get('page') - 1 : 0) * 10) + 1 + idx}</td>
                  <td className='py-2 px-4 '>
                    {/* {editItem?._id === el._id
                      ? <InputForm
                        register={register}
                        fullWidth
                        errors={errors}
                        id={'email'}
                        defaultValue={editItem?.email}
                        validate={{
                          required: 'Hãy nhập email',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Địa chỉ email không hợp lệ"
                          }
                        }}
                      />
                      : 
                    } */}
                    <span>{el.email}</span>
                  </td>
                  <td className='py-2 px-4 '>
                    {/* {editItem?._id === el._id
                      ? <InputForm
                        register={register}
                        fullWidth
                        errors={errors}
                        id={'firstname'}
                        defaultValue={editItem?.firstname}
                        validate={{ required: 'Hãy nhập tên' }}
                      />
                      : 
                    } */}
                    <span>{el.firstname}</span>
                  </td>
                  <td className='py-2 px-4 '>
                    {/* {editItem?._id === el._id
                      ? <InputForm
                        register={register}
                        fullWidth
                        errors={errors}
                        id={'lastname'}
                        defaultValue={editItem?.lastname}
                        validate={{ required: 'Hãy nhập họ' }}
                      />
                      : 
                    } */}
                    <span>{el.lastname}</span>
                  </td>
                  <td className='py-2 px-4 '>
                    {/* {editItem?._id === el._id
                      ? <Select
                        register={register}
                        fullWidth
                        errors={errors}
                        id={'role'}
                        defaultValue={+el.role}
                        validate={{ required: 'Hãy chọn vai trò' }}
                        options={roles}
                      />
                      :
                    } */}
                    <span>{roles.find(role => +role.code === +el.role)?.value}</span>
                  </td>
                  <td className='py-2 px-4 '>
                    {/* {editItem?._id === el._id
                      ? <InputForm
                        register={register}
                        fullWidth
                        errors={errors}
                        id={'mobile'}
                        defaultValue={editItem?.mobile}
                        validate={{
                          required: 'Hãy nhập số điện thoại',
                          pattern: {
                            value: /^0[0-9]{9,10}$/,
                            message: "Số điện thoại không hợp lệ"
                          }
                        }}
                      />
                    }
                    : */}
                    <span>{el.mobile}</span>
                  </td>
                  <td className='py-2 px-4 '>
                    {editItem?._id === el._id
                      ? <Select
                        register={register}
                        fullWidth
                        errors={errors}
                        id={'isBlocked'}
                        defaultValue={+el.isBlocked}
                        validate={{ required: 'Hãy chọn trạng thái' }}
                        options={blockStatus}
                      />
                      : <span>{blockStatus.find(isBlocked => +isBlocked.code === +el.isBlocked)?.value}</span>}
                  </td>
                  <td className='py-2 px-4 '>{moment(el.createdAt).format('DD/MM/YYYY')}</td>
                  <td className=' py-2 px-4'>
                    {editItem?._id === el._id ? <div className='flex justify-between'>

                      <Button type='submit' iconBefore={<FaRegSquareCheck size={20} />}
                        styles={'py-3 text-green-500 hover:text-green-400'} />
                      <span
                        onClick={() => setEditItem(null)}
                        className={'cursor-pointer  py-3 text-red-600 hover:text-red-500'}
                      ><RiArrowGoBackFill size={20} /></span>
                    </div>
                      : <div className='flex justify-between'>
                        <span
                          onClick={() => setEditItem(el)}
                          className={'cursor-pointer  py-3 text-yellow-500 hover:text-yellow-400 '}
                        ><BiEdit size={20} /></span>
                        {/* <span
                          onClick={() => handleDelete(el._id)}
                          className={'cursor-pointer py-3  text-red-600 hover:text-red-500'}
                        ><RiDeleteBin6Line size={20} /></span> */}
                      </div>
                    }
                  </td>
                </tr>

              ))}
            </tbody>
          </table>
        </form>
      </div>
      <div className='flex justify-center'>
        <Pagination
          totalCount={user?.counts}
        />
      </div>
    </div>
  )
}

export default ManageUser
