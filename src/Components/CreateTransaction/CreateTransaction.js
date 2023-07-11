import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import "./CreateTransaction.css"

function CreateTransaction() {
    const navigate = useNavigate()

    const [transaction, setTransaction] = useState({
        item_name: "",
        amount: 0,
        date: "",
        from: "",
        category: ""
    })
    const [withdrawal, setWithdrawal] = useState(true)

    let url = process.env.NODE_ENV === "production" ? "https://full-stack-budgeting-app-back-end.onrender.com" : "http://localhost:3003"
  
    async function handleOnSubmit(e) {
      e.preventDefault();
  
      try {
          let result = await axios.post(`${url}/transactions`, {
              "transaction": transaction
          })
  
          setTransaction({})

          alert("Successful!")
  
          navigate(`/transactions/${result.data.data.id}`)
      } catch (e) {
          console.log(e)
      }
    }


    return (
        <div className="create-form-container">
            <form onSubmit={(e) => handleOnSubmit(e)} className="form-container-form">
                <h2>Add a new transaction</h2>
                <div className="form-container-input">
                    <label>Date</label>
                    <input
                        type="text"
                        value={transaction?.date}
                        onChange={(e) => setTransaction({
                            ...transaction,
                            date: e.target.value})}
                        required
                        placeholder="e.g. 4-26-23"
                    />
                </div>
                
                <div className="form-container-input">
                    <label>Name</label>
                    <input
                        type="text"
                        value={transaction?.item_name}
                        onChange={(e) => setTransaction({
                            ...transaction,
                            item_name: e.target.value})}
                        required
                    />
                </div>
                
                <div className="form-container-input">
                    <label>Amount</label>
                    <input
                        type="number"
                        value={transaction?.amount}
                        onChange={(e) => {
                            if (withdrawal) {
                                setTransaction({
                                    ...transaction,
                                    amount: -Math.abs(Number(e.target.value))})
                            } else {
                                setTransaction({
                                    ...transaction,
                                    amount: Math.abs(Number(e.target.value))})
                            }
                        }}
                        required
                    />
                    <br />
                    <label id="withdrawal">Withdrawal?</label>
                    <input 
                        type="checkbox"
                        checked={withdrawal}
                        onChange={(e) => setWithdrawal(!withdrawal)}
                    
                    />
                </div>
                
                <div className="form-container-input">
                    <label>From</label>
                    <input
                        type="text"
                        value={transaction?.from}
                        onChange={(e) => setTransaction({
                            ...transaction,
                            from: e.target.value})}
                    />
                </div>

                <div className="form-container-input">
                    <label>Category</label>
                    <input
                        type="text"
                        value={transaction?.category}
                        onChange={(e) => setTransaction({
                            ...transaction,
                            category: e.target.value})}
                    />
                </div>
                
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CreateTransaction