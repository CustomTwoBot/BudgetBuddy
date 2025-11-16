import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  // Sets up an array of transactions that initialize as empty
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(2000);

  // State variables for transaction inputs
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Other');
  const [date, setDate] = useState('');

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
    
  return (
    // Lines 38-44 create the header section of the app, displaying the app name, current balance, and number of transactions.

    // Lines 49-50 create the title of the form and the form structure itself in our website
    // Lines 51-61 create the input field for the transaction name
    // Lines 62-72 create the input field for the transaction amount
    // Lines 73-85 create the dropdown select for the transaction category
    // Lines 86-96 create the input field for the transaction date
    // Lines 97-104 create the submit button to add the transaction

    // Lines 110-112 create the title for the transaction history section
    // Lines 113-121 display a message if there are no transactions
    // Lines 122-134 map over the transactions array and display each transaction's details in a styled div
    <>
      <div className='min-h-screen bg-orange-400 p-8'>
        <h1 className= "text-pink-500 text-4xl font-bold">Budget Buddy</h1>
        <p className= " text-black text-xl">Balance: ${balance}</p>

      <div className="mt-4">
        <p className= " text-black text-xl">Transactions: {transactions.length}</p>
      </div>

      {/* Transaction Input Form: <form> automatically creates a form for the user to type the transaction data pieces */}

      <form onSubmit={handleAddTransaction} className='w-full max-w-md mx-auto bg-white p-6 rounded-lg mt-8'>
        <h2 className='text-2xl font-bold mb-4 text-black'>Add Transaction</h2>
        <div className='mb-4'>
          <label className='block text-black mb-2'>From: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='w-full p-2 border border-gray-300 rounded'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-black mb-2'>Amount: </label>
          <input
            type = "number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className='w-full p-2 border border-gray-300 rounded'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-black mb-2'>Category: </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='w-full p-2 border border-gray-300 rounded'
          >
            <option value="Food/Drink">Food/Drink</option>
            <option value="Transport">Transport</option>
            <option value="Entertainment">Entertainment</option>
            <option value= "Other">Other</option>
          </select>
        </div>
        <div className='mb-4'>
          <label className='block text-black mb-2'>Date: </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className='w-full p-2 border border-gray-300 rounded'
            required
          />
        </div>
        <button
          type="submit"
          className='... bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600'
        >
          Add Transaction
        </button>
      </form>

      {/* Transaction List Section */}

      <div className='mt-8 max-w-md mx-auto'>
        <h2 className='text-2xl font-bold mb-4 text-black'>Transaction History</h2>
        {transactions.length === 0 ? (
          <p className='text-black'>No transactions yet. Fill out the transaction form to add one!</p>
        ) : (
          <div className='space-y-2'>
            {transactions.map((transaction) => (
              <div key={transaction.id} className='p-4 border border-gray-300 rounded bg-white'>
                <p className='text-black font-bold'>{transaction.name}</p>
                <p className='text-black'>Amount: ${transaction.amount.toFixed(2)}</p>
                <p className='text-black'>Category: {transaction.category}</p>
                <p className='text-black'>Date: {transaction.date}</p>
              </div>
            ))}
          </div>
        )}  

    </div>
  </div>
    </>
  )
}

export default App
