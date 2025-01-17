import icons from './icons'
import path from './path'

export const navigation = [
    {
        id: 1,
        value: 'Trang chủ',
        path: `/${path.HOME}`
    },
    {
        id: 2,
        value: 'Sản phẩm',
        path: `/${path.PRODUCTS}`
    },
    // {
    //     id: 3,
    //     value: 'Thương hiệu',
    //     path: `/${path.BRANDS}`
    // },
    // {
    //     id: 4,
    //     value: 'Blog',
    //     path: `/${path.BLOG}`
    // },
    {
        id: 5,
        value: 'Liên hệ',
        path: `/${path.CONTACT}`
    }
]

export const sidebar = [
    {
        name: 'Đồng hồ nam',
        img: 'https://bizweb.dktcdn.net/100/508/659/collections/bbn.jpg?v=1705933299017'
    },
    {
        name: 'Đồng hồ nữ',
        img: 'https://bizweb.dktcdn.net/100/508/659/collections/bbnam.jpg?v=1705933366580'
    },
    {
        name: 'Đồng hồ trẻ em',
        img: 'https://bizweb.dktcdn.net/100/508/659/collections/bbte.jpg?v=1705933617420'
    },
    {
        name: 'Đồng hồ cơ',
        img: 'https://bizweb.dktcdn.net/100/508/659/collections/dsfs.jpg?v=1705934066323'
    },
    {
        name: 'Đồng hồ thông minh',
        img: 'https://bizweb.dktcdn.net/100/508/659/collections/dfd.jpg?v=1705933843270'
    },

]

const { RxDashboard, BiSolidUserRectangle, PiWatchFill, RiPriceTag3Fill, IoMdLogOut, TbLicense, GrSort, FaShoppingCart, FaRegUser, CgClipboard, FaRegHeart } = icons

export const adminSidebar = [
    {
        id: 1,
        type: 'SINGLE',
        text: 'Dashboard',
        path: `/${path.ADMIN}/${path.DASHBOARD}`,
        icon: <RxDashboard size={20} />
    },
    {
        id: 2,
        type: 'SINGLE',
        text: 'Người dùng',
        path: `/${path.ADMIN}/${path.MANAGE_USER}`,
        icon: <BiSolidUserRectangle size={20} />
    },
    // {
    //     id: 3,
    //     type: 'SINGLE',
    //     text: 'Phân quyền',
    //     path: `/${path.ADMIN}/phan-quyen`,
    //     icon: <TbLicense size={20} />
    // },
    {
        id: 4,
        type: 'PARENT',
        text: 'Sản phẩm',
        icon: <PiWatchFill size={20} />,
        submenu: [
            {
                text: 'Tạo sản phẩm',
                path: `/${path.ADMIN}/${path.CREATE_PRODUCT}`,
            },
            {
                text: 'Quản lý sản phẩm',
                path: `/${path.ADMIN}/${path.MANAGE_PRODUCT}`,
            }
        ]
    },
    {
        id: 5,
        type: 'PARENT',
        text: 'Thương hiệu',
        icon: <RiPriceTag3Fill size={20} />,
        submenu: [
            {
                text: 'Tạo thương hiệu',
                path: `/${path.ADMIN}/${path.CREATE_BRAND}`,
            },
            {
                text: 'Quản lý thương hiệu',
                path: `/${path.ADMIN}/${path.MANAGE_BRAND}`,
            }
        ]
    },
    {
        id: 6,
        type: 'PARENT',
        text: 'Danh mục sản phẩm',
        icon: <GrSort size={20} />,
        submenu: [
            {
                text: 'Tạo danh mục sản phẩm',
                path: `/${path.ADMIN}/${path.CREATE_PRODUCT_CATEGORY}`,
            },
            {
                text: 'Quản lý danh mục sản phẩm',
                path: `/${path.ADMIN}/${path.MANAGE_PRODUCT_CATEGORY}`,
            }
        ]
    },
    {
        id: 7,
        type: 'SINGLE',
        text: 'Quản lý đơn hàng',
        path: `/${path.ADMIN}/${path.MANAGE_ORDER}`,
        icon: <FaShoppingCart size={20} />
    },


]

