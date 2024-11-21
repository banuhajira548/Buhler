import React, { useState } from 'react';
import { ArrowLeft, MapPin, Clock, Package, Search } from 'react-feather';
import { Card, Row, Col, Button, Tag, Divider, Input, DatePicker } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Search: AntSearch } = Input;

// Add sample data for different orders
const orderData = [
  {
    orderId: "123354",
    date: "17 July 2024 18:00",
    company: "CMTI",
    location: "Bangalore, India",
    pickupAddress: "123 Industrial Area, Phase 1, Central Manufacturing Technology Institute",
    deliveryAddress: "456 Distribution Hub, Andhra Pradesh",
    status: "Pending",
    weight: "500 kg",
    dimensions: "2m x 1.5m x 1m",
    vehicleType: "Commercial Truck",
    notes: "Fragile equipment. Handle with care. Delivery required during business hours."
  },
  {
    orderId: "123355",
    date: "17 July 2024 19:30",
    company: "BHEL",
    location: "Chennai, India",
    pickupAddress: "456 Industrial Zone, Phase 2, BHEL Manufacturing Unit",
    deliveryAddress: "789 Logistics Hub, Kerala",
    status: "Processing",
    weight: "750 kg",
    dimensions: "3m x 2m x 1.5m",
    vehicleType: "Heavy Truck",
    notes: "Temperature sensitive equipment. Requires special handling."
  },
  {
    orderId: "123364",
    date: "17 July 2024 18:00",
    company: "Raj Industries",
    location: "Bangalore, India",
    pickupAddress: "123 Industrial Area, Phase 1, Central Manufacturing Technology Institute",
    deliveryAddress: "456 Distribution Hub, Andhra Pradesh",
    status: "Pending",
    weight: "500 kg",
    dimensions: "2m x 1.5m x 1m",
    vehicleType: "Commercial Truck",
    notes: "Fragile equipment. Handle with care. Delivery required during business hours."
  },
  {
    orderId: "123365",
    date: "17 July 2024 19:30",
    company: "BEL",
    location: "Chennai, India",
    pickupAddress: "456 Industrial Zone, Phase 2, BHEL Manufacturing Unit",
    deliveryAddress: "789 Logistics Hub, Kerala",
    status: "Processing",
    weight: "750 kg",
    dimensions: "3m x 2m x 1.5m",
    vehicleType: "Heavy Truck",
    notes: "Temperature sensitive equipment. Requires special handling."
  },
  // Add more order data as needed
];

