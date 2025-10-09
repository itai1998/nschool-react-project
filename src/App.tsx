import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./App.scss";
import Search from "./components/Search";
import ShoppingCart from "./components/ShoppingCart";
import Home from "./components/home/Home";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/shopping-cart" element={<ShoppingCart />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