export const memberSidebar = [
    {
        id: 1,
        type: 'SINGLE',
        text: 'Thông tin tài khoản',
        path: `/${path.MEMBER}/${path.PERSONAL}`,
        icon: <FaRegUser size={20} />
    },
    {
        id: 2,
        type: 'SINGLE',
        text: 'Đơn hàng của bạn',
        path: `/${path.MEMBER}/${path.MY_ORDER}`,
        icon: <CgClipboard size={20} />
    },
    {
        id: 3,
        type: 'SINGLE',
        text: 'Sản phẩm yêu thích',
        path: `/${path.MEMBER}/${path.WISHLIST}`,
        icon: <FaRegHeart size={20} />
    },
]

export const roles = [
    {
        code: 1234,
        value: 'Quản trị viên'
    },
    {
        code: 2345,
        value: 'Người dùng'
    }
]

export const blockStatus = [
    {
        code: true,
        value: 'Khóa tài khoản'
    },
    {
        code: false,
        value: 'Đã kích hoạt'
    }
]

export const productTabs = [
    {
        id: 1,
        name: 'Sản phẩm bán chạy'
    },
    {
        id: 2,
        name: 'Sản phẩm mới'
    },
    // {
    //   id: 3,
    //   name: 'Sản phẩm giảm giá'
    // }
]

export const productInfoTabs = [
    {
        id: 1,
        name: 'Thông tin sản phẩm',
        content: ''
    },
    {
        id: 2,
        name: 'Chính sách bảo hành',
        content: ''
    },
    {
        id: 3,
        name: 'Hướng dẫn chọn size',
        content: ''
    },
    {
        id: 4,
        name: 'Đánh giá',
        content: ''
    }
]

export const sortBy = [
    {
        id: 1,
        value: 'title',
        text: 'Tên sản phẩm (A-Z)',
    },
    {
        id: 2,
        value: '-title',
        text: 'Tên sản phẩm (Z-A)',
    },
    {
        id: 3,
        value: '-createdAt',
        text: 'Sản phẩm mới',
    },
    {
        id: 4,
        value: 'price',
        text: 'Giá tăng dần',
    },
    {
        id: 5,
        value: '-price',
        text: 'Giá giảm dần',
    },
    {
        id: 6,
        value: '-sold',
        text: 'Sản phẩm bán chạy',
    },



]

export const paymentMethod = [
    'paylater',
    'paypal',
    'bank'
]

export const orderStatus = [
    {
        label: 'Tất cả',
        value: 'all'
    },
    {
        label: 'Đã hủy',
        value: 'Cancelled'
    },
    {
        label: 'Đang xử lý',
        value: 'Processing'
    },
    {
        label: 'Thành công',
        value: 'Succeed'
    }
]


export const voteOption = [
    {
        id: 1,
        text: 'Rất kém',
    },
    {
        id: 2,
        text: 'Kém',
    },
    {
        id: 3,
        text: 'Bình thường',
    },
    {
        id: 4,
        text: 'Tốt',
    },
    {
        id: 5,
        text: 'Rất tốt',
    }
]

export const tutorial = [
    `<p>Sở th&iacute;ch của mỗi người l&agrave; kh&aacute;c nhau, c&oacute; người tay nhỏ nhưng lại th&iacute;ch đeo đồng hồ size to, c&oacute; người tay to nhưng lại th&iacute;ch đeo đồng hồ size nhỏ, nhưng để đeo 1 chiếc đồng hồ mang t&iacute;nh thẩm mỹ nhất th&igrave; bạn cũng n&ecirc;n tham khảo c&aacute;ch lựa size đồng hồ dưới đ&acirc;y nh&eacute;:<br><br><strong>Bước 1:</strong>&nbsp;Đo size cổ tay (chu vi cổ tay)</p>
<p><img src="https://bizweb.dktcdn.net/100/508/659/files/q9lyddn.png?v=1705977764558" data-thumb="original"></p>
<p><strong>Bước 2:</strong>&nbsp;Tham chiếu size cổ tay của bạn để chọn size mặt đồng hồ ph&ugrave; hợp dưới đ&acirc;y</p>
<p><img src="https://bizweb.dktcdn.net/100/508/659/files/vaolz7d.png?v=1705977777038" data-thumb="original"></p>`
]