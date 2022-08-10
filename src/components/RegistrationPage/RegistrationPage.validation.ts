import * as yup from 'yup';

export const LoginPageValidationSchema = yup
  .object()
  .required()
  .shape({
    name: yup
      .string()
      .required('input your name'),
    email: yup
      .string()
      .email('this is not a valid email')
      .required('input your email'),
    password: yup
      .string()
      .min(4, 'minimal requirement - 4 symbols')
      .required('input your password'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
  })