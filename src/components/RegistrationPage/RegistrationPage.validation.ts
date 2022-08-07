import * as yup from 'yup';

export const LoginPageValidationSchema = yup
  .object()
  .required()
  .shape({
    email: yup
      .string()
      .email('this is not a valid email')
      .required('input your email'),
    password: yup
      .string()
      .min(8, 'minimal requirement - 8 symbols')
      .required('input your password')
  })