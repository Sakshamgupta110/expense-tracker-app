import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import ApiPaths from "../../utils/ApiPaths";
import Modal from "../../components/modal/Modal";
import AddExpenseForm from "../../components/expense/AddExpenseForm";
import toast from "react-hot-toast";
import DeleteAlert from "../../components/DeleteAlert";
import TransactionCardInfo from "../../components/cards/TransactionCardInfo";
import useUserAuth from "../../hooks/useUserAuth";

const Expense = () => {
  useUserAuth();
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null });
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

  useEffect(() => {
    fetchExpenseDetails();
  }, []);

  const fetchExpenseDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(ApiPaths.EXPENSE.GET_ALL_EXPENSE);
      if (response.data) {
        setExpenseData(response.data);
      }
    } catch (error) {
      toast.error("Failed to fetch expenses.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;
    if (!category || !amount || !date) {
      toast.error("Please fill all required fields.");
      return;
    }
    try {
      await axiosInstance.post(ApiPaths.EXPENSE.ADD_EXPENSE, { category, amount, date, icon });
      setOpenAddExpenseModal(false);
      toast.success("Expense added successfully!");
      fetchExpenseDetails();
    } catch (error) {
      toast.error("Failed to add expense.");
    }
  };

  const deleteExpense = async (id) => {
    if (!id) return;
    try {
      await axiosInstance.delete(ApiPaths.EXPENSE.DELETE_EXPENSE(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense deleted successfully!");
      fetchExpenseDetails();
    } catch (error) {
      toast.error("Failed to delete expense.");
    }
  };

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="flex justify-end mb-4">
          <button className="add-btn" onClick={() => setOpenAddExpenseModal(true)}>
            + Add Expense
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {expenseData?.data && expenseData.data.length > 0 ? (
            expenseData.data.map((expense) => (
              <TransactionCardInfo
                key={expense._id}
                title={expense.category}
                icon={expense.icon}
                date={expense.date}
                amount={expense.amount}
                type="expense"
                onDelete={() => setOpenDeleteAlert({ show: true, data: expense._id })}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400 py-4">No expense records found.</div>
          )}
        </div>

        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Expense"
        >
          <DeleteAlert
            content="Are you sure you want to delete this expense?"
            onDelete={() => deleteExpense(openDeleteAlert.data)}
            onCancel={() => setOpenDeleteAlert({ show: false, data: null })}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Expense;