import React, { useState } from 'react';
import Input from "../Input/Input"
import EmojiPickerPopup from "../EmojiPickerPopup"

const AddIncomeForm = ({ onAddIncome }) => {
  const [income, setIncome] = useState({
    source: "",
    amount: "",
    date: "",
    icon: ""
  });

  const handleChange = (key, value) => {
    setIncome({ ...income, [key]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!income.source || !income.amount || !income.date) return;
    onAddIncome(income);
    setIncome({ source: '', amount: '', date: '', icon: '' });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Add Income</h2>

      <EmojiPickerPopup
      icon={income.icon}
      onSelect={(selectedIcon) => handleChange("icon", selectedIcon)} />
      <Input
        value={income.source}
        onChange={({ target }) => handleChange('source', target.value)}
        label="Income Source"
        placeholder="Freelance, Salary, etc"
        type="text"
        className="mb-4"
      />
      <Input
        value={income.amount}
        onChange={({ target }) => handleChange('amount', target.value)}
        label="Amount"
        placeholder=""
        type="number"
        className="mb-4"
      />
      <Input
        value={income.date}
        onChange={({ target }) => handleChange('date', target.value)}
        label="Date"
        placeholder=""
        type="date"
        className="mb-4"
      />
      <Input
        value={income.icon}
        onChange={({ target }) => handleChange('icon', target.value)}
        label="Icon (optional)"
        placeholder=""
        type="text"
        className="mb-4"
      />
      <div className='flex justify-end mt-6'>
        <button
          type="button"
          className="add-btn px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          onClick={() => onAddIncome(income)}
        >
          Add Income
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;