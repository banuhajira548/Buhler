import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { 
  Layout, 
  Card, 
  Col, 
  Row, 
  Tag, 
  Button, 
  message, 
  Spin, 
  Input, 
  Statistic, 
  Typography,
} from 'antd';
import { 
  CarOutlined, 
} from '@ant-design/icons';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const { Content } = Layout;
const { Title } = Typography;
const { Search } = Input;

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
      { time: '12:00 PM', status: 'Delivered' }
    ],
    currentStage: 2,
    driver: {
      name: 'CMTI',
      phone: '+91 9876543210',
      email: 'centralmanuf.@cmti.res.in',
      license: 'DL-123 Main Street, Bangalore Main Street, Bangalore Main Street, Bangalore456789',
      Address: '123 Main Street, Bangalore Main Street, Bangalore Main Street, Bangalore Main Street, Bangalore',
      Product: 'Cartoon sheets/5',
      address: '123 Main Street, Bangalore Main Street, Bangalore Main Street, Bangalore Main Street, Bangalore',
      emergencyContact: '+91 9876543211',
      joinedDate: '15 Jan 2020',
      totalTrips: 1250,
      PriceScore: 95,
      status: 'Active'
    },
    status: 'In Transit',
    currentLocation: 'Indiranagar',
    destination: 'Koramangala',
    coordinates: [12.9716, 77.6411],
    destinationCoordinates: [12.9352, 77.6245],
    lastUpdated: '10 mins ago',
    fuelLevel: '75%',
    speed: '60 km/h'
  },
  {
    key: 1,
    orderId: 'ORD001',
    stages: [
      { time: '9:00 AM', status: 'Checking' },
      { time: '10:45 AM', status: 'In Transit' },
      { time: '12:00 PM', status: 'Delivered' }
    ],
    currentStage: 2,
    driver: {
      name: 'CMTI',
      phone: '+91 9876543210',
      email: 'centralmanuf.@cmti.res.in',
      license: 'DL-123 Main Street, Bangalore Main Street, Bangalore Main Street, Bangalore456789',
      Address: '123 Main Street, Bangalore Main Street, Bangalore Main Street, Bangalore Main Street, Bangalore',
      Product: 'Cartoon sheets/5',
      address: '123 Main Street, Bangalore Main Street, Bangalore Main Street, Bangalore Main Street, Bangalore',
      emergencyContact: '+91 9876543211',
      joinedDate: '15 Jan 2020',
      totalTrips: 1250,
      PriceScore: 95,
      status: 'Active'
    },
    status: 'In Transit',
    currentLocation: 'Indiranagar',
    destination: 'Koramangala',
    coordinates: [12.9716, 77.6411],
    destinationCoordinates: [12.9352, 77.6245],
    lastUpdated: '10 mins ago',
    fuelLevel: '75%',
    speed: '60 km/h'
  },
  {
    key: 1,
    orderId: 'ORD001',
    stages: [
      { time: '9:00 AM', status: 'Checking' },
      { time: '10:45 AM', status: 'In Transit' },
      { time: '12:00 PM', status: 'Delivered' }
    ],
    currentStage: 2,
    driver: {
      name: 'CMTI',
      phone: '+91 9876543210',
      email: 'centralmanuf.@cmti.res.in',
      license: 'DL-123 Main Street, Bangalore Main Street, Bangalore Main Street, Bangalore456789',
      Address: '123 Main Street, Bangalore Main Street, Bangalore Main Street, Bangalore Main Street, Bangalore',
      Product: 'Cartoon sheets/5',
      address: '123 Main Street, Bangalore Main Street, Bangalore Main Street, Bangalore Main Street, Bangalore',
      emergencyContact: '+91 9876543211',
      joinedDate: '15 Jan 2020',
      totalTrips: 1250,
      PriceScore: 95,
      status: 'Active'
    },
    status: 'In Transit',
    currentLocation: 'Indiranagar',
    destination: 'Koramangala',
    coordinates: [12.9716, 77.6411],
    destinationCoordinates: [12.9352, 77.6245],
    lastUpdated: '10 mins ago',
    fuelLevel: '75%',
    speed: '60 km/h'
  },
  {
    key: 1,
    orderId: 'ORD001',
    stages: [
      { time: '9:00 AM', status: 'Checking' },
      { time: '10:45 AM', status: 'In Transit' },
      { time: '12:00 PM', status: 'Delivered' }
    ],
    currentStage: 2,
    driver: {
      name: 'CMTI',
      phone: '+91 9876543210',
      email: 'centralmanuf.@cmti.res.in',
      license: 'DL-123 Main Street, Bangalore Main Street, Bangalore Main Street, Bangalore456789',
      Address: '123 Main Street, Bangalore Main Street, Bangalore Main Street, Bangalore Main Street, Bangalore',
      Product: 'Cartoon sheets/5',
      address: '123 Main Street, Bangalore Main Street, Bangalore Main Street, Bangalore Main Street, Bangalore',
      emergencyContact: '+91 9876543211',
      joinedDate: '15 Jan 2020',
      totalTrips: 1250,
      PriceScore: 95,
      status: 'Active'
    },
    status: 'In Transit',
    currentLocation: 'Indiranagar',
    destination: 'Koramangala',
    coordinates: [12.9716, 77.6411],
    destinationCoordinates: [12.9352, 77.6245],
    lastUpdated: '10 mins ago',
    fuelLevel: '75%',
    speed: '60 km/h'
  }
  // ... (Additional orders here)
];

