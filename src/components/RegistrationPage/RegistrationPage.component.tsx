import { useFormik } from 'formik';
import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  LoginPageContainer,
  PageTitle,
  PageSubtitle,
} from './RegistrationPage.styles';
import { LoginForm } from './RegistrationPage.types';
import { LoginPageValidationSchema } from './RegistrationPage.validation';
import {
  Form,
  Input,
  Button,
} from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

export const RegistrationPage = () => {
  const form = useFormik<LoginForm>({
    initialValues: {
      email: '',
      password: '',
    },

    validationSchema: LoginPageValidationSchema,
    validateOnChange: false,

    async onSubmit(values) {

    }
  })

  return (
    <LoginPageContainer>
      <PageTitle>Registration</PageTitle>

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
          <Button
            type="primary"
            htmlType='submit'
          >Submit</Button>
        </Form.Item>
      </form>
    </LoginPageContainer>
  )
}
