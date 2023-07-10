import React, { useEffect, useState } from "react";
import axios from "axios";

import "./Transactions.css"

function Transactions() {
    const [transactionArray, setTransactionArray] = useState([]);
  
    useEffect(() => {
      fetchData();
    }, []);
  
    async function fetchData() {
      try {
        let result = await axios.get("http://localhost:3003/transactions");
        setTransactionArray(result.data);
      } catch (e) {
        console.log(e);
      }
    }
  
    return (
        <div>
            <h2>Total: ???</h2>
            <div className="table-container">
                <table id="transactions">
                    <tbody>
                        <tr>
                            <th>Date</th>
                            <th>Item</th>
                            <th>Amount</th>
                        </tr>

                        {transactionArray?.map(
                            ({ id, item_name, amount, date }) => {
                                return (
                                    <tr key={id}>
                                        <td>{date}</td>
                                        <td>{item_name}</td>
                                        <td>{amount}</td>
                                        <td><a href={`http://localhost:3000/logs/${index}`}>SEE MORE</a></td>
                                    </tr>
                                )
                            }
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Transactions