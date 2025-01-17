import React, { useEffect, useState } from 'react'
import icons from 'utils/icons'
import { XAxis, YAxis, Tooltip, ResponsiveContainer, Bar, BarChart } from 'recharts'
import { formatDate, formatMoney } from 'utils/helpers'
import { apiGetOrders, apiGetProducts, apiGetUsers } from 'apis'

const { RiShoppingBag3Line, FaUsers, MdOutlineInventory2, BsCurrencyDollar } = icons

const Dashboard = () => {
    const [stats, setStats] = useState({
        orders: 0,
        successOrders: 0,
        revenue: 0,
        users: 0,
        products: 0
    })
    const [recentOrders, setRecentOrders] = useState(null)
    const [salesData, setSalesData] = useState([])
    const [timeFilter, setTimeFilter] = useState('week')
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

    const getWeekOfMonth = (date) => {
        const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
        const diffDays = Math.ceil((date - startOfMonth) / (24 * 60 * 60 * 1000))
        return Math.ceil(diffDays / 7)
    }

    useEffect(() => {
        fetchDashboardData()
        fetchSalesData()
        fetchRecent()
    }, [])
    const fetchDashboardData = async () => {
        const [orderResponse, userResponse, productResponse] = await Promise.all([
            apiGetOrders(),
            apiGetUsers(),
            apiGetProducts()
        ])

        if (orderResponse.success) {
            const totalRevenue = orderResponse.orders.reduce((acc, order) => {
                if (order.status === 'Succeed') {
                    return acc + order.products.reduce((sum, el) =>
                        sum + (el.product.finalPrice * el.quantity), 0)
                }
                return acc
            }, 0)

            const successOrders = orderResponse.orders.filter(order => order.status === 'Succeed').length

            setStats((prev) => ({
                ...prev,
                orders: orderResponse.counts,
                successOrders: successOrders,
                revenue: totalRevenue,
                users: userResponse.counts || 0,
                products: productResponse.counts || 0
            }))
        }

    }

    const fetchSalesData = async () => {
        const response = await apiGetOrders({ sort: 'createdAt' })

        if (response.success) {
            let template = []
            if (timeFilter === 'week') {

                for (let i = 1; i <= 52; i++) {
                    template.push({ date: `Tuần ${i}`, revenue: 0 })
                }
            } else if (timeFilter === 'month') {

                for (let i = 1; i <= 12; i++) {
                    template.push({ date: `Tháng ${i}`, revenue: 0 })
                }
            } else if (timeFilter === 'quarter') {
                for (let i = 1; i <= 4; i++) {
                    template.push({ date: `Quý ${i}`, revenue: 0 })
                }
            }
            const filteredDate = response.orders.reduce((acc, order) => {
                const orderDate = new Date(order.createdAt)
                if (orderDate.getFullYear() === selectedYear) {
                    const orderTotal = order.products.reduce((sum, item) => {
                        if (order.status === 'Succeed') {
                            return sum + (item.product.finalPrice * item.quantity)
                        }
                        return sum
                    }, 0)
                    if (timeFilter === 'week') {
                        if (orderDate.getFullYear() === selectedYear) {
                            const week = getWeekOfMonth(orderDate)
                            const key = `Tuần ${week}`
                            const existing = acc.find((item) => item.date === key)
                            if (existing) {
                                existing.revenue += orderTotal
                            } else {
                                acc.push({ date: key, revenue: orderTotal })
                            }
                        }
                    } else if (timeFilter === 'month') {
                        const month = orderDate.getMonth() + 1
                        const key = `Tháng ${month}`
                        const existing = acc.find((item) => item.date === key)
                        if (existing) {
                            existing.revenue += orderTotal
                        } else {
                            acc.push({ date: key, revenue: orderTotal })
                        }
                    }
                    else if (timeFilter === 'quarter') {
                        const quarter = Math.ceil((orderDate.getMonth() + 1) / 3)
                        const key = `Quý ${quarter}`
                        const existing = acc.find((item) => item.date === key)
                        if (existing) {
                            existing.revenue += orderTotal
                        } else {
                            acc.push({ date: key, revenue: orderTotal })
                        }
                    }

                }
                return acc
            }, [])

            const mergedData = template.map(item => {
                const match = filteredDate.find(d => d.date === item.date)
                return match || item
            })
            setSalesData(mergedData)
        }
    }

    const fetchRecent = async () => {
        const response = await apiGetOrders({ sort: '-createdAt', limit: 5 })
        if (response.success) {
            setRecentOrders(response)
        }
    }


    return (
        <div className='p-4 w-full'>
            <div className='grid grid-cols-5 gap-4 mb-6'>
                <div className='bg-white p-4 rounded-lg shadow'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <p className='text-gray-500'>Tổng đơn hàng</p>
                            <h3 className='text-2xl font-bold'>{stats.orders}</h3>
                        </div>
                        <RiShoppingBag3Line size={40} className='text-blue-600' />
                    </div>
                </div>
                <div className='bg-white p-4 rounded-lg shadow'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <p className='text-gray-500'>Tổng đơn hàng thành công</p>
                            <h3 className='text-2xl font-bold'>{stats.successOrders}</h3>
                        </div>
                        <RiShoppingBag3Line size={40} className='text-green-600' />
                    </div>
                </div>
                <div className='bg-white p-4 rounded-lg shadow'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <p className='text-gray-500'>Doanh thu</p>
                            <h3 className='text-2xl font-bold'>{formatMoney(Number(stats.revenue))}</h3>
                        </div>
                        <BsCurrencyDollar size={40} className='text-green-600' />
                    </div>
                </div>
                <div className='bg-white p-4 rounded-lg shadow'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <p className='text-gray-500'>Khách hàng</p>
                            <h3 className='text-2xl font-bold'>{stats.users}</h3>
                        </div>
                        <FaUsers size={40} className='text-blue-600' />
                    </div>
                </div>
                <div className='bg-white p-4 rounded-lg shadow'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <p className='text-gray-500'>Sản phẩm</p>
                            <h3 className='text-2xl font-bold'>{stats.products}</h3>
                        </div>
                        <MdOutlineInventory2 size={40} className='text-yellow-600' />
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-4 mb-4">
                <div>
                    <label className="mr-2">Chọn năm:</label>
                    <select
                        className="border px-3 py-2 rounded ouline-none"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(Number(e.target.value))}
                    >
                        {[2023, 2024, 2025].map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="mr-2">Thống kê:</label>
                    <select
                        className="border px-3 py-2 rounded outline-none"
                        value={timeFilter}
                        onChange={(e) => setTimeFilter(e.target.value)}
                    >
                        <option value="week">Tuần</option>
                        <option value="month">Tháng</option>
                        <option value="quarter">Quý</option>
                    </select>
                </div>
            </div>
            <div className=' bg-white p-4 rounded-lg shadow'>
                <h2 className='text-xl font-bold mb-4'>Biểu đồ doanh thu</h2>
                <div className='flex  justify-center'>
                    <ResponsiveContainer width='100%' height={500}
                    >
                        <BarChart

                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                            barSize={20}
                            data={salesData}>
                            <XAxis
                                dataKey="date"
                                padding={{ left: 10, right: 10 }}

                            />
                            <YAxis />
                            {/* <Legend/> */}
                            <Tooltip formatter={(value) => `${value.toLocaleString()}đ`} />
                            <Bar
                                dataKey="revenue"
                                name='Doanh thu'
                                fill="#8884d8"
                                background={{ fill: '#eee' }}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className='bg-white p-4 rounded-lg shadow'>
                <h2 className='text-xl font-bold mb-4'>Đơn hàng gần đây</h2>
                <table className='w-full text-left'>
                    <thead className='bg-gray-50'>
                        <tr>
                            <th className='px-4 py-2'>Mã đơn</th>
                            <th className='px-4 py-2'>Khách hàng</th>
                            <th className='px-4 py-2'>Tổng tiền</th>
                            <th className='px-4 py-2'>Trạng thái</th>
                            <th className='px-4 py-2'>Ngày đặt</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentOrders?.orders?.map(order => (
                            <tr
                                key={order._id}
                                className='border-b'>
                                <td className='px-4 py-2 uppercase'>
                                    {order._id.slice(-5)}
                                </td>
                                <td className='px-4 py-2'>
                                    {order.orderBy.firstname} {order.orderBy.lastname}
                                </td>
                                <td className='px-4 py-2'>
                                    {formatMoney(order.total * 25395.02)}
                                </td>
                                <td className='px-4 py-2'>
                                    <span className={`px-2 py-1 rounded-full text-xs ${order.status === 'Succeed' ? 'bg-green-100 text-green-800' :
                                        order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                        {order.status === 'Succeed' ? 'Thành công' : order.status === 'Processing' ? 'Đang xử lý' : 'Đã hủy'}
                                    </span>
                                </td>
                                <td className='px-4 py-2'>{formatDate(order.createdAt).format('DD/MM/YYYY')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Dashboard