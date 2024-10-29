import React, { useState } from 'react';
import { DatePicker, Card, Typography, Table, Checkbox, Button, Spin, Modal } from 'antd';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const { Title } = Typography;

const RouteOptimization = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedRoutes, setSelectedRoutes] = useState([]);
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [mapCenter, setMapCenter] = useState([12.9716, 77.5946]);

  const routes = [
    {
      key: 'routeA',
      name: 'Route A',
      description: 'From MG Road to Indiranagar',
      distance: '8 km',
      estimatedTime: '20 mins',
      startLocation: { lat: 12.9716, lng: 77.5946 },
      endLocation: { lat: 12.9352, lng: 77.6243 },
    },
    {
      key: 'routeB',
      name: 'Route B',
      description: 'From Koramangala to Brigade Road',
      distance: '5 km',
      estimatedTime: '15 mins',
      startLocation: { lat: 12.9352, lng: 77.6243 },
      endLocation: { lat: 12.9716, lng: 77.5946 },
    },
    {
      key: 'routeC',
      name: 'Route C',
      description: 'From Whitefield to Electronics City',
      distance: '22 km',
      estimatedTime: '45 mins',
      startLocation: { lat: 12.9716, lng: 77.5946 },
      endLocation: { lat: 12.9352, lng: 77.6243 },
    },
  ];

  const vehicles = [
    { key: 'vehicle1', id: 'V001', type: 'Truck', driver: 'John Doe', status: 'Available' },
    { key: 'vehicle2', id: 'V002', type: 'Tata Ace', driver: 'Jane Smith', status: 'On Route' },
    { key: 'vehicle3', id: 'V003', type: '17 Canter', driver: 'Mike Johnson', status: 'Available' },
  ];

  const handleDateChange = (date, dateString) => {
    setSelectedDate(dateString);
  };

  const handleRouteCheckboxChange = (routeKey, checked) => {
    setSelectedRoutes(prevSelectedRoutes =>
      checked ? [...prevSelectedRoutes, routeKey] : prevSelectedRoutes.filter(key => key !== routeKey)
    );
  };

  const handleVehicleCheckboxChange = (vehicleKey, checked) => {
    setSelectedVehicles(prevSelectedVehicles =>
      checked ? [...prevSelectedVehicles, vehicleKey] : prevSelectedVehicles.filter(key => key !== vehicleKey)
    );
  };

  const handleSelectAllRoutes = (checked) => {
    setSelectedRoutes(checked ? routes.map(route => route.key) : []);
  };

  const handleSelectAllVehicles = (checked) => {
    setSelectedVehicles(checked ? vehicles.map(vehicle => vehicle.key) : []);
  };

  const handleRouteOptimization = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      openModal();
    }, 2000);
  };

  const openModal = () => {
    setIsModalVisible(true);
    const selectedRouteDetails = routes.filter(route => selectedRoutes.includes(route.key));
    if (selectedRouteDetails.length > 0) {
      const { startLocation, endLocation } = selectedRouteDetails[0];
      setSelectedRoute(selectedRouteDetails[0]);
      setRouteCoordinates([startLocation, endLocation]);
      setMapCenter([startLocation.lat, startLocation.lng]);
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setRouteCoordinates([]);
    setSelectedRoute(null);
  };

  const selectedRouteDetails = routes.filter(route => selectedRoutes.includes(route.key));
  const selectedVehicleDetails = vehicles.filter(vehicle => selectedVehicles.includes(vehicle.key));

  const routeColumns = [
    {
      title: (
        <Checkbox
          checked={selectedRoutes.length === routes.length}
          indeterminate={selectedRoutes.length > 0 && selectedRoutes.length < routes.length}
          onChange={(e) => handleSelectAllRoutes(e.target.checked)}
        >
          Route Name
        </Checkbox>
      ),
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Checkbox
          checked={selectedRoutes.includes(record.key)}
          onChange={(e) => handleRouteCheckboxChange(record.key, e.target.checked)}
        >
          {text}
        </Checkbox>
      ),
    },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Distance', dataIndex: 'distance', key: 'distance' },
    { title: 'Estimated Time', dataIndex: 'estimatedTime', key: 'estimatedTime' },
  ];

  const vehicleColumns = [
    {
      title: (
        <Checkbox
          checked={selectedVehicles.length === vehicles.length}
          indeterminate={selectedVehicles.length > 0 && selectedVehicles.length < vehicles.length}
          onChange={(e) => handleSelectAllVehicles(e.target.checked)}
        >
          Vehicle ID
        </Checkbox>
      ),
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => (
        <Checkbox
          checked={selectedVehicles.includes(record.key)}
          onChange={(e) => handleVehicleCheckboxChange(record.key, e.target.checked)}
        >
          {text}
        </Checkbox>
      ),
    },
    { title: 'Vehicle Type', dataIndex: 'type', key: 'type' },
    { title: 'Driver', dataIndex: 'driver', key: 'driver' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
  ];

  return (
    <Card title="Route Optimization" style={{ width: '100%', padding: '20px' }}>
      <Title level={5}>Select Date</Title>
      <DatePicker onChange={handleDateChange} style={{ width: '100%' }} />

      <div style={{ marginTop: '20px' }}>
        <Title level={5}>Route Details</Title>
        <Table
          columns={routeColumns}
          dataSource={routes}
          pagination={false}
          rowKey="key"
        />
      </div>

      <div style={{ marginTop: '20px' }}>
        <Title level={5}>Vehicle Availability</Title>
        <Table
          columns={vehicleColumns}
          dataSource={vehicles}
          pagination={false}
          rowKey="key"
        />
      </div>

      <div style={{ marginTop: '20px', textAlign: 'right' }}>
        <Button type="primary" onClick={handleRouteOptimization} disabled={loading} style={{ marginRight: '10px' }}>
          Route Optimization
        </Button>
        <Button type="default" onClick={() => console.log("Previewing selected routes and vehicles")} disabled={loading}>
          Preview
        </Button>
      </div>

      {loading && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Spin size="large" />
        </div>
      )}

      <Modal
        title="Selected Route and Vehicle Details"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={900} // Adjusted width for better display
      >
        <Title level={5}>Selected Routes</Title>
        <Table
          columns={routeColumns}
          dataSource={selectedRouteDetails}
          pagination={false}
          rowKey="key"
        />
        <Title level={5}>Selected Vehicles</Title>
        <Table
          columns={vehicleColumns}
          dataSource={selectedVehicleDetails}
          pagination={false}
          rowKey="key"
        />

        {/* Leaflet Map */}
        <div style={{ height: '500px', marginTop: '20px' }}> {/* Increased height for better visibility */}
          <MapContainer center={mapCenter} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {routeCoordinates.length > 0 && (
              <>
                <Marker position={routeCoordinates[0]}>
                  <Popup>Start: {selectedRoute?.startLocation?.description || "Start"}</Popup>
                </Marker>
                <Marker position={routeCoordinates[1]}>
                  <Popup>End: {selectedRoute?.endLocation?.description || "End"}</Popup>
                </Marker>
                <Polyline positions={routeCoordinates.map(coord => [coord.lat, coord.lng])} color="blue" weight={5} />
              </>
            )}
          </MapContainer>
        </div>
      </Modal>
    </Card>
  );
};

export default RouteOptimization;