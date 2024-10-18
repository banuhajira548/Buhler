import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { Layout, Card, Col, Row, Tag, Button, message, Spin, Input } from 'antd';
import { CarOutlined } from '@ant-design/icons';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Import images at the top
import tataAceImage from '../assets/tataace.png';
import truckImage from '../assets/truck.png'; // Assuming truck.png corresponds to 307
import canterImage from '../assets/17canter.png';

const { Content } = Layout;
const { Search } = Input;

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


// Sample vehicle data
const recentVehiclesData = [
  {
    key: '1',
    vehicleId: 'VEH123',
    type: 'Tata Ace',
    capacity: '750 kg',
    currentLocation: 'Electronic City',
    destination: 'Whitefield',
    status: 'In Transit',
    coordinates: { lat: 12.9333, lng: 77.6767 },
    destinationCoordinates: { lat: 12.9698, lng: 77.7499 },
    fuelLevel: '75%',
    speed: '45 km/h',
    lastUpdated: new Date().toLocaleString(),
    driver: { name: 'John Doe', phone: '123-456-7890', license: 'DL123456789' },
  },
  {
    key: '2',
    vehicleId: 'VEH124',
    type: '307',
    capacity: '2500 kg',
    currentLocation: 'Koramangala',
    destination: 'MG Road',
    status: 'Completed',
    coordinates: { lat: 12.9353, lng: 77.6245 },
    destinationCoordinates: { lat: 12.9746, lng: 77.6192 },
    fuelLevel: '60%',
    speed: '0 km/h',
    lastUpdated: new Date().toLocaleString(),
    driver: { name: 'Jane Smith', phone: '987-654-3210', license: 'DL987654321' },
  },
  {
    key: '3',
    vehicleId: 'VEH125',
    type: '17 Canter',
    capacity: '3500 kg',
    currentLocation: 'Indiranagar',
    destination: 'Banashankari',
    status: 'In Transit',
    coordinates: { lat: 12.9675, lng: 77.6408 },
    destinationCoordinates: { lat: 12.9417, lng: 77.5440 },
    fuelLevel: '85%',
    speed: '50 km/h',
    lastUpdated: new Date().toLocaleString(),
    driver: { name: 'Mike Johnson', phone: '654-321-9870', license: 'DL654321987' },
  },
  {
    key: '4',
    vehicleId: 'VEH126',
    type: 'Tata Ace',
    capacity: '820 kg',
    currentLocation: 'Marathahalli',
    destination: 'Hebbal',
    status: 'Maintenance',
    coordinates: { lat: 12.9675, lng: 77.7155 },
    destinationCoordinates: { lat: 13.0350, lng: 77.5895 },
    fuelLevel: '45%',
    speed: '0 km/h',
    lastUpdated: new Date().toLocaleString(),
    driver: { name: 'Alice Brown', phone: '321-654-9870', license: 'DL321654987' },
  },
];

const vehicleImages = {
  'Tata Ace': tataAceImage,
  '307': truckImage,
  '17 Canter': canterImage,
};

const VehicleManagement = () => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [vehiclePosition, setVehiclePosition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [vehicles, setVehicles] = useState(recentVehiclesData);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter vehicles based on search term
  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.vehicleId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Simulate real-time updates
  useEffect(() => {
    const updateInterval = setInterval(() => {
      setVehicles(prevVehicles => 
        prevVehicles.map(vehicle => ({
          ...vehicle,
          lastUpdated: new Date().toLocaleString(),
          speed: vehicle.status === 'In Transit' 
            ? `${Math.floor(Math.random() * 20 + 35)} km/h`
            : '0 km/h',
          fuelLevel: `${Math.max(30, Math.floor(Math.random() * 100))}%`
        }))
      );
    }, 5000);

    return () => clearInterval(updateInterval);
  }, []);

  const handleVehicleSelect = (vehicle) => {
    setLoading(true);
    setSelectedVehicle(vehicle);
    
    // Simulate loading time for vehicle data
    setTimeout(() => {
      setLoading(false);
      message.success(`Now tracking ${vehicle.vehicleId}`);
    }, 1000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Transit': return 'blue';
      case 'Completed': return 'green';
      case 'Maintenance': return 'orange';
      default: return 'default';
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout>
        <Content style={{ padding: '24px', margin: '0', background: '#f0f2f5' }}>
          <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
            {/* Vehicle List */}
            <Col span={12}>
              <Card title="Vehicle Fleet" bordered={false}>
                <Search
                  placeholder="Search by Vehicle ID"
                  onSearch={value => setSearchTerm(value)}
                  onChange={e => setSearchTerm(e.target.value)}
                  style={{ marginBottom: 16 }}
                />
                <Spin spinning={loading}>
                  <div style={{ height: '600px', overflowY: 'auto' }}>
                    {filteredVehicles.map((vehicle) => (
                     <Card
                     key={vehicle.key}
                     style={{
                       marginBottom: 16,
                       borderRadius: 8,
                       cursor: 'pointer',
                       border: selectedVehicle?.key === vehicle.key ? '2px solid #1890ff' : '1px solid #d9d9d9'
                     }}
                     onClick={() => handleVehicleSelect(vehicle)}
                   >
                     <Row gutter={[16, 8]}>
                       <Col span={24}>
                         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                           <div>
                             <strong>Vehicle ID:</strong> {vehicle.vehicleId}
                           </div>
                           <Tag color={getStatusColor(vehicle.status)}>{vehicle.status}</Tag>
                         </div>
                         <div>
                           <strong>Type:</strong> {vehicle.type}
                         </div>
                         <div>
                           <strong>Driver:</strong> {vehicle.driver.name}
                         </div>
                       </Col>
                       <Col span={12}>
                         <img
                           src={vehicleImages[vehicle.type]}
                           alt={vehicle.type}
                           style={{ width: '190px', height: 'auto' }} // Increased width
                         />
                       </Col>
                       <Col span={12}>
                         <div>
                           <strong>Current Location:</strong> {vehicle.currentLocation}
                         </div>
                         <div>
                           <strong>Destination:</strong> {vehicle.destination}
                         </div>
                         <div>
                           <strong>Last Updated:</strong> {vehicle.lastUpdated}
                         </div>
                         <div>
                           <strong>Fuel Level:</strong> {vehicle.fuelLevel}
                         </div>
                         <div>
                           <strong>Speed:</strong> {vehicle.speed}
                         </div>
                       </Col>
                     </Row>
                   </Card>
                    ))}
                  </div>
                </Spin>
              </Card>
            </Col>

            {/* Map Section */}
            <Col span={12}>
              <Card title="Vehicle Tracking" bordered={false}>
                <MapContainer center={selectedVehicle ? vehiclePosition : [12.9716, 77.5946]} zoom={13} style={{ height: '600px' }}>
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                  />
                  {selectedVehicle && vehiclePosition && (
                    <>
                      <Marker position={vehiclePosition} icon={vehicleIcon}>
                        <Popup>
                          {selectedVehicle.vehicleId} <br /> {selectedVehicle.currentLocation}
                        </Popup>
                      </Marker>
                      <Marker position={selectedVehicle.destinationCoordinates} icon={vehicleIcon}>
                        <Popup>
                          Destination: {selectedVehicle.destination}
                        </Popup>
                      </Marker>
                      <Polyline positions={[vehiclePosition, selectedVehicle.destinationCoordinates]} color="blue" />
                    </>
                  )}
                </MapContainer>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default VehicleManagement;