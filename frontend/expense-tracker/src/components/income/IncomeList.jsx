import React from 'react';
import { LuDownload } from 'react-icons/lu';
import moment from 'moment';
import TransactionCardInfo from '../cards/TransactionCardInfo';

const IncomeList = ({ transactions, onDelete, onDownload }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Income Sources</h5>
        <button className="card-btn" onClick={onDownload}>
          <LuDownload className="text-base" /> Download
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {transactions && transactions.length > 0 ? (
          transactions.map((income) => (
            <TransactionCardInfo
              key={income._id}
              title={income.source}
              icon={income.icon}
              date={moment(income.date).format('Do MMM YYYY')}
              amount={income.amount}
              type="income"
              onDelete={() => onDelete(income._id)}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400 py-4">No income records found.</div>
        )}
      </div>
    </div>
  );
};

export default IncomeList;