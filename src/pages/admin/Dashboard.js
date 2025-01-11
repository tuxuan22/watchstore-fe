import React, { useEffect, useState } from 'react'
import icons from 'utils/icons'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { formatMoney } from 'utils/helpers'
import { apiGetOrders } from 'apis'
import moment from 'moment'

const { RiShoppingBag3Line, FaUsers, MdOutlineInventory2, BsCurrencyDollar } = icons

const Dashboard = () => {
    const [stats, setStats] = useState({
        orders: 0,
        revenue: 0,
        users: 9,
        products: 17
    })
    const [recentOrders, setRecentOrders] = useState(null)
    const [salesData, setSalesData] = useState([]);

    useEffect(() => {
        fetchSalesData();
    }, []);

    const fetchSalesData = async () => {
        const response = await apiGetOrders({ sort: '-createdAt' });
        if (response.success) {
            // Chuẩn hóa dữ liệu cho biểu đồ
            const data = response.orders.reduce((acc, order) => {
                const date = moment(order.createdAt).format('DD/MM');
                const existing = acc.find((item) => item.date === date);
                if (existing) {
                    existing.revenue += order.total * 25395.02;
                } else {
                    acc.push({ date, revenue: order.total * 25395.02 });
                }
                return acc
            }, []);
            setSalesData(data)
        }
    }
    console.log(recentOrders)

    useEffect(() => {
        fetchDashboardData()
    }, [])

    const fetchDashboardData = async () => {
        const response = await apiGetOrders({ sort: '-createdAt', limit: 3 })
        if (response.success) {
            setRecentOrders(response)
            const totalRevenue = response.orders.reduce((acc, order) => {
                if (order.status === 'Succeed') {
                    return acc + order.products.reduce((subAcc, product) => {
                        return subAcc + product.price
                    }, 0)
                }
                return acc
            }, 0)
            setStats((prev) => ({
                ...prev,
                orders: response.counts,
                revenue: totalRevenue,
            }))
        }

    }

    return (
        <div className='p-4 w-full'>
            {/* Stats Overview */}
            <div className='grid grid-cols-4 gap-4 mb-6'>
                <div className='bg-white p-4 rounded-lg shadow'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <p className='text-gray-500'>Tổng đơn hàng</p>
                            <h3 className='text-2xl font-bold'>{stats.orders}</h3>
                        </div>
                        <RiShoppingBag3Line size={40} className='text-main' />
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

            {/* Sales Chart */}
            <div className='grid grid-cols-3 gap-4 mb-6'>
                <div className='col-span-2 bg-white p-4 rounded-lg shadow'>
                    <h2 className='text-xl font-bold mb-4'>Biểu đồ doanh thu</h2>
                    <div className='flex  justify-center'>
                        <ResponsiveContainer width="90%" height={300}
                        >
                            <LineChart data={salesData}>
                                <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip formatter={(value) => `${value.toLocaleString()}đ`} />
                                <Line type="monotone" dataKey="revenue" name='Doanh thu' stroke="#8884d8" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className='bg-white p-4 rounded-lg shadow'>
                    <h2 className='text-xl font-bold mb-4'>Top sản phẩm bán chạy</h2>
                    {/* Add top products list */}
                </div>
            </div>

            {/* Recent Orders */}
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
                                <td className='px-4 py-2'>
                                    {order._id}
                                </td>
                                <td className='px-4 py-2'>
                                    {order.orderBy}
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
                                <td className='px-4 py-2'>{moment(order.createdAt).format('DD/MM/YYYY')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Dashboard