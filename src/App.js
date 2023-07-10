import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Transactions from './Components/Transactions/Transactions'
import Transaction from './Components/Transactions/Transaction'
import Nav from './Components/Nav/Nav'
import CreateTransaction from './Components/CreateTransaction/CreateTransaction'
import EditTransaction from './Components/EditTransaction/EditTransaction'

import "./App.css"


function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/transactions/:id" element={<Transaction />} />
        <Route path="/transactions/new" element={<CreateTransaction />} />
        <Route path="/transactions/:id/edit" element={<EditTransaction />} />
      </Routes>
    </Router>
  )
}

export default App