import React, { useState } from 'react';
import { Layout, Card, Col, Row, Statistic, Table, Tag, DatePicker, Input, Space, Empty, Button } from 'antd';
import { SearchOutlined, CaretDownOutlined } from '@ant-design/icons';
import { FaTruck } from 'react-icons/fa'; // Import the truck icon

const { Content } = Layout;

const recentVehiclesData = [
  {
    key: '1',
    VehicleID: 'VEH123',
    type: 'Tata Ace',
    Capacity: '750 kg',
    CurrentLocation: 'Electronic City',
    status: 'Pending',
  },
  {
    key: '2',
    VehicleID: 'VEH124',
    type: '307',
    Capacity: '2500 kg',
    CurrentLocation: 'Koramangala',
    status: 'Completed',
  },
  {
    key: '3',
    VehicleID: 'VEH125',
    type: '17 Canter',
    Capacity: '3500 kg',
    CurrentLocation: 'Indiranagar',
    status: 'Pending',
  },
  {
    key: '4',
    VehicleID: 'VEH126',
    type: 'Tata Ace',
    Capacity: '820 kg',
    CurrentLocation: 'Marathahalli',
    status: 'Completed',
  },
];

const recentVehiclesColumns = [
  {
    title: 'Vehicle ID',
    dataIndex: 'VehicleID',
    key: 'VehicleID',
    filters: [
      { text: 'VEH123', value: 'VEH123' },
      { text: 'VEH124', value: 'VEH124' },
      { text: 'VEH125', value: 'VEH125' },
      { text: 'VEH126', value: 'VEH126' },
    ],
    onFilter: (value, record) => record.VehicleID.includes(value),
    filterIcon: (filtered) => (
      <CaretDownOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    filters: [
      { text: 'Tata Ace', value: 'Tata Ace' },
      { text: '307', value: '307' },
      { text: '17 Canter', value: '17 Canter' },
    ],
    onFilter: (value, record) => record.type.includes(value),
    filterIcon: (filtered) => (
      <CaretDownOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
  },
  {
    title: 'Capacity',
    dataIndex: 'Capacity',
    key: 'Capacity',
    filters: [
      { text: '750 kg', value: '750 kg' },
      { text: '2500 kg', value: '2500 kg' },
      { text: '3500 kg', value: '3500 kg' },
      { text: '820 kg', value: '820 kg' },
    ],
    onFilter: (value, record) => record.Capacity.includes(value),
    filterIcon: (filtered) => (
      <CaretDownOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
  },
  {
    title: 'Current Location',
    dataIndex: 'CurrentLocation',
    key: 'CurrentLocation',
    filters: [
      { text: 'Electronic City', value: 'Electronic City' },
      { text: 'Koramangala', value: 'Koramangala' },
      { text: 'Indiranagar', value: 'Indiranagar' },
      { text: 'Marathahalli', value: 'Marathahalli' },
    ],
    onFilter: (value, record) => record.CurrentLocation.includes(value),
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
    ],
    onFilter: (value, record) => record.status.indexOf(value) === 0,
    filterIcon: (filtered) => (
      <CaretDownOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
  },
];

const VehicleManagement = () => {
  const [vehicleDetailsData, setVehicleDetailsData] = useState([]);

  // Function to simulate loading vehicle details data
  const handleLoadVehicles = () => {
    const randomVehicleDetails = [
      {
        key: '1',
        VehicleID: 'VEH127',
        type: 'Ashok Leyland',
        Capacity: '4000 kg',
        CurrentLocation: 'BTM Layout',
        status: 'Pending',
      },
      {
        key: '2',
        VehicleID: 'VEH128',
        type: 'Mahindra Pickup',
        Capacity: '1000 kg',
        CurrentLocation: 'HSR Layout',
        status: 'Completed',
      },
    ];
    setVehicleDetailsData(randomVehicleDetails);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout>
        <Content style={{ padding: '24px', margin: '0', background: '#fff' }}>
          <Row gutter={16}>
            <Col span={8}>
              <Card>
                <Statistic 
                  title="Total Vehicles" 
                  value={25} 
                  valueStyle={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} 
                  suffix={<FaTruck style={{ fontSize: '24px', color: '#007BFF' }} />} // Truck icon on the right
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic 
                  title="Available Vehicles" 
                  value={12} 
                  valueStyle={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} 
                  suffix={<FaTruck style={{ fontSize: '24px', color: '#007BFF' }} />} // Truck icon on the right
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic 
                  title="In Maintenance" 
                  value={3} 
                  valueStyle={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} 
                  suffix={<FaTruck style={{ fontSize: '24px', color: '#007BFF' }} />} // Truck icon on the right
                />
              </Card>
            </Col>
          </Row>

          {/* Date and Search Options */}
          <Row gutter={16} style={{ marginTop: 24, marginBottom: 16 }}>
            <Col span={24}>
              <Space size="large">
                <DatePicker.RangePicker style={{ width: 300 }} placeholder={['Start Date', 'End Date']} />
                <Input placeholder="Search by Vehicle ID or Status" prefix={<SearchOutlined />} style={{ width: 250 }} />
                <Button
                  type="primary"
                  onClick={handleLoadVehicles}
                  style={{
                    // background: 'linear-gradient(90deg, #007BFF 0%, #00C6FF 100%)',
                    border: 'none',
                    color: '#fff',
                    borderRadius: '5px',
                    padding: '5px 15px',
                    fontWeight: 'bold',
                  }}
                  size="large"
                >
                  Load Vehicles
                </Button>
              </Space>
            </Col>
          </Row>

          {/* Vehicle Details */}
          <Row gutter={16}>
            <Col span={24}>
              <Card title="Vehicle Details" style={{ borderRadius: '15px' }}>
                {vehicleDetailsData.length === 0 ? (
                  <Empty description="No Data Available" />
                ) : (
                  <Table columns={recentVehiclesColumns} dataSource={vehicleDetailsData} pagination={false} bordered />
                )}
              </Card>
            </Col>
          </Row>

          {/* Recent Vehicles */}
          <Row gutter={16}>
            <Col span={24}>
              <Card title="Recent Vehicles" style={{ borderRadius: '15px', marginTop: '10px' }}>
                <Table columns={recentVehiclesColumns} dataSource={recentVehiclesData} pagination={false} bordered />
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default VehicleManagement;
