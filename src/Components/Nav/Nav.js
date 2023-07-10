import React from 'react'
import { Link } from 'react-router-dom'

function Nav() {
  return (
    <div className="nav">
        <ul>
            <li>
                <Link to="/transactions">Budgeting App</Link>
            </li>
            <li id="create-transaction">
                <Link to="/transactions/new">Create Transaction</Link>
            </li>
        </ul>
    </div>
  )
}

export default Nav