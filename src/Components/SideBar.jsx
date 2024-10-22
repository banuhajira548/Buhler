import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  CarOutlined,
  EnvironmentOutlined,
  DollarOutlined,
  ScheduleOutlined,
  GlobalOutlined,
  SettingOutlined,
  LogoutOutlined,
  HistoryOutlined,
} from '@ant-design/icons';
import logo from '../assets/cmtilogo.png'; // Adjust the path to your logo

const { Sider } = Layout;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState('1');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    setUserRole(role);

    // Check if the current path starts with '/admin' or '/user'
    if (location.pathname.startsWith('/admin')) {
      setUserRole('admin');
    } else if (location.pathname.startsWith('/user')) {
      setUserRole('user');
    }
  }, [location.pathname]); // Re-run this effect when the pathname changes

  const adminMenuItems = [
    { key: '1', icon: <DashboardOutlined />, label: 'Dashboard', path: '/admin/dashboard' },
    { key: '2', icon: <CarOutlined />, label: 'Orders', path: '/admin/orders' },
    { key: '3', icon: <CarOutlined />, label: 'Vehicles', path: '/admin/vehicles' },
    { key: '4', icon: <EnvironmentOutlined />, label: 'Routes', path: '/admin/routes' },
    { key: '5', icon: <DollarOutlined />, label: 'Billing', path: '/admin/billing' },
    { key: '6', icon: <SettingOutlined />, label: 'Settings', path: '/admin/settings' },
    { key: '7', icon: <LogoutOutlined />, label: 'Logout', path: '/logout' },
  ];

  const userMenuItems = [
    { key: '1', icon: <DashboardOutlined />, label: 'Dashboard', path: '/user/dashboard' },
    { key: '2', icon: <ScheduleOutlined />, label: 'Schedule Delivery', path: '/user/schedule' },
    { key: '3', icon: <GlobalOutlined />, label: 'Track Delivery', path: '/user/track' },
    { key: '4', icon: <HistoryOutlined />, label: 'History', path: '/user/history' },
    { key: '5', icon: <LogoutOutlined />, label: 'Logout', path: '/logout' },
  ];

  const menuItems = userRole === 'admin' ? adminMenuItems : userMenuItems;

  useEffect(() => {
    const pathname = location.pathname;
    const matchingItem = menuItems.find(item => item.path === pathname);
    if (matchingItem) {
      setSelectedKey(matchingItem.key);
    }
  }, [location.pathname, menuItems]);

  const handleMenuClick = (e) => {
    const item = menuItems.find(item => item.key === e.key);
    if (item) {
      if (item.label === 'Logout') {
        localStorage.removeItem('userRole');
        navigate('/');
      } else {
        navigate(item.path);
      }
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
          {menuItems.map(item => (
            <Menu.Item key={item.key} icon={item.icon}>
              {item.label}
            </Menu.Item>
          ))}
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



