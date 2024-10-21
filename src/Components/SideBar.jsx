import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  CarOutlined,
  EnvironmentOutlined,
  DollarOutlined,
} from '@ant-design/icons';
import logo from '../assets/cmtilogo.png'; // Adjust the path to your logo

const { Sider } = Layout;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState('1');

  // Map routes to menu keys
  const routeToKeyMap = {
    '/dashboard': '1',
    '/orders': '2',
    '/vehicles': '3',
    '/routes': '4',
    '/billing': '5',
  };

  // Map menu keys to routes (inverse of routeToKeyMap)
  const keyToRouteMap = {
    '1': '/dashboard',
    '2': '/orders',
    '3': '/vehicles',
    '4': '/routes',
    '5': '/billing',
  };

  // Update selected key when route changes
  useEffect(() => {
    const pathname = location.pathname;
    // Find the matching key for the current route
    const matchingKey = routeToKeyMap[pathname] || '1';
    setSelectedKey(matchingKey);
  }, [location.pathname]);

  const handleMenuClick = (e) => {
    const route = keyToRouteMap[e.key];
    if (route) {
      navigate(route);
      setSelectedKey(e.key);
    }
  };

  return (
    <Sider
      style={{
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 64,
        bottom: 0,
        background: '#fff',
        display: 'flex',
        flexDirection: 'column', // Ensures the content stacks vertically
        justifyContent: 'space-between', // Spaces the content properly
      }}
      breakpoint="lg"
      collapsedWidth="0"
    >
      <div>
        {/* Logo at the top of the sidebar */}
        <div style={{ padding: '10px', textAlign: 'center' }}>
          <img 
            src={logo} 
            alt="Logo" 
            style={{ width: '100%', maxHeight: '64px', objectFit: 'contain' }} 
          />
        </div>

        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          style={{ height: '100%', borderRight: 0 }}
          onClick={handleMenuClick}
        >
          <Menu.Item key="1" icon={<DashboardOutlined />}>Dashboard</Menu.Item>
          <Menu.Item key="2" icon={<CarOutlined />}>Orders</Menu.Item>
          <Menu.Item key="3" icon={<CarOutlined />}>Vehicles</Menu.Item>
          <Menu.Item key="4" icon={<EnvironmentOutlined />}>Routes</Menu.Item>
          <Menu.Item key="5" icon={<DollarOutlined />}>Billing</Menu.Item>
        </Menu>
      </div>

      {/* CMTI link at the bottom */}
      <div style={{ padding: '10px', textAlign: 'center' }}>
        <a 
          href="http://www.cmti.res.in" 
          target="_blank" 
          rel="noopener noreferrer" 
          style={{ textDecoration: 'none', color: '#000' }}
        >
          www.cmti.res.in
        </a>
      </div>
    </Sider>
  );
};

export default Sidebar;
