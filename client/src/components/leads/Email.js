import React, { useState } from "react";
import { Modal, Button, Input, Form } from "antd";
import axios from "axios";
const { TextArea } = Input;

function Email({ visible, toggleModal, id, getDetails }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    form.resetFields();
    toggleModal();
  };
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const response = await axios.patch(`http://localhost:7000/api/v1/lead/sendmail/${id}`, values);
      console.log("Email sent successfully", response.data);
      form.resetFields();
      toggleModal();
      getDetails(id)
    } catch (error) {
      console.error("Email not sent", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Modal
        title="Compose Email"
        visible={visible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleSubmit}
          >
            Send Email
          </Button>,
        ]}
      >
        <Form form={form}>
        <Form.Item
            name="sentby"
            label="From"
            labelCol={{ span: 4 }}
            labelAlign="left"
            placeholder= "Enter Name"
            rules={[
              { required: true, message: "Please enter the email sender" },
            ]}            
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="to"
            label="To"
            labelCol={{ span: 4 }}
            labelAlign="left"
            placeholder="abc@gmail.com"
            rules={[
              { required: true, message: "Please enter the recipient email" },
            ]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            name="subject"
            label="subject"
            labelCol={{ span: 4 }}
            labelAlign="left"
            placeholder="Enter Subject"
            rules={[
              { required: true, message: "Please enter the email subject" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="content"
            label="content"
            labelCol={{ span: 4 }}
            labelAlign="left"
            placeholder="Enter You content"
            rules={[
              { required: true, message: "Please enter the email content" },
            ]}
          >
            <TextArea autoSize={{ minRows: 4 }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Email;
