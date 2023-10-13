import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import Home from './pages/Home'
import ViewProduct from './pages/ViewProduct'
import Profile from './components/Profile'
import Navbar from './pages/Navbar'
import AuthenticationPage from './pages/AuthenticationPage'
import SellerDashboard from './pages/seller/SellerDashboard'
import CustomerSearch from './pages/customer/pages/CustomerSearch'
import Logout from './components/Logout';
import Products from './components/Products';
import { useEffect } from 'react';
import { getProducts } from './redux/userHandle';
import CustomerOrders from './pages/customer/pages/CustomerOrders';
import CheckoutSteps from './pages/customer/pages/CheckoutSteps';

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
            <Route path='*' element={<Navigate to="/" />} />

            <Route path="/Products" element={<Products productData={productData} />} />

            <Route path="/product/view/:id" element={<ViewProduct />} />

            <Route path="/Search" element={<CustomerSearch mode="Mobile" />} />
            <Route path="/ProductSearch" element={<CustomerSearch mode="Desktop" />} />

            <Route path="/Customerregister" element={<AuthenticationPage mode="Register" role="Customer" />} />
            <Route path="/Customerlogin" element={<AuthenticationPage mode="Login" role="Customer" />} />
            <Route path="/Sellerregister" element={<AuthenticationPage mode="Register" role="Seller" />} />
            <Route path="/Sellerlogin" element={<AuthenticationPage mode="Login" role="Seller" />} />
          </Routes>
        </>
      }

      {currentRole === "Customer" &&
        <>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path='*' element={<Navigate to="/" />} />

            <Route path="/Products" element={<Products productData={productData} />} />

            <Route path="/product/view/:id" element={<ViewProduct />} />

            <Route path="/Search" element={<CustomerSearch mode="Mobile" />} />
            <Route path="/ProductSearch" element={<CustomerSearch mode="Desktop" />} />

            <Route path="/Checkout" element={<CheckoutSteps />} />

            <Route path="/Profile" element={<Profile />} />
            <Route path="/Orders" element={<CustomerOrders />} />
            <Route path="/Logout" element={<Logout />} />
          </Routes>
        </>
      }

      {(currentRole === "Seller" || currentRole === "Shopcart") && (
        <>
          <SellerDashboard />
        </>
      )}

    </BrowserRouter >
  )
}

export default App