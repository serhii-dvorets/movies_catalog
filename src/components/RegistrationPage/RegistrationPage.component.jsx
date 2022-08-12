import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import {
  LoginPageContainer,
  PageTitle,
} from './RegistrationPage.styles';
import { LoginPageValidationSchema } from './RegistrationPage.validation';
import {
  Form,
  Input,
  message
} from 'antd';
import {
  LockOutlined,
  UserOutlined,
  MailOutlined
} from '@ant-design/icons';
import { axiosInstance } from '../../axios/axiosInstance';
import { LoginButton } from '../LoginPage/LoginPage.styles';

export const RegistrationPage = () => {
  const navigate = useNavigate();

  const form = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },

    validationSchema: LoginPageValidationSchema,
    validateOnChange: false,

    async onSubmit(values) {
      try {
        axiosInstance.post(`http://localhost:8000/api/v1/users`, values).then(res => {
          console.log(res);
          if (res.statusText === 'OK') {
            message.success('You are successfully registered!');
            navigate('/');
          }
        }).catch(e => message.error(e.response.data.message))
      } catch (e) {
        console.log('Registration request error', e);
        return message.error('Something went wront!');
      }
    }
  })

  return (
    <LoginPageContainer>
      <PageTitle>Registration</PageTitle>

      <form onSubmit={form.handleSubmit}>
        <Form.Item
          validateStatus={form.errors.name ? 'error' : 'success'}
          help={form.errors.name}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Name"
            name="name"
            value={form.values.name}
            onChange={form.handleChange}
          />
        </Form.Item>

        <Form.Item
          validateStatus={form.errors.email ? 'error' : 'success'}
          help={form.errors.email}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="E-mail"
            name="email"
            value={form.values.email}
            onChange={form.handleChange}
          />
        </Form.Item>

        <Form.Item
          validateStatus={form.errors.password ? 'error' : 'success'}
          help={form.errors.password}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            name="password"
            placeholder="Password"
            value={form.values.password}
            onChange={form.handleChange}
          />
        </Form.Item>

        <Form.Item
          validateStatus={form.errors.confirmPassword ? 'error' : 'success'}
          help={form.errors.confirmPassword}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={form.values.confirmPassword}
            onChange={form.handleChange}
          />
        </Form.Item>

        <Form.Item>
          <LoginButton type='submit'>submit</LoginButton>
        </Form.Item>
      </form>
    </LoginPageContainer>
  )
}
