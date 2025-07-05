import React from 'react';
import TransactionCardInfo from '../cards/TransactionCardInfo';
import { LuDownload } from 'react-icons/lu';
import moment from 'moment';

const ExpenseList = ({ transactions, onDelete, onDownload }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Expense Sources</h5>
        <button className="card-btn" onClick={onDownload}>
          <LuDownload className="text-base" /> Download
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {transactions && transactions.length > 0 ? (
          transactions.map((expense) => (
            <TransactionCardInfo
              key={expense._id}
              title={expense.category}
              icon={expense.icon}
              date={moment(expense.date).format('Do MMM YYYY')}
              amount={expense.amount}
              type="expense"
              onDelete={() => onDelete && onDelete(expense._id)}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400 py-4">No expense records found.</div>
        )}
      </div>
    </div>
  );
};

export default ExpenseList; 