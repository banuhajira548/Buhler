import React from 'react';
import { Card, Table, Button, Input, Select, Typography, Modal, Row, Col, message, Divider } from 'antd';

const { Title, Text } = Typography;
const { Option } = Select;

const BillingPage = () => {
  const transactionColumns = [
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
  ];

  const transactionData = [
    { key: '1', date: '2024-10-01', description: 'Service Charge', amount: '$200.00', status: 'Paid' },
    { key: '2', date: '2024-09-15', description: 'Monthly Subscription', amount: '$300.00', status: 'Paid' },
  ];

  const generateInvoice = (invoiceId) => {
    Modal.info({
      title: `Invoice #${invoiceId}`,
      content: (
        <div>
          <p>This is the invoice for invoice number {invoiceId}. The document will be generated here.</p>
          <Button
            type="primary"
            onClick={() => {
              message.success(`Invoice ${invoiceId} is being downloaded`);
              window.open(`/invoice/${invoiceId}`, '_blank');
            }}
          >
            Download PDF
          </Button>
        </div>
      ),
    });
  };

  const handlePayment = () => {
    message.success("Payment processed successfully!");
  };

  return (
    <div style={{ padding: '24px' }}>
      <Card bordered={false} style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
        <Title level={2} style={{ marginBottom: '24px', textAlign: 'center' }}>Billing Information</Title>

        <Row gutter={24}>
          <Col span={12}>
            <Card title="Billing Summary" bordered={false} style={{ marginBottom: '24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
              <Text>Total Amount Due: </Text> 
              <Text strong style={{ fontSize: '20px', color: '#f5222d' }}>$500.00</Text>
              <Divider />
              <Text>Due Date: </Text> 
              <Text strong>2024-10-31</Text>
              <Divider />
              <Text>Status: </Text> 
              <Text type="warning">Pending</Text>
            </Card>
          </Col>

          <Col span={12}>
            <Card title="Payment Methods" bordered={false} style={{ marginBottom: '24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
              <Text>Visa **** **** **** 1234</Text>
              <Button type="primary" style={{ marginTop: '16px', width: '100%' }}>Add Payment Method</Button>
            </Card>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Card title="Transaction History" bordered={false} style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
              <Table
                columns={transactionColumns}
                dataSource={transactionData}
                pagination={{ pageSize: 3 }}
                bordered
              />
            </Card>
          </Col>

          <Col span={12}>
            <Card title="Invoices" bordered={false} style={{ marginBottom: '24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li>
                  <Button type="link" onClick={() => generateInvoice('12345')}>
                    Invoice #12345 - View
                  </Button>
                </li>
                <li>
                  <Button type="link" onClick={() => generateInvoice('67890')}>
                    Invoice #67890 - View
                  </Button>
                </li>
              </ul>
            </Card>

            <Card title="Make a Payment" bordered={false} style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', marginTop: '24px' }}>
              <Input placeholder="Amount" style={{ marginBottom: '12px' }} />
              <Select defaultValue="Select Payment Method" style={{ width: '100%', marginBottom: '12px' }}>
                <Option value="visa">Visa **** 1234</Option>
              </Select>
              <Button type="primary" style={{ width: '100%' }} onClick={handlePayment}>Pay Now</Button>
            </Card>
          </Col>
        </Row>

        <Card title="Contact Support" bordered={false} style={{ marginTop: '24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
          <Text>If you have any questions regarding your bill, please contact support.</Text>
        </Card>
      </Card>
    </div>
  );
};

export default BillingPage;
