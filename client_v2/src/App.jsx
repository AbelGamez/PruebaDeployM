import './App.css';
import { useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import NavigationMenu from './Components/General/Navbar';
import Footer from './Components/General/footer/Footer';

import LogIn from './Components/User/logIn';
import Register from './Components/User/register';
import ForgotPassword from './Components/User/ForgotPassword';
import ResetPassword from './Components/User/ResetPassword';
import ShoppingCartPage from './Components/ShoppingCart/SoppingCartPage';
import PaymentCheckout from './Components/Payment/payment';

import Dashboard from './Components/Admin/SidebarAdmin/Dashboard';
import Settings from './Components/Admin/settings';
import DisplayProductsAdmin from './Components/Admin/displayProductsAdmin';
import AddProducts from './Components/Products/addProducts';
import EditProduct from './Components/Admin/editProduct';
import ListAllUsers from './Components/User/ListAllUsers';
import EditUser from './Components/User/editUser';
import UserActionsList from './Components/Admin/userActionsList';

import DisplayProductsClient from './Components/Products/displayProductsClient';
import ProductDetails from './Components/Products/productDetail';

import MensajesIngles from "./lang/en-US.json";
import MensajesES from "./lang/es-ES.json";
import Transactions from './Components/Transaction/transaction';
import ListProductsPayment from './Components/Transaction/listProductsPayment';

import { LangProvider } from './context/langContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/cartContext';
import { PrivateRoute, PrivateRouteUser } from './Components/User/PrivateRoute';
import ListFacturasUser from './Components/UserFacturas/ListFacturasUser';
import Home from './Components/Home/Home';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const location = useLocation();

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const lang = localStorage.getItem('lang') || 'en-US';
  const mensajes = lang === 'es-ES' ? MensajesES : MensajesIngles;
  const locale = lang;
  // Verificar si la ruta coincide con los patrones específicos
  const isDashboardOrEditProduct = location.pathname === '/Dashboard' ||
                                   location.pathname === '/dashboard' ||
                                   location.pathname === '/settings/product-management/add/' ||
                                   /^\/settings\/product-management\/edit\/.+/.test(location.pathname);

  return (
    <AuthProvider>
      <CartProvider>
        <LangProvider>
          <IntlProvider locale={locale} messages={mensajes}>
            {/* Oculta un componente si esta en /Dashboard */}        
             {!isDashboardOrEditProduct && <NavigationMenu onCategorySelect={handleCategorySelect} selectedCategory={selectedCategory}/>}


            <Routes>
              {/* Ruta predeterminada que redirige a /home */}
              <Route path="/" element={<Navigate to="/home" />} />

              {/* Home */}
              <Route path="/home" element={<Home />} />

              {/* Rutas para la gestión de usuarios */}
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/myAccount" element={<PrivateRouteUser element={EditUser} />} />
              <Route path="/forgot" element={<ForgotPassword />} />
              <Route path="/reset/:token" element={<ResetPassword />} />
              <Route path="/transactions" element={<PrivateRouteUser element={Transactions} />} />
              <Route path="/ListFacturasUser" element={<PrivateRouteUser element={ListFacturasUser} />} />
              <Route path="/listProductsPayment/:paymentId" element={<PrivateRouteUser element={ListProductsPayment}/>} />

              {/* Rutas para la gestión de productos */}
              <Route path="/pistols" element={<DisplayProductsClient category="Pistols" />} />
              <Route path="/rifles" element={<DisplayProductsClient category="Rifles" />} />
              <Route path="/heavy" element={<DisplayProductsClient category="Heavy" />} />
              <Route path="/smgs" element={<DisplayProductsClient category="SMGs" />} />
              <Route path="/knives" element={<DisplayProductsClient category="Knives" />} />
              <Route path="/gloves" element={<DisplayProductsClient category="Gloves" />} />
              <Route path="/product/:id" element={<ProductDetails />} />

              {/* Rutas admin */}
              <Route path="/Dashboard" element={<PrivateRoute element={Dashboard} />} />
              <Route path="/settings/product-management" element={<PrivateRoute element={DisplayProductsAdmin} />} />
              <Route path="/settings/product-management/add" element={<PrivateRoute element={AddProducts} />} />
              <Route path='/settings/product-management/edit/:id' element={<PrivateRoute element={EditProduct} />} />
              <Route path="/settings/user-management" element={<PrivateRoute element={ListAllUsers} />} />
              <Route path="/settings/user-actions-log" element={<PrivateRoute element={UserActionsList} />} />

              {/* Rutas Shopping */}
              <Route path="/shopping-cart" element={<PrivateRouteUser element={ShoppingCartPage} />} />
              <Route path="/paymentCheckout" element={<PrivateRouteUser element={PaymentCheckout} />} />
            </Routes>
            
            {/* Oculta el footer si está en /Dashboard o en /settings/product-management/edit/:id */}
            {!isDashboardOrEditProduct && <Footer />}
          </IntlProvider>
        </LangProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
