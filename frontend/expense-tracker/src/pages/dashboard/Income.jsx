import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import IncomeOverview from "../../components/income/IncomeOverview";
import axiosInstance from "../../utils/axiosInstance";
import ApiPaths from "../../utils/ApiPaths";
import Modal from "../../components/modal/Modal";
import AddIncomeForm from "../../components/income/AddIncomeForm";
import toast from "react-hot-toast";
import IncomeList from "../../components/income/IncomeList";
import DeleteAlert from "../../components/DeleteAlert";
import useUserAuth from "../../hooks/useUserAuth";

const Income = () => {

  useUserAuth();
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  useEffect(() => {
    fetchIncomeDetails();
    return ()=>{};
  }, []);

  // Get All Income Details
  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(ApiPaths.INCOME.GET_ALL_INCOME);
      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };
  

  // Handle Add Income
  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;

    // Validate fields
    if (!source || source.trim() === "") {
      toast.error("Please enter an income source.");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }
    if (!date || date.trim() === "") {
      toast.error("Please select a date.");
      return;
    }

    try {

      await axiosInstance.post(ApiPaths.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon
      })
      setOpenAddIncomeModal(false);
      toast.success("Income added successfully!");
      fetchIncomeDetails();
    } catch (error) {
      toast.error("Failed to add income. Please try again.");

      console.error(
        "error adding income" , error.response?.data?.message || error.message
      )
    }
  };
  // Delete Income
  const deleteIncome = async (id) => {
    if (!id) return;
    try {
      await axiosInstance.delete(ApiPaths.INCOME.DELETE_INCOME(id));
      setOpenDeleteAlert(false);
      toast.success("Income deleted successfully!");
      fetchIncomeDetails();
    } catch (error) {
      toast.error("Failed to delete income. Please try again.");
      console.error(
        "Error deleting income:",
        error.response?.data?.message || error.message
      );
    }
  };
  // handle download income details
  const handleDownloadIncomeDetails = async () => {};

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <IncomeOverview
              transactions={incomeData?.data}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>

          <IncomeList
            transactions={incomeData?.data}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
            onDownload={handleDownloadIncomeDetails}
          />
        </div>

        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Income"
        >
          <DeleteAlert
            content="Are you sure you want to delete this income?"
            onDelete={() => deleteIncome(openDeleteAlert.data)}
            onCancel={() => setOpenDeleteAlert({ show: false, data: null })}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Income;