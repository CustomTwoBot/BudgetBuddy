import { useState, useEffect } from 'react'
// Chart imports for chart functionality
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './Card.jsx';

// Colors for the pie chart segments
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function App() {
  // Gets the saved transactions from local storage or initializes it to an empty array if not found (Phase 4)
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem('transactions');
    if (savedTransactions) {
      return JSON.parse(savedTransactions);
    }
    return [];
  });
  // Gets the saved balance from local storage or initializes it to 2000 if not found (Phase 4)
  const [balance, setBalance] = useState(() => {
    const savedBalance = localStorage.getItem('balance');
    if (savedBalance) {
      return JSON.parse(savedBalance);
    }
    return 2000; // Default balance
  });

  // State variables for transaction inputs
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Other');
  const [date, setDate] = useState('');

  // State variable for affordability calculator
  const [budgetAmount, setBudgetAmount] = useState('');
  const [daysInMonth, setDaysInMonth] = useState(30);


  // Saves transactions to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Saves balance to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('balance', JSON.stringify(balance));
  }, [balance]);
  // Handles adding a new transaction
  const handleAddTransaction = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior (refreshing the page after every entry)

    const newTransaction = {
      id: Date.now(), // Unique identifier for the transaction
      name: name,
      amount: parseFloat(amount),
      category: category,
      date: date
    }
    setTransactions([...transactions, newTransaction]) // the ... spread operator is used to create a new array that includes all existing transactions plus the new one
    setBalance(balance + parseFloat(amount)) // Update balance by adding the transaction amount
    // Clear input fields after adding
    setAmount('') 
    setName('')
    setCategory('Other')
    setDate('')
  }
  // Calculates total amount spent per category for the pie chart
  const categoryCount = () => {
    // Create an object to hold category totals
    const categoryTotals = {};
    // For each transaction, add its amount to the corresponding category total if it matches the category we are searching for
    transactions.forEach(transaction => {
      if (categoryTotals[transaction.category]) {
        categoryTotals[transaction.category] += transaction.amount;
      } else {
        categoryTotals[transaction.category] = transaction.amount;
      }
    });

    // Convert the category totals object into an array suitable for the pie chart
    return Object.entries(categoryTotals).map(([category, total]) => ({
      name: category,
      value: total
    })
    )
  }
  const affordabilityCalculator = () => {
    if (!budgetAmount || daysInMonth <= 0 || daysInMonth > 31) {
      return null;
    }
    else {
      // Calculate total spent from transactions
      const totalSpent = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
      // Calculate remaining budget after planned purchase
      const remainingBudget = balance - totalSpent;
      // Calculate budget after purchase
      const afterPurchaseBudget = remainingBudget - parseFloat(budgetAmount);
      // Calculate daily budget
      const dailyBudget = afterPurchaseBudget / daysInMonth;

      // Return the calculated values and if the user can afford the purchase
      return {
        canAfford: afterPurchaseBudget >= 0,
        remainingBudget: remainingBudget.toFixed(2),
        afterPurchaseBudget: afterPurchaseBudget.toFixed(2),
        dailyBudget: dailyBudget.toFixed(2)
        
      }
    }
  }
  // Clears all transactions and resets balance (Phase 8)
  const clearTransactions = () => {
    setTransactions([]);
    setBalance(2000); // Reset balance to default

    // Also clear from local storage
    localStorage.setItem('transactions', JSON.stringify([]));
    localStorage.setItem('balance', JSON.stringify(2000));
  }
  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-brand-900/80 via-bg to-bg/80 p-8">
      {/* Header */}
      <header className="max-w-7xl mx-auto mb-6 bg-gradient-to-br from-brand-900/80 via-bg to-bg/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm border border-white/5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-accent-500">Budget Buddy</h1>
            <p className="text-sm text-gray-300 mt-2">Balance: ${balance.toFixed(2)}</p>
            <p className="text-sm text-gray-400 mt-1">Transactions: {transactions.length}</p>
          </div>
          <button
            onClick={clearTransactions}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
            type="button"
          >
            Reset Data
          </button>
        </div>
      </header>

      {/* Main grid */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Add Transaction Card */}
        <Card title="Add Transaction" className="lg:col-span-1">
          <form onSubmit={handleAddTransaction} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                From:
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-white/10 rounded-lg bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500"
                placeholder="Enter name"
                required
              />
            </div>

            <div>
              <label htmlFor="amount" className="block text-sm font-medium mb-1">
                Amount:
              </label>
              <input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-2 border border-white/10 rounded-lg bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500"
                placeholder="0.00"
                required
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium mb-1">
                Category:
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border border-white/10 rounded-lg bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-accent-500 [&>option]:bg-gray-900 [&>option]:text-white"
              >
                <option value="Food/Drink">Food/Drink</option>
                <option value="Transport">Transport</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium mb-1">
                Date:
              </label>
              <input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2 border border-white/10 rounded-lg bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-accent-500 hover:bg-accent-400 text-black font-semibold px-4 py-2 rounded-lg transition"
            >
              Add Transaction
            </button>
          </form>
        </Card>

        {/* Pie Chart Card */}
        {transactions.length > 0 && (
          <Card title="Spending by Category" className="lg:col-span-2">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryCount()}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {categoryCount().map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042'][index % 4]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        )}

        {/* Affordability Calculator Card */}
        <Card title="Affordability Calculator" className="md:col-span-2 lg:col-span-1">
          <div className="space-y-4">
            <div>
              <label htmlFor="budgetAmount" className="block text-sm font-medium mb-1">
                Planned Purchase:
              </label>
              <input
                id="budgetAmount"
                type="number"
                value={budgetAmount}
                onChange={(e) => setBudgetAmount(e.target.value)}
                className="w-full p-2 border border-white/10 rounded-lg bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500"
                placeholder="0.00"
              />
            </div>

            <div>
              <label htmlFor="daysInMonth" className="block text-sm font-medium mb-1">
                Days Remaining:
              </label>
              <input
                id="daysInMonth"
                type="number"
                value={daysInMonth}
                onChange={(e) => setDaysInMonth(e.target.value)}
                className="w-full p-2 border border-white/10 rounded-lg bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
              />
            </div>

            {affordabilityCalculator() && (
              <div className="mt-4 p-3 rounded-lg bg-white/5 border border-white/10 text-sm space-y-2">
                {affordabilityCalculator().canAfford ? (
                  <>
                    <p className="text-accent-300 font-semibold">✓ You can afford this!</p>
                    <p>Before: ${affordabilityCalculator().remainingBudget}</p>
                    <p>After: ${affordabilityCalculator().afterPurchaseBudget}</p>
                    <p className="text-accent-300">Daily budget: ${affordabilityCalculator().dailyBudget}</p>
                  </>
                ) : (
                  <>
                    <p className="text-red-400 font-semibold">✗ Cannot afford this.</p>
                    <p>Over budget by: ${Math.abs(affordabilityCalculator().afterPurchaseBudget).toFixed(2)}</p>
                  </>
                )}
              </div>
            )}
          </div>
        </Card>

        {/* Transaction History Card */}
        <Card title="Transaction History" className="lg:col-span-3">
          {transactions.length === 0 ? (
            <p className="text-gray-400">No transactions yet. Add one to get started!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition"
                >
                  <p className="font-semibold text-accent-300">{transaction.name}</p>
                  <p className="text-sm text-gray-300 mt-1">
                    Amount: ${transaction.amount.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-400">Category: {transaction.category}</p>
                  <p className="text-sm text-gray-400">Date: {transaction.date}</p>
                </div>
              ))}
            </div>
          )}
        </Card>
      </main>
    </div>
  </>

  )
}
export default App
