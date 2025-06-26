import { User } from "../models/User.js";

import { Income } from "../models/Income.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import ExcelJS from "exceljs";
import xlsx from "xlsx";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const addIncome = async (req, res) => {
  try {
    const { source, amount, date } = req.body;

    // Validate required fields
    if (!source || !amount) {
      return res
        .status(400)
        .json(new ApiResponse(400, "Source and amount are required"));
    }

    //validate amount is a number
    if (isNaN(amount)) {
      return res
        .status(400)
        .json(new ApiResponse(400, "Amount must be a number"));
    }

    // Use current date if not provided
    const incomeDate = date ? date : new Date();

    // Create new income entry
    const income = new Income({
      source,
      amount,
      date: incomeDate,
      userId: req.user._id 
    });

    await income.save();

    // Send success response
    return res
      .status(201)
      .json(new ApiResponse(201, "Income added successfully", income));
  } catch (error) {
    // Handle unexpected errors
    return res
      .status(500)
      .json(new ApiResponse(500, "Server error", error.message));
  }
};

const getAllIncome = async (req, res) => {
  try {
    // Fetch all income records for the logged-in user
    const incomes = await Income.find({ userId: req.user._id }).sort({ date: -1 });
    return res.status(200).json(new ApiResponse(200, "All incomes fetched successfully", incomes));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, "Server error", error.message));
  }
}

const deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedIncome = await Income.findOneAndDelete({ _id: id, userId: req.user._id });
    if (!deletedIncome) {
      return res.status(404).json(new ApiResponse(404, "Income not found or not authorized"));
    }
    return res.status(200).json(new ApiResponse(200, "Income deleted successfully"));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, "Server error", error.message));
  }
}

const downloadIncomeExcel = async (req, res) => {
  try {
    const userId = req.user._id; 
    const incomes = await Income.find({ userId }).sort({ date: -1 });

    const data = incomes.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date ? item.date.toISOString().split('T')[0] : "",
    }));


    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Income");
    xlsx.writeFile(wb, 'income_details.xlsx');
    res.download('income_details.xlsx');
  } catch (error) {
    console.error("Excel download error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export {addIncome,getAllIncome,deleteIncome,downloadIncomeExcel};