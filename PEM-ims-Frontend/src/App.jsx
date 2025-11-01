import './App.css'
import SideBarMenu from './components/sideBarMenu'
import Dashboard from './pages/Dashboard'
import Product from './pages/Products'
import Purchase from './pages/Purchase'
import Sales from './pages/Sales'
import AddProducts from './pages/AddProducts'
import AppLayout from './layouts/AppLayout'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path='/' element={<Dashboard />} />
        <Route path='/products' element={<Product />} />
        <Route path='/purchases' element={<Purchase />} />
        <Route path='/sales' element={<Sales />} />
        <Route path='/addproducts' element={<AddProducts />} />
      </Route>
    </Routes>
  )
}

export default App
