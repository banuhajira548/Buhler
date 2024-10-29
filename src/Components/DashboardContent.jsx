import React from 'react';
import { Card, Col, Row, Table, Tag, Typography, Space, Button, Select } from 'antd';
import { 
  DollarOutlined, 
  CarOutlined, 
  LineChartOutlined, 
  PlusOutlined, 
  ReloadOutlined,
  ShoppingOutlined
} from '@ant-design/icons';
import ReactEcharts from 'echarts-for-react';

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
  {
    key: '2',
    time: '09:30 AM',
    type: 'Delivery',
    location: 'Electronic City',
    client: 'Amazon',
    status: 'Pending',
  },
  {
    key: '3',
    time: '11:00 AM',
    type: 'Pickup',
    location: 'Whitefield',
    client: 'Flipkart',
    status: 'Completed',
  }
];

const scheduleColumns = [
  { 
    title: 'Time',
    dataIndex: 'time',
    key: 'time',
    width: '15%',
  },
  { 
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    width: '15%',
    render: (text) => (
      <Tag style={{ 
        borderRadius: '15px', 
        padding: '2px 8px',
        fontSize: '12px',
        border: 'none'
      }} color={text === 'Pickup' ? 'blue' : 'green'}>
        {text}
      </Tag>
    )
  },
  { 
    title: 'Location',
    dataIndex: 'location',
    key: 'location',
    width: '25%',
  },
  { 
    title: 'Client',
    dataIndex: 'client',
    key: 'client',
    width: '25%',
  },
  { 
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    width: '20%',
    render: (text) => {
      const colors = {
        'In Progress': '#faad14',
        'Pending': '#1890ff',
        'Completed': '#52c41a'
      };
      return (
        <Tag style={{ 
          borderRadius: '15px', 
          padding: '2px 8px',
          fontSize: '12px',
          border: 'none',
          background: colors[text] + '20',
          color: colors[text]
        }}>
          {text}
        </Tag>
      );
    }
  },
];

const weeklyPerformanceOptions = {
  grid: {
    top: 10,
    right: 20,
    bottom: 20,
    left: 30,
    containLabel: true
  },
  xAxis: { 
    type: 'category', 
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    axisLine: { lineStyle: { color: '#e6e6e6' } }
  },
  yAxis: { 
    type: 'value',
    axisLine: { show: false },
    axisTick: { show: false },
    splitLine: { lineStyle: { color: '#f0f0f0' } }
  },
  tooltip: { 
    trigger: 'axis',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderColor: '#e6e6e6',
    textStyle: { color: '#666' }
  },
  series: [{
    data: [30, 40, 45, 60, 50, 35, 25],
    type: 'line',
    smooth: true,
    symbolSize: 6,
    itemStyle: { color: '#1890ff' },
    areaStyle: {
      color: {
        type: 'linear',
        x: 0, y: 0, x2: 0, y2: 1,
        colorStops: [
          { offset: 0, color: 'rgba(24,144,255,0.3)' },
          { offset: 1, color: 'rgba(24,144,255,0.1)' }
        ]
      }
    }
  }]
};

const monthlyRevenueOptions = {
  grid: {
    top: 10,
    right: 20,
    bottom: 20,
    left: 30,
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    axisLine: { lineStyle: { color: '#e6e6e6' } }
  },
  yAxis: {
    type: 'value',
    axisLine: { show: false },
    axisTick: { show: false },
    splitLine: { lineStyle: { color: '#f0f0f0' } }
  },
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderColor: '#e6e6e6',
    textStyle: { color: '#666' }
  },
  series: [{
    data: [10000, 12000, 15000, 18000, 22000, 20000],
    type: 'bar',
    barWidth: '40%',
    itemStyle: {
      color: {
        type: 'linear',
        x: 0, y: 0, x2: 0, y2: 1,
        colorStops: [
          { offset: 0, color: '#1890ff' },
          { offset: 1, color: '#69c0ff' }
        ]
      },
      borderRadius: [4, 4, 0, 0]
    }
  }]
};

const StatCard = ({ title, value, prefix, suffix, icon: Icon, trend, color }) => (
  <Card bodyStyle={{ padding: '12px' }} style={{ height: '100%' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div>
        <div style={{ color: '#8c8c8c', fontSize: '13px', marginBottom: '4px' }}>{title}</div>
        <div style={{ display: 'flex', alignItems: 'baseline' }}>
          {prefix && <span style={{ fontSize: '14px', marginRight: '4px' }}>{prefix}</span>}
          <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#262626' }}>{value}</span>
          {suffix && <span style={{ fontSize: '14px', marginLeft: '4px' }}>{suffix}</span>}
        </div>
        {trend && (
          <div style={{ 
            marginTop: '4px',
            fontSize: '12px',
            color: trend.type === 'increase' ? '#52c41a' : '#ff4d4f'
          }}>
            {trend.type === 'increase' ? '↑' : '↓'} {trend.value}%
          </div>
        )}
      </div>
      <div style={{ 
        padding: '8px',
        borderRadius: '8px',
        background: color + '15',
      }}>
        <Icon style={{ fontSize: '20px', color: color }} />
      </div>
    </div>
  </Card>
);

const SupervisorDash = () => {
  return (
    <div style={{ padding: '4px' }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <StatCard 
            title="Active Orders"
            value="42"
            icon={ShoppingOutlined}
            trend={{ value: 12, type: 'increase' }}
            color="#1890ff"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard 
            title="Available Vehicles"
            value="15"
            icon={CarOutlined}
            trend={{ value: 5, type: 'decrease' }}
            color="#52c41a"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard 
            title="Total Distance"
            value="1,520"
            suffix="km"
            icon={LineChartOutlined}
            trend={{ value: 8, type: 'increase' }}
            color="#722ed1"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard 
            title="Revenue"
            value="₹12,000"
            prefix="₹"
            icon={DollarOutlined}
            trend={{ value: 3, type: 'increase' }}
            color="#faad14"
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col xs={24} lg={12}>
          <Card title="Weekly Performance">
            <ReactEcharts option={weeklyPerformanceOptions} style={{ height: '300px' }} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Monthly Revenue">
            <ReactEcharts option={monthlyRevenueOptions} style={{ height: '300px' }} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col span={24}>
          <Card title="Today's Schedule" extra={<Button icon={<PlusOutlined />}>Add Schedule</Button>}>
            <Table 
              dataSource={scheduleData} 
              columns={scheduleColumns} 
              pagination={false} 
              scroll={{ x: true }} 
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SupervisorDash;