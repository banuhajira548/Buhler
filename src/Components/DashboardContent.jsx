// import { CarOutlined  } from 'react-icons/fa'; // Font Awesome Truck icon
import { CodeSandboxOutlined } from '@ant-design/icons'; // Ant Design CodeSandbox icon
import React from 'react';
import { Card, Col, Row, Statistic, Table, Tag } from 'antd';
import { DollarOutlined, LineChartOutlined, ProfileOutlined, CarOutlined } from '@ant-design/icons';
import ReactEcharts from 'echarts-for-react';


const scheduleData = [
  {
    key: '1',
    time: '08:00 AM',
    type: 'Pickup',
    location: 'Bommasandra',
    client: 'Tata Ace',
    status: 'In Progress',
  },
];

const scheduleColumns = [
  { title: 'Time', dataIndex: 'time', key: 'time' },
  { title: 'Type', dataIndex: 'type', key: 'type', render: (text) => <Tag color={text === 'Pickup' ? '#007BFF' : 'green'}>{text}</Tag> },
  { title: 'Location', dataIndex: 'location', key: 'location' },
  { title: 'Client', dataIndex: 'client', key: 'client' },
  { title: 'Status', dataIndex: 'status', key: 'status', render: (text) => <Tag color={text === 'In Progress' ? 'orange' : 'green'}>{text}</Tag> },
];

const weeklyPerformanceOptions = {
  title: { text: 'Weekly Performance' },
  tooltip: { trigger: 'axis' },
  xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
  yAxis: { type: 'value' },
  series: [
    {
      name: 'Orders',
      type: 'line',
      data: [30, 40, 45, 60, 50, 35, 25],
      smooth: true,
      itemStyle: { color: '#8884d8' },
    },
  ],
};

const monthlyRevenueOptions = {
  title: { text: 'Monthly Revenue Trend' },
  tooltip: { trigger: 'axis' },
  xAxis: { type: 'category', data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'] },
  yAxis: { type: 'value' },
  series: [
    {
      name: 'Revenue',
      type: 'bar',
      data: [10000, 12000, 15000, 18000, 22000, 20000, 25000],
      itemStyle: { color: '#82ca9d' },
    },
  ],
};

const iconStyle = {
  position: 'absolute',
  padding: '30px',
  top: '10px',
  right: '10px',
  fontSize: '34px',
  color: 'black',
};

const SupervisorDash = () => {
  return (
    <>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic title="Active Orders" value={42} />
            <CodeSandboxOutlined style={{ position: 'absolute', padding: '30px', top: '10px', right: '10px', fontSize: '34px', color: '#007BFF' }} /> {/* Icon set to #007BFF */}
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Available Vehicles" value={15} />
            <CarOutlined  style={{ position: 'absolute', padding: '30px', top: '10px', right: '10px', fontSize: '34px', color: '#007BFF' }} /> {/* Icon set to #007BFF */}
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Total Distance (Km)" value={1520} />
            <LineChartOutlined style={{ position: 'absolute', padding: '30px', top: '10px', right: '10px', fontSize: '34px', color: '#007BFF' }} /> {/* Icon set to #007BFF */}
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Revenue (₹)" value={75000} />
           <DollarOutlined style={{ position: 'absolute', padding: '30px', top: '10px', right: '10px', fontSize: '34px', color: '#007BFF' }} /> {/* Icon set to #007BFF */}
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col span={16}>
          <Card title="Weekly Performance" style={{ borderRadius: '15px' }}>
            <ReactEcharts option={weeklyPerformanceOptions} style={{ height: '300px' }} />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Monthly Revenue Trend" style={{ borderRadius: '15px' }}>
            <ReactEcharts option={monthlyRevenueOptions} style={{ height: '300px' }} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card title="Today's Schedule" style={{ borderRadius: '15px' }}>
            <Table columns={scheduleColumns} dataSource={scheduleData} pagination={false} bordered scroll={{ y: 300 }} />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default SupervisorDash;
