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
import tataAceImage from '../assets/tataace.png';
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

// Truck Load Visualization Component
const TruckLoadVisualization = ({ loadPercentage = 0 }) => {
  // Ensure loadPercentage is between 0 and 100
  const normalizedPercentage = Math.min(100, Math.max(0, loadPercentage));
  
  return (
    <div className="relative w-full h-48">
      <svg 
        viewBox="0 0 400 120" 
        className="w-full h-full"
        style={{ background: '#fff' }}
      >
        {/* Truck Body */}
        <g transform="translate(40, 20)">
          {/* Main cargo container - outline */}
          <rect
            x="30"
            y="20"
            width="290"
            height="50"
            fill="#f5f5f5"
            stroke="#d9d9d9"
            strokeWidth="2"
          />
          
          {/* Cabin */}
          <path
            d="M0 70 L30 70 L30 30 L15 20 L0 30 Z"
            fill="#f5f5f5"
            stroke="#d9d9d9"
            strokeWidth="2"
          />
          
          {/* Load visualization */}
          <rect
            x="31"
            y="21"
            width={288 * (normalizedPercentage / 100)}
            height="48"
            fill="#1890ff"
            opacity="0.8"
          />
          
          {/* Wheels */}
          <circle cx="20" cy="75" r="10" fill="#d9d9d9" />
          <circle cx="280" cy="75" r="10" fill="#d9d9d9" />
          <circle cx="320" cy="75" r="10" fill="#d9d9d9" />
          
          {/* Percentage text */}
          <text
            x="175"
            y="50"
            textAnchor="middle"
            fill={normalizedPercentage > 50 ? '#fff' : '#000'}
            style={{ 
              fontSize: '24px',
              fontWeight: 'bold',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial'
            }}
          >
            {normalizedPercentage}%
          </text>
          
          {/* Load status text */}
          <text
            x="175"
            y="100"
            textAnchor="middle"
            fill="#8c8c8c"
            style={{ 
              fontSize: '14px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial'
            }}
          >
            Current Load Capacity
          </text>
        </g>
      </svg>
    </div>
  );
};
// Sample vehicle data with random nearby locations and load percentages
const recentVehiclesData = [
  {
    key: 1,
    vehicleId: 'V001',
    type: 'Tata Ace',
    loadPercentage: 75,
    driver: {
      name: 'CMTI',
      image: driver1Image,
      license: 'DL-123456789',
      experience: '5 years',
      rating: '4.8/5',
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
    loadPercentage: 60,
    driver: {
      name: 'CMTI',
      image: driver2Image,
      license: 'DL-987654321',
      experience: '3 years',
      rating: '4.5/5',
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
    key: 2,
    vehicleId: 'V002',
    type: '307',
    loadPercentage: 60,
    driver: {
      name: 'CMTI',
      image: driver2Image,
      license: 'DL-987654321',
      experience: '3 years',
      rating: '4.5/5',
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
    key: 2,
    vehicleId: 'V002',
    type: '307',
    loadPercentage: 60,
    driver: {
      name: 'CMTI',
      image: driver2Image,
      license: 'DL-987654321',
      experience: '3 years',
      rating: '4.5/5',
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
    key: 2,
    vehicleId: 'V002',
    type: '307',
    loadPercentage: 60,
    driver: {
      name: 'CMTI',
      image: driver2Image,
      license: 'DL-987654321',
      experience: '3 years',
      rating: '4.5/5',
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

  const DriverDetailsCard = ({ driver, loadPercentage }) => {
    if (!driver) return null;


  
    
    

    return (
      <div style={{ float: 'right', width: '700px', marginRight: '1px' }}>
  <Card 
  title={
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <UserOutlined style={{ fontSize: '20px', marginRight: '8px' }} />
      <span>Driver Details</span>
    </div>
  }
  className="driver-details-card"
>
    

    <Row gutter={[14, 14]}>
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

  <Col span={16}>
  <Row gutter={[16, 16]}>
    <Col span={24}> {/* Change span to 24 for full width */}
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

    <Col span={8}>
      <Card title="Current Load Status" bordered={false}>
        <TruckLoadVisualization loadPercentage={loadPercentage} />
      </Card>
    </Col>
  </Row>

  
</Col>
</Row>


  
  </Card>
</div>
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
                <div style={{ height: '800px', overflowY: 'auto' }}>
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