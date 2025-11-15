import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  // Sets up an array of transactions that initialize as empty
  const [transactions, setTransactions] = useState([])
  const [balance, setBalance] = useState(2000);

  return (
    // Lines 14-16: Setting background color to orange and title color to pink
    <>
      <div className='min-h-screen bg-orange-400 p-8'>
        <h1 className= "text-pink-500 text-4xl font-bold">Budget Buddy</h1>
        <p className= " text-black text-xl">Balance: ${balance}</p>

      <div className="mt-4">
        <p className= " text-black text-xl">Transactions: {transactions.length}</p>
      </div>
    </div>
      
    </>
  )
}

export default App
