import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import "./EditTransaction.css"

function EditTransaction() {
    const { id } = useParams();
    const navigate = useNavigate()

    const [transaction, setTransaction] = useState({
        item_name: "",
        amount: 0,
        date: "",
        from: "",
        category: ""
    });

    useEffect(() => {
        handleFetchDataById();
    }, []);

    async function handleFetchDataById() {
        try { 
        let result = await axios.get(
            `http://localhost:3003/transactions/${id}`
        );

        setTransaction(result.data.data);
        } catch (e) {
        console.log(e);
        }
    }

    async function handleOnSubmit(e) {
        e.preventDefault();

        try {
        let result = await axios.put(
            `http://localhost:3003/transactions/${id}`,
            {
            ...transaction
            }
        );

        alert("Updated!");

        setTransaction(result.data.data);

        navigate(`/transactions/${id}`)
        } catch (e) {
        console.log(e);
        }
    }

    return (
        <div className="edit-form-container">
            <form onSubmit={(e) => handleOnSubmit(e)} className="edit-container-form">
                <h2>Edit a transaction</h2>
                <div className="edit-container-input">
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
                
                <div className="edit-container-input">
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
                
                <div className="edit-container-input">
                    <label>Amount</label>
                    <input
                        type="number"
                        value={transaction?.amount}
                        onChange={(e) => setTransaction({
                            ...transaction,
                            amount: e.target.value})}
                        required
                    />
                </div>
                
                <div className="edit-container-input">
                    <label>From</label>
                    <input
                        type="text"
                        value={transaction?.from}
                        onChange={(e) => setTransaction({
                            ...transaction,
                            from: e.target.value})}
                    />
                </div>

                <div className="edit-container-input">
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

export default EditTransaction