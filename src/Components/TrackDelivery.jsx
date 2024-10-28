import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { Layout, Card, Col, Row, Tag, Spin, Input, Progress, Typography } from 'antd';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { ClockCircleOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Search } = Input;
const { Title, Text } = Typography;

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const orderIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const recentOrdersData = [
  {
    key: 1,
    orderId: 'ORD001',
    stages: [
      { time: '9:00 AM', status: 'Checking' },
      { time: '10:45 AM', status: 'In Transit' },
      { time: '12:00 PM', status: 'Delivered' },
    ],
    currentStage: 2,
    coordinates: [12.9716, 77.6411],
    destinationCoordinates: [12.9352, 77.6245],
  },
  {
    key: 2,
    orderId: 'ORD002',
    stages: [
      { time: '9:30 AM', status: 'Checking' },
      { time: '11:15 AM', status: 'In Transit' },
      { time: '1:00 PM', status: 'Delivered' }
    ],
    currentStage: 3,
    coordinates: [12.9716, 77.5946],
    destinationCoordinates: [12.9352, 77.6245],
  },
  {
    key: 1,
    orderId: 'ORD003',
    stages: [
      { time: '9:00 AM', status: 'Checking' },
      { time: '10:45 AM', status: 'In Transit' },
      { time: '12:00 PM', status: 'Delivered' }
    ],
    currentStage: 2,
    coordinates: [12.9716, 77.6411],
    destinationCoordinates: [12.9352, 77.6245],
  },
  {
    key: 1,
    orderId: 'ORD004',
    stages: [
      { time: '9:00 AM', status: 'Checking' },
      { time: '10:45 AM', status: 'In Transit' },
      { time: '12:00 PM', status: 'Delivered' }
    ],
    currentStage: 2,
    coordinates: [12.9716, 77.6411],
    destinationCoordinates: [12.9352, 77.6245],
  },
];

const OrderManagement = () => {
  const [selectedOrder, setSelectedOrder] = useState(recentOrdersData[0]);
  const [orderPosition, setOrderPosition] = useState(recentOrdersData[0].coordinates);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState(recentOrdersData);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (selectedOrder) {
      setOrderPosition(selectedOrder.coordinates);
    }
  }, [selectedOrder]);

  const handleOrderSelect = (order) => {
    setLoading(true);
    setSelectedOrder(order);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const filteredOrders = orders.filter(order =>
    order.orderId.toLowerCase().includes(searchText.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Transit': return 'blue';
      case 'Delivered': return 'green';
      default: return 'default';
    }
  };
  
  return (
    <Layout>
      <Content style={{ padding: '10px', margin: '0', background: '#f0f2f5' }}>
        <Row gutter={[16, 16]}>
          <Col span={10}>
            <Card
              title="Tracking Delivery"
              bordered={false}
              style={{ 
                width: '100%', 
                height: '785px'
              }}
              bodyStyle={{ 
                padding: '20px',
                height: 'calc(100% - 57px)', // Subtract header height
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden' // Prevent overflow at card level
              }}
            >
              <Search
                placeholder="Search by Order ID"
                onSearch={handleSearch}
                style={{ 
                  marginBottom: '20px',
                  position: 'sticky',
                  top: 0,
                  zIndex: 1
                }}
              />
              <div style={{ 
                flex: 1,
                overflowY: 'auto',
                overflowX: 'hidden', // Prevent horizontal scroll
                position: 'relative',
                marginRight: '-8px', // Compensate for scrollbar
                paddingRight: '8px'
              }}>
                <Row 
                  gutter={[16, 16]}
                  style={{
                    margin: 0, // Reset Row margins
                    width: '100%'
                  }}
                >
                  {filteredOrders.map(order => (
                    <Col 
                      key={order.key} 
                      span={24}
                      style={{
                        paddingLeft: 0,
                        paddingRight: 0
                      }}
                    >
                      <Card
                        hoverable
                        title={`Order ${order.orderId}`}
                        extra={<Tag color={getStatusColor(order.stages[order.currentStage - 1]?.status)}>
                          {order.stages[order.currentStage - 1]?.status}
                        </Tag>}
                        onClick={() => handleOrderSelect(order)}
                        style={{
                          marginBottom: '16px'
                        }}
                      >
                        {order.stages.map((stage, index) => (
                          <div key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                            <Text>
                              <ClockCircleOutlined style={{ marginRight: 8 }} />
                              {stage.time}
                            </Text>
                            <Text>{stage.status}</Text>
                          </div>
                        ))}
                        <Progress 
                          percent={(order.currentStage / order.stages.length) * 100} 
                          status={order.currentStage === order.stages.length ? 'success' : 'active'} 
                          showInfo={false} 
                        />
                        <Text type="secondary">
                          {order.stages[order.currentStage - 1]?.status || 'Pending'}
                        </Text>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            </Card>
          </Col>

          <Col span={14}>
            <Card title={selectedOrder ? `Order ${selectedOrder.orderId}` : 'Order Details'} bordered={false}>
              {loading ? (
                <Spin />
              ) : (
                selectedOrder && orderPosition ? (
                  <>
                    <MapContainer
                      style={{ height: '550px' }}
                      center={orderPosition || [12.9716, 77.5946]}
                      zoom={13}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />
                      <Marker position={orderPosition} icon={orderIcon}>
                        <Popup>Current location of order</Popup>
                      </Marker>
                      {selectedOrder.destinationCoordinates && (
                        <Polyline positions={[orderPosition, selectedOrder.destinationCoordinates]} color="blue" />
                      )}
                    </MapContainer>
                    
                    <Card
                      style={{ 
                        marginTop: '16px',
                        height: '120px'
                      }}
                      bodyStyle={{
                        padding: '12px'
                      }}
                    >
                      <Row gutter={16}>
                        <Col span={6}>
                          <Text strong>Order ID</Text>
                          <div>
                            <Text type="secondary">{selectedOrder.orderId}</Text>
                          </div>
                        </Col>
                        <Col span={6}>
                          <Text strong>Product</Text>
                          <div>
                            <Text type="secondary">Cartoon Sheet</Text>
                          </div>
                        </Col>
                        <Col span={6}>
                          <Text strong>Vehicle</Text>
                          <div>
                            <Text type="secondary">Tata Ace</Text>
                          </div>
                        </Col>
                        <Col span={6}>
                          <Text strong>Customer Address</Text>
                          <div>
                            <Text type="secondary">Central Manufacturing Technology Institute, Bangalore</Text>
                          </div>
                        </Col>
                      </Row>
                    </Card>
                  </>
                ) : (
                  <p>No order selected</p>
                )
              )}
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default OrderManagement;