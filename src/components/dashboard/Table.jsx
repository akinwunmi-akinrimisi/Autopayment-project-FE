import React from 'react'
import Dropdown from './DropDown';

const Table = () => {
    const orders = [
        { product: 'Polo Shirt', orderId: '2365170', date: '10-09-2024', customer: 'John Michelle', amount: '$12.5', status: 'Pending' },
        { product: 'Polo Shirt', orderId: '2365170', date: '10-09-2024', customer: 'John Michelle', amount: '$12.5', status: 'Pending' },
        { product: 'Polo Shirt', orderId: '2365170', date: '10-09-2024', customer: 'John Michelle', amount: '$12.5', status: 'Pending' },
        { product: 'Polo Shirt', orderId: '2365170', date: '10-09-2024', customer: 'John Michelle', amount: '$12.5', status: 'Pending' },
        { product: 'Polo Shirt', orderId: '2365170', date: '10-09-2024', customer: 'John Michelle', amount: '$12.5', status: 'Pending' },
        { product: 'Polo Shirt', orderId: '2365170', date: '10-09-2024', customer: 'John Michelle', amount: '$12.5', status: 'Pending' },
        { product: 'Polo Shirt', orderId: '2365170', date: '10-09-2024', customer: 'John Michelle', amount: '$12.5', status: 'Pending' },

    ];
    return (
        <div className='table-responsive  bg-[#143869] text-white mt-10  py-3 px-10 relative'>
            <h4 className='text-xl  font-medium p-3'>Latest Order</h4>
            <table className='table whitespace-nowrap min-w-full'>
                <thead>
                    <tr className=" bg-[#1F4983] py-3 font-medium">
                        <th scope='col' className='text-start  py-3 px-3'>Product</th>
                        <th scope='col' className='text-start'>Order ID</th>
                        <th scope='col' className='text-start'>Date</th>
                        <th scope='col' className='text-start'>Customer Name</th>
                        <th scope='col' className='text-start'>Amount</th>
                        <th scope='col' className='text-start'>Status</th>
                        <th scope='col' className='text-start'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders?.map((order, index) => (
                        <tr className=" text-lg" key={index}>
                            <td className='py-2 px-3'>{order.product}</td>
                            <td className='py-2'>{order.orderId}</td>
                            <td className='py-2'>{order.date}</td>
                            <td className='py-2'>{order.customer}</td>
                            <td className='py-2'>{order.amount}</td>
                            <td className='py-2'>{order.status}</td>
                            <td>
                                <Dropdown/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table