import * as React from 'react';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  PageSubtitle,
  MainContainer,
  MovieFormContainer,
} from './UpdatePage.styles';
import { Form, Input, message } from 'antd';
import { axiosInstance } from '../../axios/axiosInstance';
import { useState } from 'react';
import { MovieAddingValidationSchema } from './UpdatePage.validation';
import { useFormik } from 'formik';
import { Select, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { LoginButton } from '../LoginPage/LoginPage.styles';
import 'react-confirm-alert/src/react-confirm-alert.css';

export const UpdatePage = () => {
  const navigate = useNavigate();
  const { Option } = Select;
  const [actors, setActors] = useState([]);

  const addMovie = async (values) => {
    try {
      axiosInstance.put(`${process.env.REACT_APP_API_BASEURL}/movies/${params.id}`, values).then(res => {
        console.log(res);
        if (res.statusText === 'OK') {
          form.resetForm();
          message.success(`Movie ${values.title} was successfully updated!`)
          setActors([]);
        }
      }).catch(e => message.error(e.response.data.message))
    } catch (e) {
      console.log('Registration request error', e);
      return message.error('Something went wront!');
    }
  }

  const getMovieInfo = (id) => {
    axiosInstance.get(`${process.env.REACT_APP_API_BASEURL}/movies/${id}`).then(res => {
      console.log(res);
      form.setFieldValue('title', res.data.title)
      form.setFieldValue('year', res.data.year)
      form.setFieldValue('format', res.data.format)
      setActors(res.data.actors.split(', '));
    }).catch(e => message.error(e.response.data.message))
  }

  const params = useParams();

  useEffect(() => {
    console.log(params.id)
    getMovieInfo(params.id)
  }, [])

  const form = useFormik({
    initialValues: {
      title: '',
      year: '',
      format: 'VHS',
      actor: [],
    },

    validationSchema: MovieAddingValidationSchema,
    validateOnChange: false,

    async onSubmit(values) {
      values.actor = actors
      addMovie(values);
    }
  })

  const formItemLayout = {
    wrapperCol: {
      xs: { span: 4 },
      sm: { span: 24 },
    },
  };

  return (
    <MainContainer>
      <Button type='primary' onClick={() => navigate('/home')}>home</Button>
      <MovieFormContainer>

        <PageSubtitle>
          Update the movie
        </PageSubtitle>

        <form onSubmit={form.handleSubmit}>
          <Form.Item
            validateStatus={form.errors.title ? 'error' : 'success'}
            help={form.errors.title}
            label="Title"
          >
            <Input
              placeholder="Title"
              name="title"
              value={form.values.title}
              onChange={form.handleChange}
            />
          </Form.Item>

          <Form.Item
            validateStatus={form.errors.year ? 'error' : 'success'}
            help={form.errors.year}
            label="Year"
          >
            <Input
              name="year"
              placeholder="Year"
              value={form.values.year === 0 ? '' : form.values.year}
              onChange={form.handleChange}
            />
          </Form.Item>

          <Form.Item
            validateStatus={form.errors.format ? 'error' : 'success'}
            help={form.errors.format}
            label="Format"
          >
            <Select
              defaultValue="VHS"
              style={{ width: 120 }}
              onChange={(event) => {
                form.setFieldValue("format", event)
              }}
            >
              <Option value="VHS">VHS</Option>
              <Option value="DVD">DVD</Option>
              <Option value="Blu-ray">Blu-ray</Option>
            </Select>
          </Form.Item>


          <Form.Item>
            <LoginButton type='submit'>add movie</LoginButton>
          </Form.Item>
        </form>
        <Form name="dynamic_form_item">
          <Form.List
            name="names"
          >
            {(fields, { add, remove }, { errors }) => (
              <>
                {actors.map(actor => (
                  <Form.Item>
                    <Input
                      placeholder="actor's name"
                      style={{ width: '60%' }}
                      value={actor}
                      onBlur={(e) => {
                        if (!e.currentTarget.value) {
                          return
                        }
                        const updatesActors = [...actors, e.currentTarget.value]
                        setActors(updatesActors)
                      }}
                    />
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      onClick={() => {
                        const index = actors.findIndex(item => item === actor)
                        const firtsPart = actors.slice(0, index);
                        const secondPart = actors.slice(index + 1, actors.length);
                        const updatedActors = [...firtsPart, ...secondPart]
                        setActors(updatedActors)
                      }}
                    />
                  </Form.Item>

                ))}
                {fields.map((field, _) => (
                  <Form.Item
                    {...formItemLayout}
                    label={'Actor'}
                    required={false}
                    key={field.key}
                  >
                    <Form.Item
                      {...field}
                      validateTrigger={['onChange', 'onBlur']}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: "Please input actor's name or delete this field.",
                        },
                      ]}
                      noStyle
                    >
                      <Input
                        placeholder="actor's name"
                        style={{ width: '60%' }}
                        value={`input${field.name}`}
                        onBlur={(e) => {
                          if (!e.currentTarget.value) {
                            return
                          }
                          const updatesActors = [...actors, e.currentTarget.value]
                          setActors(updatesActors)
                        }}
                      />
                    </Form.Item>
                    {fields.length > 1 ? (
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        onClick={() => {
                          remove(field.name)
                          const firtsPart = actors.slice(0, field.name);
                          const secondPart = actors.slice(field.name + 1, actors.length);
                          const updatedActors = [...firtsPart, ...secondPart]
                          setActors(updatedActors)
                        }}
                      />
                    ) : null}
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    style={{ width: '60%' }}
                    icon={<PlusOutlined />}
                  >
                    Add actor
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>

        </Form>
      </MovieFormContainer>
    </MainContainer>
  )
}
