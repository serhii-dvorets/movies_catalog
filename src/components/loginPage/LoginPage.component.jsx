import { useFormik } from 'formik';
import * as React from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LoginPageContainer,
  PageTitle,
  PageSubtitle,
  LoginButton,
} from './LoginPage.styles';
import { LoginPageValidationSchema } from './LoginPage.validation';
import {
  Form,
  Input,
  message,
} from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { axiosInstance } from '../../axios/axiosInstance';

export const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      navigate('/home');
    }
  })

  const form = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    validationSchema: LoginPageValidationSchema,
    validateOnChange: false,

    async onSubmit(values) {
      try {
        axiosInstance.post(`http://localhost:8000/api/v1/sessions`, values).then(res => {
          console.log(res);
          if (res.statusText === 'OK') {
            message.success('You are successfully logged in!');
            localStorage.setItem('accessToken', res.data.token);
            navigate('/home');
          }
        })
      } catch (e) {
        console.log('Registration request error', e);
        return message.error('Something went wront!');
      }
    }
  })

  return (
    <LoginPageContainer>
      <PageTitle>Login</PageTitle>
      <PageSubtitle>
        Don't have account?<br />
        <Link to={'/registration'}>Register</Link>
      </PageSubtitle>

      <form onSubmit={form.handleSubmit}>
        <Form.Item
          validateStatus={form.errors.email ? 'error' : 'success'}
          help={form.errors.email}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
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

        <Form.Item>
          <LoginButton type='submit'>login</LoginButton>
        </Form.Item>
      </form>
    </LoginPageContainer>
  )
}
