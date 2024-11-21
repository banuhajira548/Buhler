import React, { useState } from 'react';
import { DatePicker, Card, Typography, Table, Checkbox, Button, Spin, Modal, notification } from 'antd';
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
      name: 'REQ123',
      description: 'From MG Road to Indiranagar',
      distance: '8 km',
      estimatedTime: '20 mins',
      startLocation: { lat: 12.9716, lng: 77.5946, name: 'MG Road' },
      endLocation: { lat: 12.9352, lng: 77.6243, name: 'Indiranagar' },
    },
    {
      key: 'routeB',
      name: 'REQ456',
      description: 'From Koramangala to Brigade Road',
      distance: '5 km',
      estimatedTime: '15 mins',
      startLocation: { lat: 12.9352, lng: 77.6243, name: 'Koramangala' },
      endLocation: { lat: 12.9716, lng: 77.5946, name: 'Brigade Road' },
    },
    {
      key: 'routeC',
      name: 'REQ789',
      description: 'From Whitefield to Electronics City',
      distance: '22 km',
      estimatedTime: '45 mins',
      startLocation: { lat: 12.9716, lng: 77.5946, name: 'Whitefield' },
      endLocation: { lat: 12.9352, lng: 77.6243, name: 'Electronics City' },
    },
  ];

  const vehicles = [
    { key: 'vehicle1', id: 'V001', type: 'Truck', driver: 'John Doe', status: 'Available' },
    { key: 'vehicle2', id: 'V002', type: 'Tata Ace', driver: 'Jane Smith', status: 'Available' },
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
          Request ID
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

  const handleConfirm = () => {
    if (selectedRouteDetails.length > 0) {
      const fromLocation = selectedRouteDetails[0].startLocation.name;
      const toLocation = selectedRouteDetails[0].endLocation.name;
      openNotification(fromLocation, toLocation);
    }
  };

  const openNotification = (from, to) => {
    notification.open({
      message: 'Tripsheet Generated and Sent, You can track your order in Routes',
      // description: `From: ${from} | To: ${to}`,
      placement: 'topRight', // Display at the top right corner
      duration: 3, // Notification duration in seconds
    });
  };

  return (
    <Card title="Route Optimization" style={{ width: '100%', padding: '20px' }}>
      <Title level={5}>Select Date</Title>
      <DatePicker onChange={handleDateChange} style={{ width: '18%' }} />

      <div style={{ marginTop: '20px' }}>
        <Title level={5}>Request Details</Title>
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
          Optimize Route
        </Button>
        <Button type="default" onClick={() => console.log("Previewing selected routes and vehicles")} disabled={loading}>
          Preview
        </Button>
      </div>

      {loading && (
        <div style={{ textAlign: 'center', marginTop: '0px' }}>
          <Spin size="large" />
        </div>
      )}

      <Modal
        // title="Selected Route and Vehicle Details"
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

        {/* <div style={{ height: '300px', marginTop: '20px' }}>
          <MapContainer center={mapCenter} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {routeCoordinates.length > 0 && (
              <>
                <Polyline positions={routeCoordinates.map(coord => [coord.lat, coord.lng])} color="blue" />
                <Marker position={routeCoordinates[0]}>
                  <Popup>Start: {selectedRoute?.startLocation.name}</Popup>
                </Marker>
                <Marker position={routeCoordinates[1]}>
                  <Popup>End: {selectedRoute?.endLocation.name}</Popup>
                </Marker>
              </>
            )}
          </MapContainer>
        </div> */}

        <Button type="primary" onClick={handleConfirm} style={{ marginTop: '20px' }}>
          Confirm
        </Button>
      </Modal>
    </Card>
  );
};

export default RouteOptimization;
