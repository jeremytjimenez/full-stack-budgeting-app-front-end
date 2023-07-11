import React from 'react'
import { Link } from 'react-router-dom'

import "./Nav.css"

function Nav({ total, totalStyle }) {
  return (
    <div className="nav">
        <ul>
            <li className="left">
                <Link to="/transactions">Budgtr</Link>
            </li>
            <li style={totalStyle} className="total" >
              Total: {total}
            </li>
            <li className="right">
                <Link to="/transactions/new">Create Transaction</Link>
            </li>
        </ul>
    </div>
  )
}

export default Nav