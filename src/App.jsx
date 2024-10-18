import React from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import Navbar from './Components/NavBar';
import Sidebar from './Components/SideBar';
import DashboardContent from './Components/DashboardContent';
import Orders from './Components/Orders';
import Vehicles from './Components/VehiclePage';
import CustomRoute from './Components/CustomRoute'; // Import the renamed component

const { Content } = Layout;

const App = () => {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
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
                <Route path="/" element={<LoginPage />} />
                <Route path="/dashboard" element={<DashboardContent />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/vehicles" element={<Vehicles />} />
                <Route path="/routes" element={<CustomRoute />} /> {/* Use CustomRoute here */}
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
