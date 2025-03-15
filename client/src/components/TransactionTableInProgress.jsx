import React from "react";

// Example transaction data
const transactions = [
  {
    missionTitle: "Clean Water Initiative",
    amount: "$500.00",
    blockId: "0x8f2d3...",
    transactionDate: "Jan 15, 2025",
    arrivalDate: 50, // Percentage value (e.g., 50%)
   
  },
  {
    missionTitle: "Clean Water Initiative",
    amount: "$500.00",
    blockId: "0x8f2d3...",
    transactionDate: "Jan 15, 2025",
    arrivalDate: 80, // Percentage value (e.g., 50%)
   
  },
  {
    missionTitle: "Clean Water Initiative",
    amount: "$500.00",
    blockId: "0x8f2d3...",
    transactionDate: "Jan 15, 2025",
    arrivalDate: 20, // Percentage value (e.g., 50%)
   
  },
  {
    missionTitle: "Clean Water Initiative",
    amount: "$500.00",
    blockId: "0x8f2d3...",
    transactionDate: "Jan 15, 2025",
    arrivalDate: 10, // Percentage value (e.g., 50%)
   
  },
  {
    missionTitle: "Clean Water Initiative",
    amount: "$500.00",
    blockId: "0x8f2d3...",
    transactionDate: "Jan 15, 2025",
    arrivalDate: 50, // Percentage value (e.g., 50%)
   
  },
];

const TransactionTableInProgress = () => {
  return (
    <div className="pt-6 bg-white rounded-t-lg mt-6 shadow">
      <h2 className="text-md font-semibold ml-5 font-jakarta mb-4">
        Pending Transactions
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-100 border rounded-lg">
          <thead className="bg-[#CCD6D2]">
            <tr>
              <th className="px-4 py-2 font-jakarta font-medium text-md text-mygreen text-left">
                Mission Title
              </th>
              <th className="px-4 py-2 font-jakarta font-medium text-md text-mygreen text-left">
                Amount
              </th>
              <th className="px-4 py-2 font-jakarta font-medium text-md text-mygreen text-left">
                Block ID
              </th>
              <th className="px-4 py-2 font-jakarta font-medium text-md text-mygreen text-left">
                Transaction Date
              </th>
              <th className="px-4 py-2 font-jakarta font-medium text-md text-mygreen text-left">
                Progress
              </th>
              <th className="px-4 py-2 font-jakarta font-medium text-md text-mygreen text-left">
                Tracking
              </th>
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
                <td className="px-4 text-md py-2">
                  {transaction.transactionDate}
                </td>
                <td className="px-4 flex items-center gap-1 justify-start text-md py-2">
                  {/* Progress Bar */}
                  <span className="text-xs text-gray-600 ml-2">
                    {transaction.arrivalDate}%
                  </span>
                  <div className="relative w-28 h-3 bg-gray-200 rounded-full overflow-hidden">
                  
                    <div
                      className="h-full bg-[#FFD599] transition-all duration-500"
                      style={{ width: `${transaction.arrivalDate}%` }}
                    ></div>
                  </div>
                 
                </td>
                <td className="px-4 text-md py-2 text-mygreen hover:underline cursor-pointer">
                  View tracking
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTableInProgress;
