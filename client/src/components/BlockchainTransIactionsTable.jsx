import React, { useState } from "react";

const toDollar = (btc) => {
  const conversionRate = 60000;
  return `DZ ${(btc * conversionRate).toLocaleString()}`;
};

const transactions = [
  {
    missionTitle: "Medical Aid",
    vol: "#VOL-2025-001",
    volenteer: "Alice Johnson",
    Amount: 0.05, // in BTC
    transactionDate: "Jan 15, 2025",
    transactionTime: "14:30",
    arrivalDate: 80,
  },
  {
    missionTitle: "Food Donation",
    vol: "#VOL-2025-001",
    volenteer: "Bob Smith",
    Amount: 0.1, // in BTC
    transactionDate: "Jan 15, 2025",
    transactionTime: "10:15",
    arrivalDate: 50,
  },
  {
    missionTitle: "Clean Water Project",
    vol: "#VOL-2025-001",
    volenteer: "Charlie Davis",
    Amount: 0.2, // in BTC
    transactionDate: "Jan 15, 2025",
    transactionTime: "16:45",
    arrivalDate: 95,
  },
  {
    missionTitle: "Food Donation",
    vol: "#VOL-2025-001",
    volenteer: "Bob Smith",
    Amount: 0.1, // in BTC
    transactionDate: "Jan 15, 2025",
    transactionTime: "10:15",
    arrivalDate: 50,
  },
  {
    missionTitle: "Clean Water Project",
    vol: "#VOL-2025-001",
    volenteer: "Charlie Davis",
    Amount: 0.2, // in BTC
    transactionDate: "Jan 15, 2025",
    transactionTime: "16:45",
    arrivalDate: 95,
  },
  {
    missionTitle: "Food Donation",
    vol: "#VOL-2025-001",
    volenteer: "Bob Smith",
    Amount: 0.1, // in BTC
    transactionDate: "Jan 15, 2025",
    transactionTime: "10:15",
    arrivalDate: 50,
  },
  {
    missionTitle: "Clean Water Project",
    vol: "#VOL-2025-001",
    volenteer: "Charlie Davis",
    Amount: 0.2, // in BTC
    transactionDate: "Jan 15, 2025",
    transactionTime: "16:45",
    arrivalDate: 95,
  },
  {
    missionTitle: "Food Donation",
    vol: "#VOL-2025-001",
    volenteer: "Bob Smith",
    Amount: 0.1, // in BTC
    transactionDate: "Jan 15, 2025",
    transactionTime: "10:15",
    arrivalDate: 50,
  },
  {
    missionTitle: "Food Donation",
    vol: "#VOL-2025-001",
    volenteer: "Bob Smith",
    Amount: 0.1, // in BTC
    transactionDate: "Jan 15, 2025",
    transactionTime: "10:15",
    arrivalDate: 50,
  },
  {
    missionTitle: "Food Donation",
    vol: "#VOL-2025-001",
    volenteer: "Bob Smith",
    Amount: 0.1, // in BTC
    transactionDate: "Jan 15, 2025",
    transactionTime: "10:15",
    arrivalDate: 50,
  },
  {
    missionTitle: "Clean Water Project",
    vol: "#VOL-2025-001",
    volenteer: "Charlie Davis",
    Amount: 0.2, // in BTC
    transactionDate: "Jan 15, 2025",
    transactionTime: "16:45",
    arrivalDate: 95,
  },
  

];

const ITEMS_PER_PAGE = 4;

const BlockchaintransactionsTable = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginatedTransactions = transactions.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  return (
    <div className="bg-white rounded-lg shadow mt-6  min-h-[65vh] flex flex-col">
      <div className="overflow-hidden flex-1">
        <table className="min-w-full bg-gray-100 border rounded-lg h-full">
          <thead className="bg-[#CCD6D2] rounded-t-lg">
            <tr>
              <th className="px-4 py-2 text-left text-mygreen">Mission Title</th>
              <th className="px-4 py-2 text-left text-mygreen">Volunteer</th>
              <th className="px-4 py-2 text-left text-mygreen">Amount (BTC / USD)</th>
              <th className="px-4 py-2 text-left text-mygreen">Date & Time</th>
              <th className="px-4 py-2 text-left text-mygreen">Progress</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {paginatedTransactions.map((transaction, index) => (
              <tr key={index} className="border-t max-h-16">
                <td className="px-4 py-2  max-h-16">
                  {transaction.missionTitle} <br />
                  <span className="text-gray-500">{transaction.vol}</span>
                </td>
                <td className="px-4 py-2  max-h-16">{transaction.volenteer}</td>
                <td className="px-4 py-2  max-h-16">
                  {transaction.Amount} BTC <br />
                  <span className="text-[#059669] text-sm">= {toDollar(transaction.Amount)}</span>
                </td>
                <td className="px-4 py-2  max-h-16">
                  {transaction.transactionDate} <br />
                  <span className="text-gray-500">{transaction.transactionTime}</span>
                </td>
                <td className="px-4 py-2 flex  items-center gap-1">
                  
                  <div className="relative w-28 h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#059669] transition-all duration-500"
                      style={{ width: `${transaction.arrivalDate}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600">{transaction.arrivalDate}%</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end p-4 space-x-2">
        <button
          onClick={handlePrev}
          disabled={currentPage === 0}
          className="px-4 py-2 bg-[#032B20] text-white rounded-lg disabled:opacity-50"
        >
          Prev
        </button>
        <button
          onClick={handleNext}
          disabled={currentPage >= totalPages - 1}
          className="px-4 py-2 bg-[#032B20] text-white rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BlockchaintransactionsTable;