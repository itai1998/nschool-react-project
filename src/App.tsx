import Footer from './components/Footer'
import Intro from './components/Intro'
import Links from './components/Links'
import NavBar from './components/NavBar'
import NewProducts from './components/NewProducts'
import Products from './components/Products'

function App() {
  return (
    <div className="App">
      <NavBar />
      <Intro />
      <Products />
      <NewProducts />
      <Links />
      <Footer />
    </div>
  )
}

export default App
