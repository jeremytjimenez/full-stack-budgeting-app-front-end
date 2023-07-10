import React from 'react'
import { Link } from 'react-router-dom'

import "./Nav.css"

function Nav() {
  return (
    <div className="nav">
        <ul>
            <li className="left">
                <Link to="/transactions">Budgeting App</Link>
            </li>
            <li className="right">
                <Link to="/transactions/new">Create Transaction</Link>
            </li>
        </ul>
    </div>
  )
}

export default Nav