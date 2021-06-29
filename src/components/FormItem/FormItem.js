import React from 'react';
import { Form } from 'antd';

const FormItem = ({ label, name, rules, input }) => {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={rules}
    >
      {input}
    </Form.Item>
  )
}

export default FormItem