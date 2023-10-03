import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Home from './pages/Home'
import ViewProduct from './pages/ViewProduct'
import ChooseUser from './pages/ChooseUser'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'
import AuthenticationPage from './pages/AuthenticationPage'
import AdminDashboard from './pages/admin/AdminDashboard'
import CustomerSearch from './pages/customer/CustomerSearch'
import Logout from './pages/Logout';
import Products from './pages/Products';
import { productData } from './components/products';

const App = () => {
  const { currentRole } = useSelector(state => state.user);

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

      {currentRole === "Admin" &&
        <>
          <AdminDashboard />
        </>
      }

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