import React from 'react';
import { Layout, Typography, Dropdown, Menu, Card, Button } from 'antd';
import { BellDot, CircleUserRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;
const { Title, Text } = Typography;

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/');
  };

  // Dropdown menu for user profile
  const userMenu = (
    <Menu>
      <Menu.Item key="1">
        <div
          style={{
            width: 250,
            textAlign: 'center',
            padding: '24px 0',
          }}
        >
          {/* Avatar */}
          <CircleUserRound size={64} style={{ marginBottom: '16px' }} />

          {/* Username */}
          <Text strong style={{ fontSize: '16px', display: 'block' }}>
            CMTI
          </Text>

          {/* Email */}
          <Text type="secondary" style={{ fontSize: '14px', marginBottom: '16px', display: 'block' }}>
            cmti@gmail.com
          </Text>

          {/* Settings and Logout Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
            <Button type="default" block>
              Settings
            </Button>
            <Button type="primary" block danger onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </Menu.Item>
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
      <div style={{ width: '30%', paddingLeft: '200px' }}>
        <Title
          level={3}
          style={{
            margin: 0,
            fontSize: '28px',
            fontWeight: 'bold',
            fontFamily: '"Montserrat", sans-serif',
          }}
        >
          BUHLER
        </Title>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        {/* Notification Icon */}
        <BellDot size={30} />

        {/* User Profile Dropdown */}
        <Dropdown overlay={userMenu} trigger={['click']}>
          <CircleUserRound size={30} style={{ cursor: 'pointer' }} />
        </Dropdown>
      </div>
    </Header>
  );
};

export default Navbar;
