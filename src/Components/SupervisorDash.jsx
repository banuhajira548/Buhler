import React from 'react';
import { Layout, Menu, Card, Col, Row, Statistic, Typography, Table, Tag } from 'antd';
import {
  DashboardOutlined,
  CarOutlined,
  EnvironmentOutlined,
  FileOutlined,
  DollarOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import ReactEcharts from 'echarts-for-react';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

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
  { title: 'Type', dataIndex: 'type', key: 'type', render: (text) => <Tag color={text === 'Pickup' ? 'blue' : 'green'}>{text}</Tag> },
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

const SupervisorDash = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} style={{ background: '#fff', position: 'fixed', height: '100vh' }}>
        <div style={{ padding: '16px', textAlign: 'center' }}>
          <Title level={4}>BUHLER LOGISTICS</Title>
        </div>
        <Menu mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<DashboardOutlined />}>Dashboard</Menu.Item>
          <Menu.Item key="2" icon={<CarOutlined />}>Orders</Menu.Item>
          <Menu.Item key="3" icon={<CarOutlined />}>Vehicles</Menu.Item>
          <Menu.Item key="4" icon={<EnvironmentOutlined />}>Routes</Menu.Item>
          <Menu.Item key="5" icon={<FileOutlined />}>Report</Menu.Item>
          <Menu.Item key="6" icon={<DollarOutlined />}>Billing</Menu.Item>
          <Menu.Item key="7" icon={<SettingOutlined />}>Settings</Menu.Item>
          <Menu.Item key="8" icon={<LogoutOutlined />}>Logout</Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        <Header style={{ background: '#fff', padding: '0 24px' }}>
          <Title level={3} style={{ margin: 0 }}>Supervisor Dashboard</Title>
        </Header>
        <Content style={{ padding: '24px', margin: '0', background: '#fff' }}>
          <Row gutter={16}>
            <Col span={6}>
              <Card>
                <Statistic title="Active Orders" value={42} />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic title="Available Vehicles" value={15} />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic title="Total Distance (Km)" value={1520} />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic title="Revenue (₹)" value={75000} />
              </Card>
            </Col>
          </Row>
          
          {/* Weekly Performance */}
          <Row gutter={16} style={{ marginTop: 24 }}>
            <Col span={16}>
              <Card title="Weekly Performance" style={{ borderRadius: '15px' }}>
                <ReactEcharts option={weeklyPerformanceOptions} style={{ height: '300px' }} />
              </Card>
            </Col>

            {/* Monthly Revenue Trend */}
            <Col span={8}>
              <Card title="Monthly Revenue Trend" style={{ borderRadius: '15px' }}>
                <ReactEcharts option={monthlyRevenueOptions} style={{ height: '300px' }} />
              </Card>
            </Col>
          </Row>

          {/* Today's Schedule */}
          <Row gutter={16} style={{ marginTop: 24 }}>
            <Col span={24}>
              <Card title="Today's Schedule" style={{ borderRadius: '15px' }}>
                <Table columns={scheduleColumns} dataSource={scheduleData} pagination={false} bordered scroll={{ y: 300 }} />
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default SupervisorDash;
