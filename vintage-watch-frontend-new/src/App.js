import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import SellerDashboard from './components/Seller/SellerDashboard';
import BuyerDashboard from './components/Buyer/BuyerDashboard';
import AppraiserDashboard from './components/Appraiser/AppraiserDashboard';
import AdminDashboard from './components/Admin/AdminDashboard';
import SupportDashboard from './components/Support/SupportDashboard';
import TestPage from './components/TestPage';
import Loading from './components/Common/Loading';
import Home from './components/Home';
import WatchDetails from './components/WatchDetails';
import ReportIssue from './components/Support/ReportIssue';
import MyOrders from './components/Buyer/MyOrders';
import Cart from './components/Buyer/Cart';
import CheckoutPage from './components/Checkout/CheckoutPage';
import PaymentReturn from './components/Checkout/PaymentReturn';

const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  const routeConfigs = [
    { paths: ['/dashboard'], element: <Dashboard /> },
    { paths: ['/seller', '/seller/listings', '/seller/create'], element: <SellerDashboard />, roles: ['seller'] },
    { paths: ['/buyer', '/buyer/browse', '/buyer/orders'], element: <BuyerDashboard />, roles: ['buyer'] },
    { paths: ['/appraiser', '/appraiser/evaluations', '/appraiser/reports'], element: <AppraiserDashboard />, roles: ['appraiser'] },
    { paths: ['/admin', '/admin/users', '/admin/transactions'], element: <AdminDashboard />, roles: ['admin'] },
    { paths: ['/support', '/support/feedback', '/support/dashboard'], element: <SupportDashboard />, roles: ['support'] }
  ];

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/watch/:id" element={<Layout><WatchDetails /></Layout>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/test" element={<TestPage />} />
      <Route path="/report" element={<Layout><ReportIssue /></Layout>} />
      <Route path="/orders" element={<Layout><MyOrders /></Layout>} />
      <Route path="/cart" element={<Layout><Cart /></Layout>} />
      <Route path="/checkout" element={<Layout><CheckoutPage /></Layout>} />
      <Route path="/payment/return" element={<Layout><PaymentReturn /></Layout>} />

      {/* Root redirect no longer needed since Home is default */}

      {/* Mapped Protected Routes */}
      {routeConfigs.flatMap(({ paths, element, roles }) => (
        paths.map((path) => (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedRoute requiredRoles={roles}>
                <Layout>
                  {element}
                </Layout>
              </ProtectedRoute>
            }
          />
        ))
      ))}

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
