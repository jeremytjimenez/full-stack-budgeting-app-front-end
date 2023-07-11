import React, { useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'

import "./Transactions.css"

function Transactions({ transactionArray, setTransactionArray }) {
    // const [transactionArray, setTransactionArray] = useState([]);
    // const [total, setTotal] = useState(0)
    // const [totalStyle, setTotalStyle] = useState({
    //     color: "green"
    // })

    let url = process.env.NODE_ENV === "production" ? "https://full-stack-budgeting-app-back-end.onrender.com" : "http://localhost:3003"
  
    useEffect(() => {
      fetchData();
    }, []);

    // useEffect(() => {
    //     calculateTotal(transactionArray)

    //     if (total > 100) {
    //         setTotalStyle({
    //             color: "green"
    //         })
    //     } 
        
    //     if (total > 0 && total < 100) {
    //         setTotalStyle({
    //             color: "yellow"
    //         })
    //     } 
        
    //     if (total < 0) {
    //         setTotalStyle({
    //             color: "red"
    //         })
    //     }
    // }, [transactionArray])
  
    async function fetchData() {
      try {
        let result = await axios.get(`${url}/transactions`);
        setTransactionArray(result.data);
      } catch (e) {
        console.log(e);
      }
    }

    function sortNumber(a, b) {
        return Number(a.date.split("-")[0]) - Number(b.date.split("-")[0])
    }

    function formatDate(date) {
        let dateArray = date.split("-")

        let month = Number(dateArray[0])
        let day = Number(dateArray[1])

        let stringMonth = ""

        switch (month) {
            case 1:
                stringMonth = "January"
                break;
            case 2:
                stringMonth = "February"
                break;
            case 3:
                stringMonth = "March"
                break;
            case 4:
                stringMonth = "April"
                break;
            case 5:
                stringMonth = "May"
                break;
            case 6:
                stringMonth = "June"
                break;
            case 7:
                stringMonth = "July"
                break;
            case 8:
                stringMonth = "August"
                break;
            case 9:
                stringMonth = "September"
                break;
            case 10:
                stringMonth = "October"
                break;
            case 11:
                stringMonth = "November"
                break;
            case 12:
                stringMonth = "December"
                break;
            default:
                stringMonth = null
                break;
        }

        let formattedDate = `${stringMonth} ${day}`

        return formattedDate
    }

    // function calculateTotal(array) {
    //     let currentTotal = 0

    //     array.forEach((item) => {
    //         currentTotal = currentTotal + Number(item.amount)
    //     })

    //     setTotal(currentTotal)
    // }
  
    return (
        <div>
            {/* <h2 id="total" style={totalStyle}>Total: {total}</h2> */}
            <div className="table-container">
                <table id="transactions">
                    <tbody>
                        <tr>
                            <th>Date</th>
                            <th>Item</th>
                            <th>Amount</th>
                        </tr>

                        {transactionArray?.toSorted((a, b) => sortNumber(a, b)).map(
                            ({ id, item_name, amount, date }) => {
                                return (
                                    <tr key={id}>
                                        <td><Link to={`/transactions/${id}`}>{formatDate(date)}</Link></td>
                                        <td><Link to={`/transactions/${id}`}>{item_name}</Link></td>
                                        <td><Link to={`/transactions/${id}`}>{amount}</Link></td>
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