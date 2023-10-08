import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import Home from './pages/Home'
import ViewProduct from './pages/ViewProduct'
import ChooseUser from './pages/ChooseUser'
import Profile from './components/Profile'
import Navbar from './pages/Navbar'
import AuthenticationPage from './pages/AuthenticationPage'
import AdminDashboard from './pages/admin/AdminDashboard'
import CustomerSearch from './pages/customer/pages/CustomerSearch'
import Logout from './components/Logout';
import Products from './components/Products';
import { useEffect } from 'react';
import { getProducts } from './redux/userHandle';

const App = () => {

  const dispatch = useDispatch()

  const { currentRole, productData } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch])

  return (
    <BrowserRouter>
      {currentRole === null &&
        <>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Products" element={<Products productData={productData} />} />

            <Route path="/product/view/:id" element={<ViewProduct />} />

            <Route path='*' element={<Navigate to="/" />} />
            <Route path="/Login/Register" element={<ChooseUser />} />

            <Route path="/Customerregister" element={<AuthenticationPage mode="Register" role="Customer" />} />
            <Route path="/Customerlogin" element={<AuthenticationPage mode="Login" role="Customer" />} />
            <Route path="/Adminregister" element={<AuthenticationPage mode="Register" role="Admin" />} />
            <Route path="/Adminlogin" element={<AuthenticationPage mode="Login" role="Admin" />} />
          </Routes>
        </>
      }

      {(currentRole === "Admin" || currentRole === "Shopcart") && (
        <>
          <AdminDashboard />
        </>
      )}

      {currentRole === "Customer" &&
        <>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Products" element={<Products productData={productData} />} />
            <Route path='*' element={<Navigate to="/" />} />
            <Route path="/Profile" element={<Profile />} />

            <Route path="/product/view/:id" element={<ViewProduct />} />

            <Route path="/Search" element={<CustomerSearch mode="Mobile" />} />
            <Route path="/ProductSearch" element={<CustomerSearch mode="Desktop" />} />
            <Route path="/Logout" element={<Logout />} />
          </Routes>
        </>
      }
    </BrowserRouter >
  )
}

export default App