const OrderManagement = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderPosition, setOrderPosition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState(recentOrdersData);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (selectedOrder && selectedOrder.status === 'In Transit') {
      setOrderPosition(selectedOrder.coordinates);
    }
  }, [selectedOrder]);

  const handleOrderSelect = (order) => {
    setLoading(true);
    setSelectedOrder(order);

    setTimeout(() => {
      setLoading(false);
      message.success(`Now tracking ${order.orderId}`);
    }, 1000);
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const filteredOrders = orders.filter(order =>
    order.orderId.toLowerCase().includes(searchText.toLowerCase()) ||
    order.driver.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Transit': return 'blue';
      case 'Completed': return 'green';
      case 'Maintenance': return 'orange';
      default: return 'default';
    }
  };

  const DriverDetailsCard = ({ driver }) => {
    if (!driver) return null;

    return (
      <Card title="order details" bordered={false}>
                  <Row gutter={16}>
                    <Col span={6}>
                      <Statistic title="Order ID " value={driver.totalTrips} prefix={<CarOutlined />} />
                    </Col>
                    <Col span={6}>
                      <Statistic 
                        title="Product" 
                        value={parseFloat(driver.Product)} 
                        // suffix="/5" 
                        precision={1} 
                      />
                    </Col>
                    <Col span={6}>
                      <Statistic 
                        title="Price" 
                        value={driver.PriceScore} 
                        suffix="%" 
                        valueStyle={{ color: driver.PriceScore >= 90 ? '#3f8600' : '#cf1322' }}
                      />
                    </Col>
                    <Col span={6}>
                      <Statistic 
                        title="Address" 
                        value={parseInt(driver.Address)} 
                        // suffix=" years" 
                      />
                    </Col>
                  </Row>
        </Card>
    );
  };

  return (
   
      <Layout>
        <Content style={{ padding: '24px', margin: '0', background: '#f0f2f5' }}>
          <Row gutter={[16, 16]}>
            <Col span={10}>
              <Card title="Tracking Delivery" bordered={false} style={{ width: '100%' }}>
                <Search 
                  placeholder="Search by Order ID or Driver Name"
                  onSearch={handleSearch}
                  style={{ marginBottom: '20px' }}
                />
                <Row gutter={[16, 16]}>
                  {filteredOrders.map(order => (
                    <Col key={order.key} span={24}>
                      <Card
                        hoverable
                        title={`Order ${order.orderId}`}
                        extra={<Tag color={getStatusColor(order.status)}>{order.status}</Tag>}
                        onClick={() => handleOrderSelect(order)}
                      >
                        <p><strong>Driver:</strong> {order.driver.name}</p>
                        <p><strong>Current Location:</strong> {order.currentLocation}</p>
                        <p><strong>Destination:</strong> {order.destination}</p>
                        <p><strong>Last Updated:</strong> {order.lastUpdated}</p>
                        <p><strong>Fuel Level:</strong> {order.fuelLevel}</p>
                        <p><strong>Speed:</strong> {order.speed}</p>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card>
            </Col>

            <Col span={14}>
              <Card title={selectedOrder ? `Order ${selectedOrder.orderId}` : "Order Details"} bordered={false}>
                {loading ? (
                  <Spin />
                ) : (
                  <>
                    {selectedOrder && selectedOrder.status === 'In Transit' && orderPosition ? (
                      <MapContainer
                        style={{ height: '400px' }}
                        center={orderPosition || [12.9716, 77.5946]}
                        zoom={13}
                      >
                        <TileLayer
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker
                          position={orderPosition}
                          icon={orderIcon}
                        >
                          <Popup>
                            <span>Current location of order</span>
                          </Popup>
                        </Marker>
                        {selectedOrder && selectedOrder.destinationCoordinates && (
                          <Polyline 
                            positions={[orderPosition, selectedOrder.destinationCoordinates]} 
                            color="blue" 
                          />
                        )}
                      </MapContainer>
                    ) : (
                      <p>No order selected or order not in transit.</p>
                    )}
                    {selectedOrder && <DriverDetailsCard driver={selectedOrder.driver} />}
                  </>
                )}
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
   
  );
};

export default OrderManagement;
