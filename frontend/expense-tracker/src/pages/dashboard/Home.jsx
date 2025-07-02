import React,{useState,useEffect} from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import useUserAuth from '../../hooks/useUserAuth';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import ApiPaths from '../../utils/ApiPaths';
import InfoCard from '../../components/cards/InfoCard';
import {IoMdCard} from 'react-icons/io';
import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu';
import { addThousandSeperator } from '../../utils/helper';
import RecentTransactions from '../../components/dashboard/RecentTransaction';
import FinanceOverview from '../../components/dashboard/FinanceOverview';
import ExpenseTransactions from '../../components/dashboard/ExpenseTransactions';
import Last30DaysExpenses from '../../components/dashboard/last30DaysExpenses';
import RecentIncomeWithChart from '../../components/dashboard/RecentIncomeWithChart';
import RecentIncome from '../../components/dashboard/RecentIncome';


const Home = () => {
  useUserAuth();

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);


  const fetchDashboardData = async () =>{
    if(loading) return;

    setLoading(true);
    try {
      const response = await axiosInstance.get(`${ApiPaths.DASHBOARD.GET_DATA
      }`)
      if(response.data)
        setDashboardData(response.data);
    } catch (error) {
      console.log("something went wrong .plese try again ",error)
    }
    finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    return ()=>{}
  }, [])

  
  return (
   <DashboardLayout activemenu="Dashboard">
    <div className='my-5 mx-auto'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <InfoCard 
          icon={<IoMdCard />}
          label="Total Balance"
          value={dashboardData ? addThousandSeperator(dashboardData.data?.balance || 0) : '...'}
          color="bg-violet-500"
        />
        <InfoCard 
          icon={<LuWalletMinimal />}
          label="Total Income"
          value={dashboardData ? addThousandSeperator(dashboardData.data?.totalIncome || 0) : '...'}
          color="bg-orange-500"
        />
        <InfoCard 
          icon={<LuHandCoins />}
          label="Total Expense"
          value={dashboardData ? addThousandSeperator(dashboardData.data?.totalExpense || 0) : '...'}
          color="bg-red-500"
        />
      </div>
    </div>

    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
      <RecentTransactions 
        transactions={dashboardData?.data?.recentTransactions || []}
        onSeeMore={()=>navigate("/expense")}
      />
       <FinanceOverview 
     totalBalance ={dashboardData?.data.balance || 0 }
     totalIncome ={dashboardData?.data.totalIncome || 0}
     totalExpense ={dashboardData?.data.totalExpense || 0}
    />

    <ExpenseTransactions 
    transactions={dashboardData?.data?.last30DaysExpensesArray || []}
    onSeeMore={()=>navigate("/expense")}
    />

    <Last30DaysExpenses 
    data={dashboardData?.data?.last30DaysExpensesArray || []} 
    />

    <RecentIncome 
    transactions={dashboardData?.data.last60DaysIncomeArray.slice(0,5) || []}
    onSeeMore={()=>navigate("/income")} />

    <RecentIncomeWithChart 
    data={dashboardData?.data.last60DaysIncomeArray || []}
    totalIncome={dashboardData?.data.totalIncome || 0} />
    </div>

   
   </DashboardLayout>
  )
}

export default Home