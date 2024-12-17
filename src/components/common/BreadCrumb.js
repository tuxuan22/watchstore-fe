import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import useBreadcrumbs from 'use-react-router-breadcrumbs'
import icons from 'utils/icons'


const { MdKeyboardDoubleArrowRight } = icons

const BreadCrumb = ({ title, category }) => {
  const location = useLocation()
  const routes = [
    { path: '/', breadcrumb: 'Trang chủ' },
    { path: '/tat-ca-san-pham', breadcrumb: 'Tất cả sản phẩm' },
    { path: '/gio-hang', breadcrumb: 'Giỏ hàng' },
    { path: '/:category', breadcrumb: category },
    { path: '/:category/:title/:pid', breadcrumb: title }
  ]
  const breadcrumb = useBreadcrumbs(routes)

  return (
    <div className='text-sm flex items-center gap-2'>
      {breadcrumb?.filter(el => !el.match.route === false).map(({ match, breadcrumb }, index, self) => (
        <Link className={`flex gap-2 items-center hover:text-main ${location.pathname === match.pathname ? 'text-main' : ''}`} key={match.pathname} to={match.pathname}>
          <span>{breadcrumb} </span>
          {index !== self.length - 1 && <MdKeyboardDoubleArrowRight />}
        </Link>
      ))}
    </div>
  )
}

export default BreadCrumb
