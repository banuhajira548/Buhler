import React, { useState } from 'react';
import { Card, Col, Row, Statistic, Table, Tag, DatePicker, Input, Space, Empty, Button } from 'antd';
import { SearchOutlined, CodeSandboxOutlined, CaretDownOutlined } from '@ant-design/icons'; // Import CaretDown icon

const recentOrdersData = [
  {
    key: '1',
    orderId: 'ORD123',
    Supplier: 'ABC Corp',
    pickup: 'Bommasandra',
    delivery: 'Electronic City',
    status: 'Pending',
  },
  {
    key: '2',
    orderId: 'ORD124',
    Supplier: 'XYZ Ltd',
    pickup: 'Jayanagar',
    delivery: 'Koramangala',
    status: 'Completed',
  },
  {
    key: '3',
    orderId: 'ORD125',
    Supplier: 'PQR Inc',
    pickup: 'MG Road',
    delivery: 'Indiranagar',
    status: 'Pending',
  },
  {
    key: '4',
    orderId: 'ORD126',
    Supplier: 'LMN Co',
    pickup: 'Whitefield',
    delivery: 'Marathahalli',
    status: 'Completed',
  },
  {
    key: '5',
    orderId: 'ORD127',
    Supplier: 'PQR Inc',
    pickup: 'MG Road',
    delivery: 'Indiranagar',
    status: 'Pending',
  },
  {
    key: '6',
    orderId: 'ORD128',
    Supplier: 'LMN Co',
    pickup: 'Whitefield',
    delivery: 'Marathahalli',
    status: 'In Transit',
  },
  {
    key: '7',
    orderId: 'ORD129',
    Supplier: 'PQR Inc',
    pickup: 'MG Road',
    delivery: 'Indiranagar',
    status: 'Pending',
  },
  {
    key: '8',
    orderId: 'ORD130',
    Supplier: 'LMN Co',
    pickup: 'Whitefield',
    delivery: 'Marathahalli',
    status: 'In Transit',
  },

];

const recentOrdersColumns = [
  {
    title: 'Order ID',
    dataIndex: 'orderId',
    key: 'orderId',
    filters: [
      { text: 'ORD123', value: 'ORD123' },
      { text: 'ORD124', value: 'ORD124' },
      { text: 'ORD125', value: 'ORD125' },
      { text: 'ORD126', value: 'ORD126' },
    ],
    onFilter: (value, record) => record.orderId.includes(value),
    filterIcon: (filtered) => (
      <CaretDownOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
  },
  {
    title: 'Supplier',
    dataIndex: 'Supplier',
    key: 'Supplier',
    filters: [
      { text: 'ABC Corp', value: 'ABC Corp' },
      { text: 'XYZ Ltd', value: 'XYZ Ltd' },
      { text: 'PQR Inc', value: 'PQR Inc' },
      { text: 'LMN Co', value: 'LMN Co' },
    ],
    onFilter: (value, record) => record.Supplier.includes(value),
    filterIcon: (filtered) => (
      <CaretDownOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
  },
  {
    title: 'Pickup',
    dataIndex: 'pickup',
    key: 'pickup',
    filters: [
      { text: 'Bommasandra', value: 'Bommasandra' },
      { text: 'Jayanagar', value: 'Jayanagar' },
      { text: 'MG Road', value: 'MG Road' },
      { text: 'Whitefield', value: 'Whitefield' },
    ],
    onFilter: (value, record) => record.pickup.includes(value),
    filterIcon: (filtered) => (
      <CaretDownOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
  },
  {
    title: 'Delivery',
    dataIndex: 'delivery',
    key: 'delivery',
    filters: [
      { text: 'Electronic City', value: 'Electronic City' },
      { text: 'Koramangala', value: 'Koramangala' },
      { text: 'Indiranagar', value: 'Indiranagar' },
      { text: 'Marathahalli', value: 'Marathahalli' },
    ],
    onFilter: (value, record) => record.delivery.includes(value),
    filterIcon: (filtered) => (
      <CaretDownOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (text) => <Tag color={text === 'Pending' ? 'orange' : 'green'}>{text}</Tag>,
    filters: [
      { text: 'Pending', value: 'Pending' },
      { text: 'Completed', value: 'Completed' },
      { text: 'In Transit', value: 'In Transit' }, // Add this if you have "In Transit" status in data
    ],
    onFilter: (value, record) => record.status.indexOf(value) === 0,
    filterIcon: (filtered) => (
      <CaretDownOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
  },
];

const iconStyle = {
  position: 'absolute',
  top: '50%',
  right: '10px',
  transform: 'translateY(-50%)',
  fontSize: '30px',
  color: '#007BFF', // Change color to your desired color
};

const OrderManagement = () => {
  const [orderDetailsData, setOrderDetailsData] = useState([]);

  // Function to simulate loading data into "Order Details"
  const handleLoadData = () => {
    const randomOrders = [
      {
        key: '1',
        orderId: 'ORD127',
        Supplier: 'DEF Corp',
        pickup: 'HSR Layout',
        delivery: 'Bellandur',
        status: 'Pending',
      },
      {
        key: '2',
        orderId: 'ORD128',
        Supplier: 'GHI Ltd',
        pickup: 'BTM Layout',
        delivery: 'Silk Board',
        status: 'Completed',
      },
    ];
    setOrderDetailsData(randomOrders);
  };

  return (
    <>
      <Row gutter={16}>
        <Col span={8}>
          <Card 
            style={{ 
              position: 'relative',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            hoverable
          >
            <Statistic title="Total Orders" value={100} />
            <CodeSandboxOutlined style={iconStyle} />
          </Card>
        </Col>
        <Col span={8}>
          <Card 
            style={{ 
              position: 'relative',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            hoverable
          >
            <Statistic title="Pending Orders" value={30} />
            <CodeSandboxOutlined style={iconStyle} />
          </Card>
        </Col>
        <Col span={8}>
          <Card 
            style={{ 
              position: 'relative',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            hoverable
          >
            <Statistic title="Completed Today" value={25} />
            <CodeSandboxOutlined style={iconStyle} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Card 
            title="Recent Orders" 
            style={{ 
              borderRadius: '15px', 
              marginTop: '10px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            }}
            hoverable
          >
            <Table columns={recentOrdersColumns} dataSource={recentOrdersData} pagination={false} bordered />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderManagement;
