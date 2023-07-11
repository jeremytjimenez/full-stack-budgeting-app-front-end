import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import "./Transaction.css"


function Transaction({ transactionArray, setTransactionArray }) {
    // const [transactionArray, setTransactionArray] = useState([])
    const [transaction, setTransaction] = useState({})

    const navigate = useNavigate();

    let url = process.env.NODE_ENV === "production" ? "https://full-stack-budgeting-app-back-end.onrender.com" : "http://localhost:3003"

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let id = useParams().id

    async function fetchData() {
        try {
          let result = await axios.get(`${url}/transactions`);
          setTransactionArray(result.data);

          let foundIndex = result.data.findIndex((item) => {
            return item.id === id
          })

          setTransaction(result.data[foundIndex])
        } catch (e) {
          console.log(e);
        }
    }

    function handleEdit(id) {
        navigate(`/transactions/${id}/edit`)
    }

    function handleBackButton() {
        navigate(`/transactions`)
    }

    async function handleDeleteById(id) {
        try {
            let result = await axios.delete(
              `${url}/transactions/${id}`
            );

            // let foundIndex = transactionArray.findIndex((item) => {
            //     return item.id === id
            // })
      
            let filteredArray = transactionArray.filter((item) => item !== result.data.data);
      
            setTransactionArray(filteredArray);
  
            alert("Deleted!")
  
            navigate(`/transactions`)
          } catch (e) {
            console.log(e);
          }
    }

    return (
        <div className="transaction-container">
            <h2>{transaction?.item_name}</h2>
            <div>
                <div className="transaction-container-content">
                    <h3>Amount: {transaction?.amount}</h3>
                    <p>Date: {transaction?.date}</p>
                    <p>From: {transaction?.from}</p>
                    <p>Category: {transaction?.category}</p>
                
                </div>

                <div className="transaction-container-navigation">
                    <ul>
                        <li>
                            <button onClick={() => handleBackButton()}>Back</button>
                        </li>
                        <li>
                            <button onClick={() => handleEdit(id)}>Edit</button>
                        </li>
                        <li>
                            <button onClick={() => handleDeleteById(id)}>Delete</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Transaction