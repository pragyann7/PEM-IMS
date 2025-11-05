import './App.css'
import SideBarMenu from './components/sideBarMenu'
import Dashboard from './pages/Dashboard'
import Product from './pages/Products'
import Purchase from './pages/Purchase'
import Sales from './pages/Sales'
import AddProducts from './pages/AddProducts'
import Repair from './pages/Repair'
import AppLayout from './layouts/AppLayout'
import SignIn from './pages/SignIn'
import ProtectedRoute from './ProtectedRoute/ProtectedRoute'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <Routes>
      <Route path='/signin' element={<SignIn />} />
      <Route element={<ProtectedRoute> <AppLayout /></ProtectedRoute>}>
        <Route path='/' element={<Dashboard />} />
        <Route path='/products' element={<Product />} />
        <Route path='/purchases' element={<Purchase />} />
        <Route path='/sales' element={<Sales />} />
        <Route path='/addproducts' element={<AddProducts />} />
        <Route path='/repair' element={<Repair />} />
      </Route>
    </Routes>
  )
}

export default App
