import React from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import Navbar from './Components/NavBar';
import Sidebar from './Components/SideBar';
import DashboardContent from './Components/DashboardContent';
import Orders from './Components/Orders';
import Vehicles from './Components/VehiclePage';
import CustomRoute from './Components/CustomRoute';
import UserDashboard from './Components/UserDashboard';
import ScheduleDelivery from './Components/ScheduleDelivery';
import TrackDelivery from './Components/TrackDelivery';
import HistoryPage from './Components/HistoryPage';

const { Content } = Layout;

const App = () => {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <Layout hasSider>
                  <Sidebar />
                  <Layout style={{ marginLeft: 200, marginTop: 64 }}>
                    <Content
                      style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 'calc(100vh - 64px)',
                        overflow: 'auto',
                      }}
                    >
                      <Routes>
                        <Route path="/admin/dashboard" element={<DashboardContent />} />
                        <Route path="/admin/orders" element={<Orders />} />
                        <Route path="/admin/vehicles" element={<Vehicles />} />
                        <Route path="/admin/routes" element={<CustomRoute />} />
                        <Route path="/admin/billing" element={<div>Billing Page</div>} />
                        
                        <Route path="/user/dashboard" element={<UserDashboard />} />
                        <Route path="/user/schedule" element={<ScheduleDelivery />} />
                        <Route path="/user/track" element={<TrackDelivery />} />
                        <Route path="/user/history" element={<HistoryPage />} />
                      </Routes>
                    </Content>
                  </Layout>
                </Layout>
              </>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
