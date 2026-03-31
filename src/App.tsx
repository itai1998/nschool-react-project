import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";
import Search from "./pages/Search";
import ShoppingCart from "./pages/ShoppingCart";
import Home from "./pages/Home";
import MegaMenu from "./features/home/components/MegaMenu";

function App() {
  return (
    <Router>
      <MegaMenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
      </Routes>
    </Router>
  );
}

export default App;
