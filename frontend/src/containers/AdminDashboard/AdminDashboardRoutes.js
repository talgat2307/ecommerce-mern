import React from 'react';
import AdminLayout from '../../components/AdminLayout/AdminLayout';
import { Route, Switch } from 'react-router-dom';
import UserList from './Users/UserList';
import ProductList from './Products/ProductList';
import UserEdit from './Users/UserEdit';
import ProductCreate from './Products/ProductCreate';
import ProductEdit from './Products/ProductEdit';
import OrderList from './Orders/OrderList';

const AdminDashboardRoutes = () => {
  return (
    <>
      <AdminLayout>
        <Switch>
          <Route path={'/admin'} exact component={UserList}/>
          <Route path={'/admin/user/:id/edit'} component={UserEdit}/>
          <Route path={'/admin/product-list'} component={ProductList}/>
          <Route path={'/admin/product-create'} component={ProductCreate}/>
          <Route path={'/admin/product/:id/edit'} component={ProductEdit}/>
          <Route path={'/admin/order-list'} component={OrderList}/>
         </Switch>
      </AdminLayout>
    </>
  );
};

export default AdminDashboardRoutes;