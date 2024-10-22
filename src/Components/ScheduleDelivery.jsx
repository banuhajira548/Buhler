import React from 'react';
import { Input, Button, Row, Col } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const ScheduleDelivery = () => {
  return (
    <div className="p-8 bg-white rounded shadow-lg w-full">
      <h3 className="text-4xl font-bold mb-12 text-gray-800">SCHEDULE DELIVERY</h3>

      {/* First Row */}
      <Row gutter={[32, 32]} > {/* Adjusted spacing between rows */}
        <Col span={6}>
          <label className="block font-semibold mb-2 text-gray-600">Vendor Code</label>
          <Input 
            placeholder="16981918" 
            className="p-6 text-lg font-sans" // Adjusted padding and font
          />
        </Col>
        <Col span={6}>
          <label className="block font-semibold mb-2 text-gray-600">Vendor Name</label>
          <Input 
            placeholder="DMK Industries" 
            className="p-6 text-lg font-sans" 
          />
        </Col>
        <Col span={6}>
          <label className="block font-semibold mb-2 text-gray-600">Purchase Order</label>
          <Input 
            placeholder="5095457769" 
            className="p-6 text-lg font-sans" 
          />
        </Col>
        <Col span={6}>
          <label className="block font-semibold mb-2 text-gray-600">Part No</label>
          <Input 
            placeholder="Cartoon Sheet" 
            prefix={<UserOutlined />} 
            className="p-6 text-lg font-sans" 
          />
        </Col>
      </Row>

      {/* Second Row */}
      <Row gutter={[32, 32]} className="mt-12" style={{ marginTop: '14px' }}> {/* Added margin for better spacing */}
        <Col span={6}>
          <label className="block font-semibold mb-2 text-gray-600">Quantity</label>
          <Input 
            placeholder="40 Sheets" 
            className="p-6 text-lg font-sans" 
          />
        </Col>
        <Col span={6}>
          <label className="block font-semibold mb-2 text-gray-600">Number of Box</label>
          <Input 
            placeholder="loose/metal part/cartoon" 
            className="p-6 text-lg font-sans" 
          />
        </Col>
        <Col span={6}>
          <label className="block font-semibold mb-2 text-gray-600">Shipment Volume in</label>
          <Input 
            placeholder="length 3600m" 
            className="p-6 text-lg font-sans" 
          />
        </Col>
        <Col span={6}>
          <label className="block font-semibold mb-2 text-gray-600">Expected Time</label>
          <Input 
            placeholder="11:00 AM" 
            className="p-6 text-lg font-sans" 
          />
        </Col>
      </Row>

      {/* Third Row */}
      <Row gutter={[32, 32]} className="mt-12" style={{ marginTop: '14px' }}>
        <Col span={6}>
          <label className="block font-semibold mb-2 text-gray-600">Total Weight</label>
          <Input 
            placeholder="2000 kgs" 
            prefix={<UserOutlined />} 
            className="p-6 text-lg font-sans" 
          />
        </Col>
        <Col span={6}>
          <label className="block font-semibold mb-2 text-gray-600">Vendor Contact</label>
          <Input 
            placeholder="19094585661" 
            className="p-6 text-lg font-sans" 
          />
        </Col>
        <Col span={6}>
          <label className="block font-semibold mb-2 text-gray-600">Requested By</label>
          <Input 
            placeholder="Name" 
            className="p-6 text-lg font-sans" 
          />
        </Col>
        <Col span={6}>
          <label className="block font-semibold mb-2 text-gray-600">Location</label>
          <Input 
            placeholder="Location" 
            className="p-6 text-lg font-sans" 
          />
        </Col>
      </Row>

      {/* Remarks Row */}
      <Row gutter={[32, 32]} className="mt-12" style={{ marginTop: '14px' }}>
        <Col span={24}> {/* Full width for remarks */}
          <label className="block font-semibold mb-2 text-gray-600">Remarks</label>
          <Input.TextArea 
            rows={4} 
            placeholder="Additional comments..." 
            className="p-6 text-lg font-sans" 
          />
        </Col>
      </Row>

      {/* Schedule Service Button */}
      <div className="mt-12">
        <Button type="primary" className="bg-green-500 text-white px-12 py-4 rounded-lg" style={{ marginTop: '14px' }}>
            Schedule Service
        </Button>
      </div>
    </div>
  );
};

export default ScheduleDelivery;
