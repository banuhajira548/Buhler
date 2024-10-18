import React from 'react';
import { Layout, Typography, Dropdown, Menu } from 'antd';
import { BellOutlined, UserOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { Title } = Typography;

const Navbar = () => {
  // Dropdown menu for user profile
  const userMenu = (
    <Menu>
      <Menu.Item key="1">Profile</Menu.Item>
      <Menu.Item key="2">Settings</Menu.Item>
      <Menu.Item key="3">Logout</Menu.Item>
    </Menu>
  );

  return (
    <Header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        width: '100%',
        background: '#ffffff',
        padding: '0 16px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '64px',
      }}
    >
      <div style={{ width: '30%', paddingLeft: '200px' }}> {/* Adjust for sidebar width */}
        <Title
          level={3}
          style={{
            margin: 0,
            fontSize: '28px', // Larger font size
            fontWeight: 'bold', // Bold font
            fontFamily: '"Montserrat", sans-serif',
          }}
        >
          Buhler Logistics
        </Title>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        {/* Notification Icon */}
        <BellOutlined style={{ fontSize: '20px' }} />
        
        {/* User Profile Dropdown */}
        <Dropdown overlay={userMenu} trigger={['click']}>
          <UserOutlined style={{ fontSize: '20px', cursor: 'pointer' }} />
        </Dropdown>
      </div>
    </Header>
  );
};

export default Navbar;
