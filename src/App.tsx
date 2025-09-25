import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.scss'
import Search from './components/Search'
import ShoppingCart from './components/ShoppingCart'
import Home from './components/Home'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
      </Routes>
    </Router>
  )
}

export default App
