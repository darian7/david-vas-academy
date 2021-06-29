import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';

import { auth as authActions } from '../../../services/Auth/AuthActions'
import FormItem from '../../../components/FormItem/FormItem'
import { useTranslation } from 'react-i18next';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export const Login = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const { loading, error } = useSelector(state => state.auth)

  const onFinish = values => {
    dispatch(authActions.login(values))
  }

  return (
    <div className="login">
      <div className="login-content">
        <div className="login-logo">
          <img src={require("../../../assets/logo-fex.png")} alt="Fex" />
        </div>
        <Form
          form={form}
          name="FormLogin"
          onFinish={onFinish}
          //onFinishFailed={onFinishFailed}
        >
          <FormItem
            name="userName"
            rules={[{ required: true, message: t('error.login.NO_USERNAME') }]}
            input={<Input placeholder={t(`button.user`)} />}
          />

          <FormItem
            name="password"
            rules={[{ required: true, message: t(`error.login.NO_PASSWORD`) }]}
            input={<Input.Password placeholder={t(`button.password`)} />}
          />

          <Form.Item >
            <Button type="primary" htmlType="submit">
              {t(`button.login`)}
              {loading?.login && <Spin indicator={antIcon} />}
            </Button>
            {error?.login && <div className="ant-form-item-explain big-error"> {t(`error.login.${error?.login}`)} </div>}
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}