import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import axios from "axios"
import { useState, useEffect } from "react"

import Transactions from './Components/Transactions/Transactions'
import Transaction from './Components/Transactions/Transaction'
import Nav from './Components/Nav/Nav'
import CreateTransaction from './Components/CreateTransaction/CreateTransaction'
import EditTransaction from './Components/EditTransaction/EditTransaction'

import "./App.css"


function App() {
  const [transactionArray, setTransactionArray] = useState([]);
  const [total, setTotal] = useState(0)
  const [totalStyle, setTotalStyle] = useState({
      color: "green"
  })

  let url = process.env.NODE_ENV === "production" ? "https://full-stack-budgeting-app-back-end.onrender.com" : "http://localhost:3003"

  useEffect(() => {
    fetchData();
  });

  useEffect(() => {
      calculateTotal(transactionArray)

      if (total > 100) {
          setTotalStyle({
              color: "green"
          })
      } 
      
      if (total > 0 && total < 100) {
          setTotalStyle({
              color: "yellow"
          })
      } 
      
      if (total < 0) {
          setTotalStyle({
              color: "red"
          })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionArray])

  async function fetchData() {
    try {
      let result = await axios.get(`${url}/transactions`);
      setTransactionArray(result.data);
    } catch (e) {
      console.log(e);
    }
  }

  function calculateTotal(array) {
    let currentTotal = 0

    array.forEach((item) => {
        currentTotal = currentTotal + Number(item.amount)
    })

    setTotal(currentTotal)
}

  return (
    <Router>
      <Nav total={total} totalStyle={totalStyle} />
      <Routes>
        <Route path="/transactions" element={<Transactions transactionArray={transactionArray} setTransactionArray={setTransactionArray}/>} />
        <Route path="/transactions/:id" element={<Transaction transactionArray={transactionArray} setTransactionArray={setTransactionArray}/>} />
        <Route path="/transactions/new" element={<CreateTransaction />} />
        <Route path="/transactions/:id/edit" element={<EditTransaction />} />
      </Routes>
    </Router>
  )
}

export default App