const OrderDetailsPage = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [searchDate, setSearchDate] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(orderData[0]);

  // Add search functionality
  const handleSearch = (value) => {
    setSearchText(value);
    // Implement search logic here
  };

  const handleDateChange = (date) => {
    setSearchDate(date);
    // Implement date filter logic here
  };

  return (
    <Row 
      gutter={[24, 24]} 
      style={{ 
        padding: '4px',
        marginTop: '4px'
      }}
    >
      {/* Main Order Details Card */}
      <Col span={18}>
        <Card 
          className="order-details-card"
          title="Order Request Details"
          style={{
            height: 'calc(100vh - 112px)',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }}
          bodyStyle={{
            height: 'calc(100% - 57px)',
            overflow: 'auto',
            padding: '24px'
          }}
        >
          <Card style={{ marginBottom: '24px' }}>
            {/* Company Info */}
            <Row className="mb-6" align="middle" justify="space-between">
              <Col>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-fff1f0 rounded-full mr-4" />
                  <div>
                    <h2 className="text-xl font-bold m-0">{selectedOrder.company}</h2>
                    <p className="text-sm text-gray-600 m-0">{selectedOrder.location}</p>
                  </div>
                </div>
              </Col>
              <Col>
                <div>
                  <Button type="default" style={{ marginRight: 16 }}>
                    Reject
                  </Button>
                  <Button type="primary">
                    Accept
                  </Button>
                </div>
              </Col>
            </Row>

            <Divider />

            {/* Order Information - Updated to use selectedOrder data */}
            <div className="mb-6">
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <div className="flex items-center mb-2">
                    <Package size={16} className="mr-2" />
                    <span className="text-base font-medium">Order ID: #{selectedOrder.orderId}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="mr-2" />
                    <span className="text-sm">Order Placed: {selectedOrder.date}</span>
                  </div>
                </Col>
                <Col span={12}>
                  <p className="text-sm leading-relaxed">
                    Delivery of industrial equipment from {selectedOrder.company} warehouse to {selectedOrder.deliveryAddress}.
                  </p>
                </Col>
              </Row>
            </div>

            {/* Address Blocks - Updated to use selectedOrder data */}
            <Row gutter={24} className="mb-6">
              <Col span={12}>
                <Card className="bg-gray-50" size="small" title="Pickup Address">
                  <p className="text-sm m-0">
                    {selectedOrder.pickupAddress}
                  </p>
                </Card>
              </Col>
              <Col span={12}>
                <Card className="bg-gray-50" size="small" title="Delivery Address">
                  <p className="text-sm m-0">
                    {selectedOrder.deliveryAddress}
                  </p>
                </Card>
              </Col>
            </Row>

            {/* Route Section */}
            <Card size="small" className="mb-6">
              <div className="flex items-center">
                <MapPin size={16} className="mr-2" />
                <span className="text-sm font-medium">{selectedOrder.location} — {selectedOrder.deliveryAddress.split(',')[1]}</span>
              </div>
            </Card>

            {/* Order Summary - Updated to use selectedOrder data */}
            <Card 
              title="Order Summary" 
              className="mb-6"
              size="small"
            >
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <div className="text-sm">
                    <strong>Package Weight:</strong>
                    <div>{selectedOrder.weight}</div>
                  </div>
                </Col>
                <Col span={8}>
                  <div className="text-sm">
                    <strong>Dimensions:</strong>
                    <div>{selectedOrder.dimensions}</div>
                  </div>
                </Col>
                <Col span={8}>
                  <div className="text-sm">
                    <strong>Vehicle Type:</strong>
                    <div>{selectedOrder.vehicleType}</div>
                  </div>
                </Col>
              </Row>
            </Card>

            {/* Note Section - Updated to use selectedOrder data */}
            <Card 
              title="Additional Notes" 
              className="bg-gray-50"
              size="small"
            >
              <p className="text-sm m-0">
                {selectedOrder.notes}
              </p>
            </Card>
          </Card>
        </Card>
      </Col>

      {/* Recent Order Requests Panel */}
      <Col span={6}>
        <Card 
          title={
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column',
              gap: '12px'
            }}>
              <span>Order Requests</span>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                <AntSearch
                  placeholder="Search by Order ID"
                  allowClear
                  onChange={(e) => handleSearch(e.target.value)}
                  style={{ width: '100%' }}
                />
                {/* <DatePicker
                  style={{ width: '100%' }}
                  onChange={handleDateChange}
                  placeholder="Select Date"
                /> */}
              </div>
            </div>
          }
          style={{
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            height: 'calc(100vh - 112px)'
          }}
          bodyStyle={{
            height: 'calc(100% - 140px)',
            padding: '16px',
            overflow: 'hidden'
          }}
        >
          <div style={{
            height: '100%',
            overflowY: 'auto',
            overflowX: 'hidden',
            paddingRight: '8px',
            marginRight: '-8px'
          }}>
            {orderData.map((order, index) => (
              <Card 
                key={order.orderId}
                size="small" 
                className="order-request-card"
                style={{ 
                  cursor: 'pointer',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                  marginBottom: '12px',
                  padding: '12px',
                  borderColor: selectedOrder.orderId === order.orderId ? '#1890ff' : '#d9d9d9'
                }}
                hoverable
                onClick={() => setSelectedOrder(order)}
              >
                {/* Header with Order ID and Date */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '12px'
                }}>
                  <span style={{ fontWeight: 600 }}>Order ID: #{order.orderId}</span>
                  <span style={{ color: '#666' }}>{order.date}</span>
                </div>

                {/* Pickup Location */}
                <div style={{ marginBottom: '8px' }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    marginBottom: '4px'
                  }}>
                    <MapPin size={14} style={{ marginRight: '8px', color: '#1890ff' }} />
                    <span style={{ fontWeight: 500 }}>Pickup Location</span>
                  </div>
                  <div style={{ 
                    paddingLeft: '22px',
                    fontSize: '12px',
                    color: '#666'
                  }}>
                    123 Industrial Area, Phase 1, Central Manufacturing Technology Institute
                  </div>
                </div>

                {/* Destination */}
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    marginBottom: '4px'
                  }}>
                    <MapPin size={14} style={{ marginRight: '8px', color: '#52c41a' }} />
                    <span style={{ fontWeight: 500 }}>Destination</span>
                  </div>
                  <div style={{ 
                    paddingLeft: '22px',
                    fontSize: '12px',
                    color: '#666'
                  }}>
                    456 Distribution Hub, Andhra Pradesh
                  </div>
                </div>

                {/* Footer with Company and View Details */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '8px',
                  borderTop: '1px solid #f0f0f0',
                  paddingTop: '8px'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center'
                  }}>
                    <span style={{ 
                      fontSize: '12px',
                      color: '#666'
                    }}>
                      Requested by: CMTI
                    </span>
                  </div>
                  <Button 
                    type="link" 
                    size="small"
                    style={{
                      padding: '4px 8px',
                      height: 'auto'
                    }}
                  >
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </Col>
    </Row>
  );
};

// Add custom CSS for better styling
const styles = `
  .order-request-card:last-child {
    margin-bottom: 0 !important;
  }

  .ant-card-body::-webkit-scrollbar {
    width: 6px;
  }

  .ant-card-body::-webkit-scrollbar-track {
    background: #f0f0f0;
    border-radius: 3px;
  }

  .ant-card-body::-webkit-scrollbar-thumb {
    background: #d9d9d9;
    border-radius: 3px;
  }

  .ant-card-body::-webkit-scrollbar-thumb:hover {
    background: #bfbfbf;
  }

  .ant-input-search {
    margin-bottom: 8px;
  }

  .ant-picker {
    margin-bottom: 8px;
  }
`;

// Add the styles to the document
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default OrderDetailsPage; 