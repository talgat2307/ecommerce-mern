import { Switch, Route } from 'react-router-dom';
import Layout from './components/GlobalLayout/Layout';
import Login from './containers/Authentication/Login';
import Register from './containers/Authentication/Register';
import { Redirect } from 'react-router';
import { useSelector } from 'react-redux';
import Products from './containers/Products';
import ProductDetails from './containers/ProductDetails';
import Cart from './containers/Cart';
import Shipping from './containers/Shipping';
import Payment from './containers/Payment';
import PlaceOrder from './containers/PlaceOrder';
import Order from './containers/Order';
import UserProfile from './containers/UserProfile';
import AdminDashboardRoutes from './containers/AdminDashboard/AdminDashboardRoutes';

const ProtectedRoute = ({ isAllowed, redirectTo, ...props }) => {
  return isAllowed ? <Route {...props}/> : <Redirect to={redirectTo}/>;
};

const App = () => {
  const user = useSelector(state => state.userLogin.userInfo);

  return (
    <>
      <Layout>
        <Switch>
          <Route path={'/'} exact component={Products}/>
          <Route path={'/search/:keyword'} exact component={Products}/>
          <ProtectedRoute path={'/register'} component={Register} isAllowed={!user} redirectTo={'/'}/>
          <Route path={'/login'} component={Login}/>
          <Route path={'/product/:id'} component={ProductDetails}/>
          <Route path={'/cart/:id?'} component={Cart}/>
          <ProtectedRoute path={'/shipping'} component={Shipping} isAllowed={user} redirectTo={'/login'}/>
          <Route path={'/payment'} component={Payment}/>
          <ProtectedRoute path={'/place-order'} component={PlaceOrder} isAllowed={user} redirectTo={'/login'}/>
          <ProtectedRoute path={'/order/:id'} component={Order} isAllowed={user} redirectTo={'/login'}/>
          <Route path={'/profile'} component={UserProfile}/>
          <Route path={'/admin'} component={AdminDashboardRoutes}/>
        </Switch>
      </Layout>
    </>
  );
};

export default App;
