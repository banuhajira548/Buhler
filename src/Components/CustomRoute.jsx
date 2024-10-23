
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
    viewBox="0 0 140 100" // Adjusted viewBox for a larger scale
    className="w-full h-full"
    style={{ background: '#fff' }}
  >
    {/* Truck Body */}
    <g transform="translate(20, 20)"> {/* Centered the truck */}
      {/* Main cargo container - outline */}
      <rect
        x="10"
        y="10"
        width="100"  // Increased width for a bigger truck
        height="35"  // Increased height for a bigger truck
        fill="#f5f5f5"
        stroke="#d9d9d9"
        strokeWidth="2"
      />
      
      {/* Cabin */}
      <path
        d="M0 45 L25 45 L25 25 L15 20 L0 25 Z" // Adjusted dimensions for a larger cabin
        fill="#f5f5f5"
        stroke="#d9d9d9"
        strokeWidth="2"
      />
      
      {/* Load visualization */}
      <rect
        x="11"
        y="11"
        width={108 * (normalizedPercentage / 100)} // Adjusted width to fit cargo
        height="33" // Increased height to fit cargo
        fill="#1890ff"
        opacity="0.8"
      />
      
      {/* Wheels */}
      <circle cx="15" cy="50" r="6" fill="#d9d9d9" />  {/* Adjusted wheel position */}
      <circle cx="100" cy="50" r="6" fill="#d9d9d9" />  {/* Adjusted wheel position */}
      
      {/* Percentage text */}
      <text
        x="60"
        y="25" // Adjusted Y position for centering
        textAnchor="middle"
        fill={normalizedPercentage > 50 ? '#fff' : '#000'}
        style={{ 
          fontSize: '20px', // Slightly increased font size
          fontWeight: 'bold',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial'
        }}
      >
        {normalizedPercentage}%
      </text>
      
      {/* Load status text */}
      <text
        x="60"
        y="40" // Adjusted Y position for centering
        textAnchor="middle"
        fill="#8c8c8c"
        style={{ 
          fontSize: '12px', // Increased font size
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial'
        }}
      >
        {/* Add any text you want here */}
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
      name: 'Rahul',
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
    key: 3,
    vehicleId: 'V003',
    type: 'Canter',
    loadPercentage: 40,
    driver: {
      name: 'Suresh',
      image: driver3Image,
      license: 'DL-111222333',
      experience: '4 years',
      rating: '4.7/5',
      joinedDate: '10 Feb 2021',
      totalTrips: 900,
      performanceScore: 92,
      status: 'Active'
    },
    status: 'In Transit',
    currentLocation: 'Koramangala',
    destination: 'HSR Layout',
    coordinates: [12.9348, 77.6410],
    destinationCoordinates: [12.9236, 77.6174],
    lastUpdated: '15 mins ago',
    fuelLevel: '60%',
    speed: '50 km/h'
  },
  {
    key: 4,
    vehicleId: 'V004',
    type: 'Tata Ace',
    loadPercentage: 85,
    driver: {
      name: 'Anil',
      image: driver1Image,
      license: 'DL-987123654',
      experience: '6 years',
      rating: '4.9/5',
      joinedDate: '25 Apr 2019',
      totalTrips: 1400,
      performanceScore: 98,
      status: 'Active'
    },
    status: 'Completed',
    currentLocation: 'Whitefield',
    destination: 'KR Puram',
    coordinates: [12.9702, 77.7500],
    destinationCoordinates: [12.9705, 77.7254],
    lastUpdated: '2 mins ago',
    fuelLevel: '30%',
    speed: '55 km/h'
  },
  {
    key: 5,
    vehicleId: 'V005',
    type: '307',
    loadPercentage: 70,
    driver: {
      name: 'Vikram',
      image: driver2Image,
      license: 'DL-654321987',
      experience: '2 years',
      rating: '4.6/5',
      joinedDate: '30 May 2022',
      totalTrips: 500,
      performanceScore: 85,
      status: 'Inactive'
    },
    status: 'Scheduled',
    currentLocation: 'Indiranagar',
    destination: 'Jayanagar',
    coordinates: [12.9347, 77.6101],
    destinationCoordinates: [12.9318, 77.5900],
    lastUpdated: '30 mins ago',
    fuelLevel: '20%',
    speed: '30 km/h'
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

  const DriverDetailsCard = ({ driver, loadPercentage }) => {
    if (!driver) return null;

    return (
      <div style={{ float: 'right', width: '780px', marginRight: '1px' }}>
    <Card
  title={
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <UserOutlined style={{ fontSize: '16px', marginRight: '8px' }} />
        <span className="driver-details-title">Driver Details</span>
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button type="primary" icon={<PhoneOutlined />} className="driver-details-button" style={{ width: '130px' }}>
          Call Driver
        </Button>
        <Button icon={<MailOutlined />} className="driver-details-button" style={{ width: '130px' }}>
          Send Message
        </Button>
      </div>
    </div>
  }
  className="driver-details-card"
>
    

    <Row gutter={[14, 14]}>
  <Col span={8}>

    <Card bordered={false} className="driver-profile-card" style={{ padding: '8px', height: 'auto' }}>
  <div className="driver-avatar-container">
    <img
      src={driver.image}
      alt={driver.name}
      style={{
        width: '120px', // Reduced width
        height: '150px', // Reduced height
        borderRadius: '20%',
        border: '4px solid #1890ff',
        objectFit: 'cover',
        marginBottom: '2px' // Reduced margin
      }}
    />
  </div>
  <Title level={4} style={{ margin: '8px 0 4px' }}>{driver.name}</Title> {/* Reduced margin */}
 
</Card>
  </Col>

  <Col span={16}>
  <Row gutter={[16, 16]}>
    

  <Col span={18} className="flex flex-col items-center"> {/* Centering the contents */}
  <TruckLoadVisualization loadPercentage={loadPercentage} />

 {/* Additional Driver Information */}
{/* <div className="flex justify-center items-center space-x-8 mt-4"> 
  <div className="flex items-center">
    <strong className="mr-1">Total Trips:</strong>
    <span>{driver.totalTrips}</span> 
  </div>
  
  <div className="flex items-center">
    <strong className="mr-1">Rating:</strong>
    <span>{driver.rating}</span> 
  </div>
  
  <div className="flex items-center">
    <strong className="mr-1">Order Status:</strong>
    <span>{driver.orderStatus}</span> 
  </div>
</div> */}
</Col>

  </Row>

  
</Col>
</Row>


  
  </Card>
</div>
    );
  };

  return (
    <Layout>
     
        <Content style={{ padding: '24px', margin: '0', background: '#f0f2f5' }}>
          <Row gutter={[16, 16]}>
            {/* Left Column - Vehicle Fleet */}
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
               style={{ height: '100%', maxHeight: '80vh', overflow: 'hidden' }}
             >
              <Search
                  placeholder="Search by Vehicle ID or Driver Name"
                  onSearch={handleSearch}
                  style={{ marginBottom: 16 }}
                  enterButton
                />
    <div style={{ height: 'calc(80vh - 100px)', overflowY: 'auto' }}> {/* Adjusted to fit within the card */}
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Map Section */}
            <Card 
                  title={
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <EnvironmentOutlined style={{ fontSize: '20px', marginRight: '8px' }} />
                      Vehicle Tracking
                    </div>
                 }
                 bordered={false}
                 style={{ height: '450px' }}
               >
              <MapContainer 
                    center={selectedVehicle ? selectedVehicle.coordinates : [12.9716, 77.5946]} 
                    zoom={13} 
                    style={{ height: '350px', width: '100%' }}
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


  <Spin spinning={loading}>
                  {selectedVehicle && (
                    <DriverDetailsCard 
                      driver={selectedVehicle.driver} 
                      loadPercentage={selectedVehicle.loadPercentage}
                    />
                  )}
                </Spin>
                </div>
            </Col>
          </Row>
        </Content>
    
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