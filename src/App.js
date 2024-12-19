import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home, Login, Register, Public, Products, Brands, Blog, Contact, DetailProduct, EmailVerify, ResetPassword, DetailCart } from 'pages/public'
import { AdminLayout, Dashboard, ManageUser, ManageProduct, ManageOrder, CreateProduct, UpdateProduct } from 'pages/admin'
import { MemberLayout, Personal, MyOrder, Wishlist, Checkout } from 'pages/member'
import path from 'utils/path'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from 'store/app/asyncActions'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Cart, Modal } from 'components'
import { showCart } from 'store/app/appSlice'

function App() {
  const dispatch = useDispatch()
  const { isShowModal, modalChildren, isShowCart } = useSelector(state => state.app)
  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])
  return (
    <div className='h-screen font-main '>

      {isShowCart && <div onClick={() => dispatch(showCart())} className='absolute inset-0 bg-overlay z-50 flex justify-end'>
        <Cart />
      </div>
      }
      {isShowModal && <Modal>{modalChildren}</Modal>}

      <Routes>
        <Route path={path.CHECKOUT} element={<Checkout />} />
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.REGISTER} element={<Register />} />
          <Route path={path.PRODUCTS_CATEGORY} element={<Products />} />
          <Route path={path.BRANDS} element={<Brands />} />
          <Route path={path.BLOG} element={<Blog />} />
          <Route path={path.CONTACT} element={<Contact />} />
          <Route path={path.DETAIL_PRODUCT_CATEGORY_PID_TITLE} element={<DetailProduct />} />
          <Route path={path.DETAIL_CART} element={<DetailCart />} />
          <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
          <Route path={path.MEMBER} element={<MemberLayout />}>
            <Route path={path.PERSONAL} element={<Personal />} />
            <Route path={path.MY_ORDER} element={<MyOrder />} />
            <Route path={path.WISHLIST} element={<Wishlist />} />
          </Route>
          <Route path={path.ALL} element={<Home />} />
        </Route>

        <Route path={path.ADMIN} element={<AdminLayout />}>
          <Route path={path.DASHBOARD} element={<Dashboard />} />
          <Route path={path.MANAGE_USER} element={<ManageUser />} />
          <Route path={path.MANAGE_PRODUCT} element={<ManageProduct />} />
          <Route path={path.MANAGE_ORDER} element={<ManageOrder />} />
          <Route path={path.CREATE_PRODUCT} element={<CreateProduct />} />
          <Route path={path.UPDATE_PRODUCT} element={<UpdateProduct />} />
        </Route>



        <Route path={path.EMAIL_VERIFY} element={<EmailVerify />} />

      </Routes>
      <ToastContainer
        autoClose={2000}
        hideProgressBar
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />


      {/* <ToastContainer /> */}
    </div>
  )
}

export default App
