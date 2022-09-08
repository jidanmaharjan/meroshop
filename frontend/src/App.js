import './App.css';
import Home from './components/Home';
import Footer from './components/layout/Footer';
import Header from './components/layout/header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetails from './components/product/productDetails'
import { loadUser } from './actions/userActions';
import { useSelector } from 'react-redux';
import store from './store';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProtectedRoute from './components/route/ProtectedRoute';

//Auth or User
import Login from './components/user/Login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';

//Admin
import Dashboard from './components/admin/Dashboard';
import UpdateProduct from './components/admin/UpdateProduct';
import ProductsList from './components/admin/ProductsList';
import NewProduct from './components/admin/NewProduct';
import AllOrdersList from './components/admin/AllOrdersList';
import ProcessOrder from './components/admin/ProcessOrder';
import UsersList from './components/admin/UsersList';

//Cart
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';

//Payment
import Payment from './components/cart/Payment';
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe }  from '@stripe/stripe-js'
import OrderSuccess from './components/cart/OrderSuccess';

//Order
import ListOrders from './components/order/ListOrders';
import OrderDetails from './components/order/OrderDetails';
import UpdateUser from './components/admin/UpdateUser';
import ProductReviews from './components/admin/ProductReviews';

function App() {
  const [stripeApiKey, setStripeApiKey] = useState('');
  const { user, loading, isAuthenticated,error } = useSelector(state =>state.auth)

  useEffect(()=>{
    store.dispatch(loadUser())

    if(user && isAuthenticated){
      async function getStripeApiKey(){
      const { data } = await axios.get('/api/v1/stripeapi');
      setStripeApiKey(data.stripeApiKey);
    }
    getStripeApiKey();
    }
    
  }, [])
  
  

  return (
    <Router>
    <div className="App">
      <Header />
      <div className='container container-fluid'>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:productid' element={<ProductDetails />} />
        <Route path='/search/:keyword' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<ProtectedRoute />} >
          <Route path='/profile' element={<Profile />} />
        </Route>
        <Route path='/profile/update' element={<ProtectedRoute />} >
          <Route path='/profile/update' element={<UpdateProfile />} />
        </Route>
        <Route path='/password/update' element={<ProtectedRoute />} >
          <Route path='/password/update' element={<UpdatePassword />} />
        </Route>
        <Route path='/password/forgot' element={<ForgotPassword />} />
        <Route path='/password/reset/:token' element={<NewPassword />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/shipping' element={<ProtectedRoute />} >
          <Route path='/shipping' element={<Shipping />} />
        </Route>
        <Route path='/order/confirm' element={<ProtectedRoute />} >
          <Route path='/order/confirm' element={<ConfirmOrder />} />
        </Route>
        <Route path='/myorders' element={<ProtectedRoute />} >
          <Route path='/myorders' element={<ListOrders />} />
        </Route>
        <Route path='/order/:orderid' element={<ProtectedRoute />} >
          <Route path='/order/:orderid' element={<OrderDetails />} />
        </Route>
        
        <Route path='/payment' element={<ProtectedRoute />} >
          <Route path='/payment' element={stripeApiKey &&
        <Elements stripe={loadStripe(stripeApiKey)}> <Payment /> </Elements>} />
        </Route>
        <Route path='/success' element={<ProtectedRoute />} >
          <Route path='/success' element={<OrderSuccess />} />
        </Route>

        
      </Routes>
      </div>
      <Routes>
      <Route path='/dashboard'  element={<ProtectedRoute isAdmin={true} />} >
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route path='/admin/products'  element={<ProtectedRoute isAdmin={true} />} >
          <Route path='/admin/products' element={<ProductsList />} />
        </Route>
        <Route path='/admin/product'  element={<ProtectedRoute isAdmin={true} />} >
          <Route path='/admin/product' element={<NewProduct />} />
        </Route>
        <Route path='/admin/product/:productid'  element={<ProtectedRoute isAdmin={true} />} >
          <Route path='/admin/product/:productid' element={<UpdateProduct />} />
        </Route>
        <Route path='/admin/orders'  element={<ProtectedRoute isAdmin={true} />} >
          <Route path='/admin/orders' element={<AllOrdersList />} />
        </Route>
        <Route path='/admin/order/:orderid'  element={<ProtectedRoute isAdmin={true} />} >
          <Route path='/admin/order/:orderid' element={<ProcessOrder />} />
        </Route>
        <Route path='/admin/users'  element={<ProtectedRoute isAdmin={true} />} >
          <Route path='/admin/users' element={<UsersList />} />
        </Route>
        <Route path='/admin/user/:userid'  element={<ProtectedRoute isAdmin={true} />} >
          <Route path='/admin/user/:userid' element={<UpdateUser />} />
        </Route>
        <Route path='/admin/reviews'  element={<ProtectedRoute isAdmin={true} />} >
          <Route path='/admin/reviews' element={<ProductReviews />} />
        </Route>
      </Routes>
      
      {!loading && user ? user.role !== 'admin' && (<Footer/>) : <Footer/>}
      
    </div>
    </Router>
  );
}

export default App;
