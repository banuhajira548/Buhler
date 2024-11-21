import React from 'react';
import { Table, Button, Card, Space } from 'antd';

const HistoryPage = () => {
  // Sample data for today's requests
  const todayRequests = [
    {
      id: 1,
      requestType: 'Delivery',
      location: 'Peenya',
      status: 'Pending',
      timestamp: '2024-10-24 09:30:00',
    },
    {
      id: 2,
      requestType: 'Pickup',
      location: 'Bommasandra',
      status: 'Pending',
      timestamp: '2024-10-24 10:15:00',
    },
    {
      id: 3,
      requestType: 'Delivery',
      location: 'Electronic City',
      status: 'Pending',
      timestamp: '2024-10-24 09:30:00',
    },
    {
      id: 4,
      requestType: 'Pickup',
      location: 'Whitefield',
      status: 'Pending',
      timestamp: '2024-10-24 10:15:00',
    },
  ];

  // Sample data for historical requests
  const historicalRequests = [
    {
      id: 101,
      requestType: 'Delivery',
      location: 'Bommasandra',
      status: 'Completed',
      timestamp: '2024-10-23 14:20:00',
    },
    {
      id: 102,
      requestType: 'Pickup',
      location: 'Peenya',
      status: 'Completed',
      timestamp: '2024-10-22 16:45:00',
    },
  ];

  // Columns for today's requests
  const todayColumns = [
    {
      title: 'Request ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Request Type',
      dataIndex: 'requestType',
      key: 'requestType',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Button 
          type="default"
          style={{
            borderColor: '#d9d9d9',
            color: '#000000d9',
            backgroundColor: 'transparent',
            boxShadow: 'none'
          }}
        >
          Pending Approval
        </Button>
      ),
    },
  ];

  // Columns for historical requests
  const historyColumns = [
    {
      title: 'Request ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Request Type',
      dataIndex: 'requestType',
      key: 'requestType',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Button type="default">
          Track
        </Button>
      ),
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="max-w-full mx-auto p-4">
        <Space 
          direction="vertical" 
          size="large" 
          className="w-full"
          style={{ display: 'flex' }}
        >
          <Card 
            title="Today's Requests" 
            className="w-full"
            style={{ 
              width: '100%',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              marginBottom: '16px'
            }}
            hoverable
          >
            <Table
              columns={todayColumns}
              dataSource={todayRequests}
              rowKey="id"
              pagination={false}
              scroll={{ x: true }}
            />
          </Card>

          <Card 
            title="Request History" 
            className="w-full"
            style={{ 
              width: '100%',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}
            hoverable
          >
            <Table
              columns={historyColumns}
              dataSource={historicalRequests}
              rowKey="id"
              pagination={{
                pageSize: 10,
                total: historicalRequests.length,
                showSizeChanger: true,
                showTotal: (total) => `Total ${total} items`,
              }}
              scroll={{ x: true }}
            />
          </Card>
        </Space>
      </div>
    </div>
  );
};

export default HistoryPage;