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
import ExpenseLineChart from "../../components/charts/ExpenseLineChart";
import { prepareExpenseLineChartData } from "../../utils/helper";
import ExpenseOverview from "../../components/expense/ExpenseOverview";
import ExpenseList from "../../components/expense/ExpenseList";

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

  const chartData = prepareExpenseLineChartData(expenseData.data || []);

  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(ApiPaths.EXPENSE.DOWNLOAD_EXPENSE, {
        responseType: 'blob', // Important for file downloads
      });

      // Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'expense_details.xlsx'); // Set the file name
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success("Expense details downloaded!");
    } catch (error) {
      toast.error("Failed to download expense details.");
      console.error("Download error:", error);
    }
  };

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <ExpenseOverview
          transactions={chartData}
          onAddExpense={() => setOpenAddExpenseModal(true)}
        />

        <ExpenseList
          transactions={expenseData.data || []}
          onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
          onDownload={handleDownloadExpenseDetails}
        />

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