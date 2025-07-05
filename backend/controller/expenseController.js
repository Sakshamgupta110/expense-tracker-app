import { User } from "../models/User.js";

import { Expense } from "../models/Expense.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import ExcelJS from "exceljs";
import xlsx from "xlsx";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const addExpense = async (req, res) => {
  try {
    const { category, amount, date,icon } = req.body;
    if (!category || !amount) {
      return res.status(400).json(new ApiResponse(400, "Category and amount are required"));
    }
    if (isNaN(amount)) {
      return res.status(400).json(new ApiResponse(400, "Amount must be a number"));
    }
    const expenseDate = date ? date : new Date();
    const expense = new Expense({
      category,
      amount,
      date: expenseDate,
      icon,
      userId: req.user._id
    });
    await expense.save();
    return res.status(201).json(new ApiResponse(201, "Expense added successfully", expense));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, "Server error", error.message));
  }
};

const getAllExpense = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user._id }).sort({ date: -1 });
    return res.status(200).json(new ApiResponse(200, "All expenses fetched successfully", expenses));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, "Server error", error.message));
  }
};

const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedExpense = await Expense.findOneAndDelete({ _id: id, userId: req.user._id });
    if (!deletedExpense) {
      return res.status(404).json(new ApiResponse(404, "Expense not found or not authorized"));
    }
    return res.status(200).json(new ApiResponse(200, "Expense deleted successfully"));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, "Server error", error.message));
  }
};

const downloadExpenseExcel = async (req, res) => {
  try {
    const userId = req.user._id;
    const expenses = await Expense.find({ userId }).sort({ date: -1 });
    const data = expenses.map((item) => ({
      Category: item.category,
      Amount: item.amount,
      Date: item.date ? item.date.toISOString().split('T')[0] : "",
    }));
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Expenses");
    const filePath = path.join(process.cwd(), "expense_details.xlsx");
    xlsx.writeFile(wb, filePath);
    res.download(filePath, "expense_details.xlsx", (err) => {
      fs.unlinkSync(filePath);
      if (err) {
        return res.status(500).json({ message: "Error sending file" });
      }
    });
  } catch (error) {
    console.error("Excel download error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export { addExpense, getAllExpense, deleteExpense, downloadExpenseExcel };