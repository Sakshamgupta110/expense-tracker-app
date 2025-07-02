import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import moment from 'moment'
import TransactionCardInfo from '../cards/TransactionCardInfo'

const RecentTransaction = ({transactions, onSeeMore}) => {
  return (
    <div className="card">
        <div className='flex justify-between items-center'>
            <h5 className='text-lg font-semibold text-gray-800'>Recent Transactions</h5>
            <button className='card-btn' onClick={onSeeMore}>See All
                <LuArrowRight className='text-base' />
            </button>
        </div>

        <div className='mt-6'>
            {transactions?.slice(0, 5).map((item)=>(
                <TransactionCardInfo 
                key={item._id}
                title={item.source}
                icon={item.icon}
                date={moment(item.date).format('DD MMM YYYY')}
                amount={item.amount}
                type={item.type}
                hideDeleteBtn
                />
            ))}
        </div>
    </div>
  )
}

export default RecentTransaction