import React, { useState } from 'react';
import Input from "../Input/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";

const AddExpenseForm = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({
    category: "",
    amount: "",
    date: "",
    icon: ""
  });

  const handleChange = (key, value) => {
    setExpense({ ...expense, [key]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!expense.category || !expense.amount || !expense.date) return;
    onAddExpense(expense);
    setExpense({ category: '', amount: '', date: '', icon: '' });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Add Expense</h2>
      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />
      <Input
        value={expense.category}
        onChange={({ target }) => handleChange('category', target.value)}
        label="Expense Category"
        placeholder="Food, Travel, etc"
        type="text"
        className="mb-4"
      />
      <Input
        value={expense.amount}
        onChange={({ target }) => handleChange('amount', target.value)}
        label="Amount"
        placeholder=""
        type="number"
        className="mb-4"
      />
      <Input
        value={expense.date}
        onChange={({ target }) => handleChange('date', target.value)}
        label="Date"
        placeholder=""
        type="date"
        className="mb-4"
      />
      <Input
        value={expense.icon}
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
          onClick={handleSubmit}
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm; 