import moment from "moment";

export const addThousandSeperator =(num)=>{
        if(num==null || isNaN(num)) return"";

        const [integerPart , fractionalPart] = num.toString().split(".");
        const formattedInteger = integerPart.replace(/\B( ?= (\d{3})+( ?! \d))/g,",");

        return fractionalPart ? `${formattedInteger}.${fractionalPart}`: formattedInteger;
}


export const prepareExpenseBarChartData = (data = []) => {
    if (!Array.isArray(data)) return [];
    const grouped = {};
    data.forEach(item => {
      if (!grouped[item.category]) {
        grouped[item.category] = 0;
      }
      grouped[item.category] += item.amount;
    });
    return Object.entries(grouped).map(([category, amount]) => ({ category, amount }));
  };



 export const prepareIncomeBarChartData = (data = []) => {
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
    const chartData = sortedData.map(item => ({
    month: moment(item?.date).format('Do MMM'),
    amount: item?.amount,
    source: item?.source,
    }) );
    return chartData;
}