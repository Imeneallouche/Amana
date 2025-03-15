import React from "react";
//this is some example of data for the transactions
const transactions = [
  {
    missionTitle: "Clean Water Initiative",
    amount: "$500.00",
    blockId: "0x8f2d3...",
    transactionDate: "Jan 15, 2025",
    arrivalDate: "Jan 17, 2025",
    
  },
  {
    missionTitle: "Renewable Energy Fund",
    amount: "$750.00",
    blockId: "0xa3b5c...",
    transactionDate: "Feb 10, 2025",
    arrivalDate: "Feb 12, 2025",
  },
  {
    missionTitle: "Renewable Energy Fund",
    amount: "$750.00",
    blockId: "0xa3b5c...",
    transactionDate: "Feb 10, 2025",
    arrivalDate: "Feb 12, 2025",
  },
  {
    missionTitle: "Renewable Energy Fund",
    amount: "$750.00",
    blockId: "0xa3b5c...",
    transactionDate: "Feb 10, 2025",
    arrivalDate: "Feb 12, 2025",
  },
  {
    missionTitle: "Renewable Energy Fund",
    amount: "$750.00",
    blockId: "0xa3b5c...",
    transactionDate: "Feb 10, 2025",
    arrivalDate: "Feb 12, 2025",
  },
  {
    missionTitle: "Renewable Energy Fund",
    amount: "$750.00",
    blockId: "0xa3b5c...",
    transactionDate: "Feb 10, 2025",
    arrivalDate: "Feb 12, 2025",
  },
];

const TransactionTableCompleted = () => {
  return (
    <div className="bg-white rounded-t-lg mt-6 shadow">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-100 border rounded-t-lg">
          <thead className="bg-[#CCD6D2] rounded-t-lg">
            <tr>
              <th className="px-4 py-2 font-jakarta font-medium text-md text-mygreen text-left">Mission Title</th>
              <th className="px-4 py-2 font-jakarta font-medium text-md text-mygreen text-left">Amount</th>
              <th className="px-4 py-2 font-jakarta font-medium text-md text-mygreen text-left">Block ID</th>
              <th className="px-4 py-2 font-jakarta font-medium text-md text-mygreen text-left">Transaction Date</th>
              <th className="px-4 py-2 font-jakarta font-medium text-md text-mygreen text-left">Arrival Date</th>
              <th className="px-4 py-2 font-jakarta font-medium text-md text-mygreen text-left">Results</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {transactions.map((transaction, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 text-md py-2">{transaction.missionTitle}</td>
                <td className="px-4 text-md py-2">{transaction.amount}</td>
                <td className="px-4 text-md py-2 text-blue-600 cursor-pointer">
                  {transaction.blockId}
                </td>
                <td className="px-4 text-md py-2">{transaction.transactionDate}</td>
                <td className="px-4 text-md py-2">{transaction.arrivalDate}</td>
                <td className="px-4 text-md py-2 text-mygreen hover:underline cursor-pointer">
                  View your impact
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default TransactionTableCompleted;

