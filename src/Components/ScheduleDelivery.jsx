import React, { useState } from 'react';
import { Input, Button, Row, Col, Card, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';  // Use useNavigate instead of useHistory
import { v4 as uuidv4 } from 'uuid';

const ScheduleDelivery = () => {
  const navigate = useNavigate();  // Initialize useNavigate
  const [formData, setFormData] = useState({
    vendorCode: '',
    vendorName: '',
    purchaseOrder: '',
    partNo: '',
    quantity: '',
    numberOfBox: '',
    shipmentVolume: '',
    expectedTime: '',
    totalWeight: '',
    vendorContact: '',
    requestedBy: '',
    location: '',
    remarks: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (Object.values(formData).some(field => field === '')) {
      message.error('Please fill out all fields');
      return;
    }

    const newRecord = {
      ...formData,
      id: uuidv4(),
      timestamp: new Date().toISOString()
    };

    const historyRecords = JSON.parse(localStorage.getItem('historyRecords')) || [];
    historyRecords.unshift(newRecord);
    localStorage.setItem('historyRecords', JSON.stringify(historyRecords));

    message.success('Service Scheduled Successfully');
    navigate('/history');
  };

  const inputStyle = {
    transition: 'all 0.3s ease',
    '&:hover': {
      borderColor: '#40a9ff',
      boxShadow: '0 0 0 2px rgba(24,144,255,0.2)'
    }
  };

  return (
    <Card
      title={<h3 className="text-4xl font-bold text-gray-800">SCHEDULE DELIVERY</h3>}
      bordered={false}
      style={{ width: '100%', borderRadius: '8px', padding: '24px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}
    >
      {/* First Row */}
      <Row gutter={[32, 32]}>
        <Col span={6}>
          <label className="block font-semibold mb-2 text-gray-600">Vendor Code</label>
          <Input 
            name="vendorCode" 
            value={formData.vendorCode} 
            onChange={handleInputChange} 
            placeholder="16981918" 
            className="p-6 text-lg font-sans hover:border-blue-400 focus:border-blue-500 transition-all duration-300"
            style={inputStyle}
          />
        </Col>
        <Col span={6}>
          <label className="block font-semibold mb-2 text-gray-600">Vendor Name</label>
          <Input name="vendorName" value={formData.vendorName} onChange={handleInputChange} placeholder="DMK Industries" className="p-6 text-lg font-sans" />
        </Col>
        <Col span={6}>
          <label className="block font-semibold mb-2 text-gray-600">Purchase Order</label>
          <Input name="purchaseOrder" value={formData.purchaseOrder} onChange={handleInputChange} placeholder="5095457769" className="p-6 text-lg font-sans" />
        </Col>
        <Col span={6}>
          <label className="block font-semibold mb-2 text-gray-600">Part No</label>
          <Input
            name="partNo"
            value={formData.partNo}
            onChange={handleInputChange}
            placeholder="Cartoon Sheet"
            className="p-6 text-lg font-sans"
          />
        </Col>
      </Row>

      {/* Second Row */}
      <Row gutter={[32, 32]} style={{ marginTop: '24px' }}>
        <Col span={6}>
          <label className="block font-semibold mb-2 text-gray-600">Quantity</label>
          <Input name="quantity" value={formData.quantity} onChange={handleInputChange} placeholder="40 Sheets" className="p-6 text-lg font-sans" />
        </Col>
        <Col span={6}>
          <label className="block font-semibold mb-2 text-gray-600">Number of Box</label>
          <Input name="numberOfBox" value={formData.numberOfBox} onChange={handleInputChange} placeholder="loose/metal part/cartoon" className="p-6 text-lg font-sans" />
        </Col>
        <Col span={6}>
          <label className="block font-semibold mb-2 text-gray-600">Shipment Volume in</label>
          <Input name="shipmentVolume" value={formData.shipmentVolume} onChange={handleInputChange} placeholder="length 3600m" className="p-6 text-lg font-sans" />
        </Col>
        <Col span={6}>
          <label className="block font-semibold mb-2 text-gray-600">Request Type</label>
          <Input name="expectedTime" value={formData.expectedTime} onChange={handleInputChange} placeholder="Delivery/Collection" className="p-6 text-lg font-sans" />
        </Col>
      </Row>

      {/* Third Row */}
      <Row gutter={[32, 32]} style={{ marginTop: '24px' }}>
        <Col span={6}>
          <label className="block font-semibold mb-2 text-gray-600">Total Weight</label>
          <Input name="totalWeight" value={formData.totalWeight} onChange={handleInputChange} placeholder="2000 kgs" className="p-6 text-lg font-sans" />
        </Col>
        <Col span={6}>
          <label className="block font-semibold mb-2 text-gray-600">Vendor Contact</label>
          <Input name="vendorContact" value={formData.vendorContact} onChange={handleInputChange} placeholder="19094585661" className="p-6 text-lg font-sans" />
        </Col>
        <Col span={6}>
          <label className="block font-semibold mb-2 text-gray-600">Requested By</label>
          <Input name="requestedBy" value={formData.requestedBy} onChange={handleInputChange} placeholder="Name" className="p-6 text-lg font-sans" />
        </Col>
        <Col span={6}>
          <label className="block font-semibold mb-2 text-gray-600">Location</label>
          <Input name="location" value={formData.location} onChange={handleInputChange} placeholder="Location" className="p-6 text-lg font-sans" />
        </Col>
      </Row>

      {/* Remarks Row */}
      <Row gutter={[32, 32]} style={{ marginTop: '24px' }}>
        <Col span={24}>
          <label className="block font-semibold mb-2 text-gray-600">Remarks</label>
          <Input.TextArea rows={4} placeholder="Additional comments..." className="p-6 text-lg font-sans" />
        </Col>
      </Row>

      {/* Schedule Service Button */}
      <div style={{ marginTop: '24px' }}>
        <Button type="primary" onClick={handleSubmit} className="bg-green-500 text-white px-12 py-4 rounded-lg">
          Schedule Service
        </Button>
      </div>
    </Card>
  );
};

export default ScheduleDelivery;
