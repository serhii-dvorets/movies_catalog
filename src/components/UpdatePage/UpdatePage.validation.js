import * as yup from 'yup';

export const MovieAddingValidationSchema = yup
  .object()
  .required()
  .shape({
    title: yup
      .string()
      .required('Enter a title'),
    year: yup
      .number()
      .min(1900)
      .max(2022)
      .required('Enter a year'),
    format: yup
      .string()
      .required('Choose a format'),
  })