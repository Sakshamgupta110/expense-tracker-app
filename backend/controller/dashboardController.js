import { Income } from "../models/Income.js";
import { Expense } from "../models/Expense.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const getDashboardData = async (req, res) => {
  try {
    const userId = req.user._id;
    const now = new Date();
    const last30 = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    last30.setUTCDate(last30.getUTCDate() - 30);
    const last60 = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    last60.setUTCDate(last60.getUTCDate() - 60);

    // Aggregate totals
    const [incomeAgg, expenseAgg, income30Agg, expense30Agg, income60Agg, expense60Agg] = await Promise.all([
      Income.aggregate([
        { $match: { userId } },
        { $group: { _id: null, total: { $sum: "$amount" } } }
      ]),
      Expense.aggregate([
        { $match: { userId } },
        { $group: { _id: null, total: { $sum: "$amount" } } }
      ]),
      Income.aggregate([
        { $match: { userId, date: { $gte: last30 } } },
        { $group: { _id: null, total: { $sum: "$amount" } } }
      ]),
      Expense.aggregate([
        { $match: { userId, date: { $gte: last30 } } },
        { $group: { _id: null, total: { $sum: "$amount" } } }
      ]),
      Income.aggregate([
        { $match: { userId, date: { $gte: last60 } } },
        { $group: { _id: null, total: { $sum: "$amount" } } }
      ]),
      Expense.aggregate([
        { $match: { userId, date: { $gte: last60 } } },
        { $group: { _id: null, total: { $sum: "$amount" } } }
      ])
    ]);
    const totalIncome = incomeAgg[0]?.total || 0;
    const totalExpense = expenseAgg[0]?.total || 0;
    const balance = totalIncome - totalExpense;
    const last30DaysIncome = income30Agg[0]?.total || 0;
    const last30DaysExpense = expense30Agg[0]?.total || 0;
    const last60DaysIncome = income60Agg[0]?.total || 0;
    const last60DaysExpense = expense60Agg[0]?.total || 0;

    // Get recent transactions (last 5 incomes and expenses)
    const [recentIncomes, recentExpenses] = await Promise.all([
      Income.find({ userId }).sort({ date: -1 }).limit(5),
      Expense.find({ userId }).sort({ date: -1 }).limit(5)
    ]);

    const recentTransactions = [
      ...recentIncomes.map(i => ({
        type: "income",
        source: i.source,
        amount: i.amount,
        date: i.date,
        _id: i._id
      })),
      ...recentExpenses.map(e => ({
        type: "expense",
        category: e.category,
        source: e.category,
        amount: e.amount,
        date: e.date,
        _id: e._id
      }))
    ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

    const last30DaysExpensesArray = await Expense.find({
      userId,
      date: { $gte: last30 }
    }).sort({ date: -1 });

    const last30DaysIncomeArray = await Income.find({
      userId,
      date: { $gte: last30 }
    }).sort({ date: -1 });

    const last60DaysExpensesArray = await Expense.find({
      userId,
      date: { $gte: last60 }
    }).sort({ date: -1 });

    const last60DaysIncomeArray = await Income.find({
      userId,
      date: { $gte: last60 }
    }).sort({ date: -1 });

    return res.status(200).json(
      new ApiResponse(200, "Dashboard data fetched successfully", {
        totalIncome,
        totalExpense,
        balance,
        last30DaysIncome,
        last30DaysExpense,
        last60DaysIncome,
        last60DaysExpense,
        recentTransactions,
        last30DaysExpensesArray,
        last30DaysIncomeArray,
        last60DaysExpensesArray,
        last60DaysIncomeArray
      })
    );
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, "Server error", error.message));
  }
};

export { getDashboardData };
