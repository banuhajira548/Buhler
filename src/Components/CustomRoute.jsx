

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
  Avatar, 
  Statistic, 
  Typography,
  

} from 'antd';
import { 
  CarOutlined, 
  PhoneOutlined, 
  MailOutlined, 
  IdcardOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  DashboardOutlined,
  UserOutlined
} from '@ant-design/icons';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Import vehicle images
import tataAceImage from '../assets/tataace.png'
import truckImage from '../assets/truck.png';
import canterImage from '../assets/17canter.png';

// Import driver images
import driver1Image from '../assets/driver1.png';
import driver2Image from '../assets/driver2.png';
import driver3Image from '../assets/driver3.png';

const { Content } = Layout;
const { Search } = Input;
const { Title } = Typography;

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom vehicle icon
const vehicleIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Sample vehicle data with random nearby locations
const recentVehiclesData = [
  {
    key: 1,
    vehicleId: 'V001',
    type: 'Tata Ace',
    driver: {
      name: 'John Doe',
      image: driver1Image,
      phone: '+91 9876543210',
      email: 'john.doe.@cmti.res.in',
      license: 'DL-123456789',
      experience: '5 years',
      rating: '4.8/5',
      address: '123 Main Street, Bangalore',
      emergencyContact: '+91 9876543211',
      joinedDate: '15 Jan 2020',
      totalTrips: 1250,
      performanceScore: 95,
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
    key: 2,
    vehicleId: 'V002',
    type: '307',
    driver: {
      name: 'Jane Smith',
      image: driver2Image,
      phone: '+91 9876543220',
      email: 'jane.smith.@cmti.res.in',
      license: 'DL-987654321',
      experience: '3 years',
      rating: '4.5/5',
      address: '456 Park Avenue, Bangalore',
      emergencyContact: '+91 9876543222',
      joinedDate: '20 Mar 2021',
      totalTrips: 850,
      performanceScore: 88,
      status: 'Active'
    },
    status: 'Completed',
    currentLocation: 'MG Road',
    destination: 'Brigade Road',
    coordinates: [12.9726, 77.6138],
    destinationCoordinates: [12.9654, 77.6135],
    lastUpdated: '5 mins ago',
    fuelLevel: '50%',
    speed: '45 km/h'
  },
  {
    key: 3,
    vehicleId: 'V003',
    type: '17 Canter',
    driver: {
      name: 'Mike Johnson',
      image: driver3Image,
      phone: '+91 9876543230',
      email: 'mike.johnson.@cmti.res.in',
      license: 'DL-456789123',
      experience: '7 years',
      rating: '4.9/5',
      address: '789 Lake View, Bangalore',
      emergencyContact: '+91 9876543233',
      joinedDate: '05 Jun 2019',
      totalTrips: 1580,
      performanceScore: 97,
      status: 'Active'
    },
    status: 'Maintenance',
    currentLocation: 'Jayanagar',
    destination: 'JP Nagar',
    coordinates: [12.9346, 77.5888],
    destinationCoordinates: [12.9215, 77.5965],
    lastUpdated: '2 mins ago',
    fuelLevel: '80%',
    speed: '30 km/h'
  },
  {
    key: 4,
    vehicleId: 'V004',
    type: 'Tata Ace',
    driver: {
      name: 'Robert Wilson',
      image: driver1Image,
      phone: '+91 9876543240',
      email: 'robert.wilson.@cmti.res.in',
      license: 'DL-789123456',
      experience: '4 years',
      rating: '4.6/5',
      address: '321 Valley Road, Bangalore',
      emergencyContact: '+91 9876543244',
      joinedDate: '10 Apr 2020',
      totalTrips: 980,
      performanceScore: 92,
      status: 'Active'
    },
    status: 'In Transit',
    currentLocation: 'HSR Layout',
    destination: 'Electronic City',
    coordinates: [12.9141, 77.6466],
    destinationCoordinates: [12.8399, 77.6770],
    lastUpdated: '15 mins ago',
    fuelLevel: '65%',
    speed: '55 km/h'
  }
];

const VehicleManagement = () => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [vehiclePosition, setVehiclePosition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [vehicles, setVehicles] = useState(recentVehiclesData);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (selectedVehicle && selectedVehicle.status === 'In Transit') {
      setVehiclePosition(selectedVehicle.coordinates);
    }
  }, [selectedVehicle]);

  const handleVehicleSelect = (vehicle) => {
    setLoading(true);
    setSelectedVehicle(vehicle);
    
    setTimeout(() => {
      setLoading(false);
      message.success(`Now tracking ${vehicle.vehicleId}`);
    }, 1000);
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.vehicleId.toLowerCase().includes(searchText.toLowerCase()) ||
    vehicle.driver.name.toLowerCase().includes(searchText.toLowerCase())
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
      <Card 
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <UserOutlined style={{ fontSize: '20px', marginRight: '8px' }} />
            <span>Driver Details</span>
          </div>
        }
        className="driver-details-card"
      >
        <Row gutter={[24, 24]}>
          {/* Driver Profile Section */}
          <Col span={8}>
            <Card bordered={false} className="driver-profile-card">
              <div className="driver-avatar-container">
                <img
                  src={driver.image}
                  alt={driver.name}
                  style={{
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    border: '4px solid #1890ff',
                    objectFit: 'cover',
                    marginBottom: '16px'
                  }}
                />
              </div>
              <Title level={3} style={{ margin: '16px 0 8px' }}>{driver.name}</Title>
              <div style={{ marginBottom: '16px' }}>
                <Tag color="blue">{driver.rating} Rating</Tag>
                <Tag color="green">{driver.experience} Experience</Tag>
              </div>
              <Button type="primary" icon={<PhoneOutlined />} block style={{ marginBottom: '8px' }}>
                Call Driver
              </Button>
              <Button icon={<MailOutlined />} block>
                Send Message
              </Button>
            </Card>
          </Col>

          {/* Driver Information Section */}
          <Col span={16}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card title="Contact Information" bordered={false}>
                  <p><PhoneOutlined /> {driver.phone}</p>
                  <p><MailOutlined /> {driver.email}</p>
                  <p><EnvironmentOutlined /> {driver.address}</p>
                  <p><strong>Emergency Contact:</strong> {driver.emergencyContact}</p>
                </Card>
              </Col>


              <Col span={12}>
                <Card title="Professional Information" bordered={false}>
                  <p>
                    <IdcardOutlined style={{ marginRight: '8px' }} />
                    <strong>License:</strong> {driver.license}
                  </p>
                  <p>
                    <ClockCircleOutlined style={{ marginRight: '8px' }} />
                    <strong>Joined:</strong> {driver.joinedDate}
                  </p>
                  <p>
                    <CarOutlined style={{ marginRight: '8px' }} />
                    <strong>Total Trips:</strong> {driver.totalTrips}
                  </p>
                  <p>
                    <DashboardOutlined style={{ marginRight: '8px' }} />
                    <strong>Performance:</strong> {driver.performanceScore}%
                  </p>
                </Card>
              </Col>


              <Col span={24}>
                <Card title="Performance Metrics" bordered={false}>
                  <Row gutter={16}>
                    <Col span={6}>
                      <Statistic title="Total Trips" value={driver.totalTrips} prefix={<CarOutlined />} />
                    </Col>
                    <Col span={6}>
                      <Statistic 
                        title="Rating" 
                        value={parseFloat(driver.rating)} 
                        suffix="/5" 
                        precision={1} 
                      />
                    </Col>
                    <Col span={6}>
                      <Statistic 
                        title="Performance" 
                        value={driver.performanceScore} 
                        suffix="%" 
                        valueStyle={{ color: driver.performanceScore >= 90 ? '#3f8600' : '#cf1322' }}
                      />
                    </Col>
                    <Col span={6}>
                      <Statistic 
                        title="Experience" 
                        value={parseInt(driver.experience)} 
                        suffix=" years" 
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    );
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout>
        <Content style={{ padding: '24px', margin: '0', background: '#f0f2f5' }}>
          <Row gutter={[16, 16]}>
            {/* Vehicle Fleet Section */}
            <Col span={12}>
              <Card 
                title={
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <CarOutlined style={{ fontSize: '20px', marginRight: '8px' }} />
                    Vehicle Fleet
                  </div>
                }
                bordered={false}
                className="vehicle-fleet-card"
              >
                <Search
                  placeholder="Search by Vehicle ID or Driver Name"
                  onSearch={handleSearch}
                  style={{ marginBottom: 16 }}
                  enterButton
                />
                <div style={{ height: '520px', overflowY: 'auto' }}>
                  {filteredVehicles.map((vehicle) => (
                    <Card
                      key={vehicle.key}
                      className={`vehicle-card ${selectedVehicle?.key === vehicle.key ? 'selected' : ''}`}
                      style={{
                        marginBottom: 16,
                        cursor: 'pointer',
                        border: selectedVehicle?.key === vehicle.key ? '2px solid #1890ff' : '1px solid #d9d9d9'
                      }}
                      onClick={() => handleVehicleSelect(vehicle)}
                    >
                      <Row gutter={[16, 8]} align="middle">
                        <Col span={24}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Title level={4} style={{ margin: 0 }}>
                              {vehicle.vehicleId}
                            </Title>
                            <Tag color={getStatusColor(vehicle.status)}>{vehicle.status}</Tag>
                          </div>
                        </Col>
                        <Col span={12}>
                          <img
                            src={vehicle.type === 'Tata Ace' ? tataAceImage : 
                                 vehicle.type === '307' ? truckImage : canterImage}
                            alt={vehicle.type}
                            style={{ width: '100%', maxWidth: '150px' }}
                          />
                        </Col>
                        <Col span={12}>
                          <div style={{ marginBottom: '8px' }}>
                            <strong>Driver:</strong> {vehicle.driver.name}
                          </div>
                          <div style={{ marginBottom: '8px' }}>
                            <strong>Location:</strong> {vehicle.currentLocation}
                          </div>
                          <div style={{ marginBottom: '8px' }}>
                            <strong>Destination:</strong> {vehicle.destination}
                          </div>
                          <div style={{ marginBottom: '8px' }}>
                            <strong>Last Updated:</strong> {vehicle.lastUpdated}
                          </div>
                          <div>
                          <strong>Speed:</strong> {vehicle.speed}
                          </div>
                        </Col>
                      </Row>
                    </Card>
                  ))}
                </div>
              </Card>
            </Col>

            {/* Map Section */}
            <Col span={12}>
              <Card 
                title={
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <EnvironmentOutlined style={{ fontSize: '20px', marginRight: '8px' }} />
                    Vehicle Tracking
                  </div>
                }
                bordered={false}
                style={{ height: '650px' }}
              >
                <MapContainer 
                  center={selectedVehicle ? selectedVehicle.coordinates : [12.9716, 77.5946]} 
                  zoom={13} 
                  style={{ height: '520px', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {selectedVehicle && (
                    <>
                      <Marker position={selectedVehicle.coordinates} icon={vehicleIcon}>
                        <Popup>
                          <div>
                            <strong>{selectedVehicle.vehicleId}</strong><br />
                            Driver: {selectedVehicle.driver.name}<br />
                            Status: {selectedVehicle.status}<br />
                            Speed: {selectedVehicle.speed}
                          </div>
                        </Popup>
                      </Marker>
                      <Marker position={selectedVehicle.destinationCoordinates}>
                        <Popup>
                          <div>
                            <strong>Destination</strong><br />
                            {selectedVehicle.destination}
                          </div>
                        </Popup>
                      </Marker>
                      <Polyline 
                        positions={[selectedVehicle.coordinates, selectedVehicle.destinationCoordinates]}
                        color="blue"
                      />
                    </>
                  )}
                </MapContainer>
              </Card>
            </Col>

            {/* Driver Details Section */}
            <Col span={24}>
              <Spin spinning={loading}>
                {selectedVehicle && (
                  <DriverDetailsCard driver={selectedVehicle.driver} />
                )}
              </Spin>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

// Add some custom CSS for better styling
const styles = `
  .vehicle-fleet-card {
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }

  .vehicle-card {
    transition: all 0.3s ease;
  }

  .vehicle-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }

  .vehicle-card.selected {
    border-color: #1890ff;
    box-shadow: 0 0 0 2px rgba(24,144,255,0.2);
  }

  .driver-details-card {
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    margin-top: 16px;
  }

  .driver-profile-card {
    text-align: center;
  }

  .driver-avatar-container {
    display: flex;
    justify-content: center;
    margin-bottom: 16px;
  }

  .ant-statistic-content {
    font-size: 20px;
  }

  .ant-card-head-title {
    font-size: 16px;
    font-weight: 600;
  }
`;

// Add the styles to the document
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default VehicleManagement;