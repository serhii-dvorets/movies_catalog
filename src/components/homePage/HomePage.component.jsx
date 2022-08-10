import * as React from 'react';
import { useEffect } from 'react';
import { PageSubtitle, ActorInputContainer, MainContainer, MovieFormContainer, MovieListItem, MovieListHeader, MovieTitle, MovieInfoContainer, MovieInfoTitle, MovieInfoData, SearchButtonsContainer } from './HomePage.styles';
import { Button, Form, Input, message, Radio } from 'antd';
import { MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import { axiosInstance } from '../../axios/axiosInstance';
import { useState } from 'react';
import { MovieAddingValidationSchema } from './HomePage.validation';
import { useFormik } from 'formik';
import { Select, List } from 'antd';
import { LoginButton } from '../loginPage/LoginPage.styles';

export const HomePage = () => {
  const { Option } = Select;
  const [movies, setMovies] = useState([]);
  const [movieData, setMovieData] = useState(null);
  const [actors, setActors] = useState([]);
  const [title, setTitle] = useState('');
  const [actor, setActor] = useState('');

  const addMovie = async (values) => {
    try {
      axiosInstance.post(`${process.env.REACT_APP_API_BASEURL}/movies`, values).then(res => {
        console.log(res);
        if (res.statusText === 'OK') {
          message.success('Movie successfully created!');
          form.resetForm();
          setActors([]);
          getMovies();
        }
      })
    } catch (e) {
      console.log('Registration request error', e);
      return message.error('Something went wront!');
    }
  }

  const openFile = (event) => {
    let input = event.target;

    let reader = new FileReader();
    reader.onload = function () {
      let text = reader.result;
      const result = [];
      const json = reader.result.substring(0).split('\n')
      json.forEach(keyValue => {
        const split = keyValue.split(": ")
        const key = split[0]
        const value = split[1]

        result.push(value)
      })
      const sortedAArray = [];
      for (let i = 0; i < result.length - 1; i += 5) {
        const movieObj = {
          title: result[i],
          year: result[i + 1],
          format: result[i + 2],
          actor: result[i + 3],
        }

        addMovie(movieObj);
        sortedAArray.push(movieObj);
      }
    };

    reader.readAsText(input.files[0]);
  }

  const getMovies = (param = '', value = '') => {
    if (!param) {
      axiosInstance.get(`${process.env.REACT_APP_API_BASEURL}/movies`).then(res => {
        setMovies(res.data)
      })
    } else {
      axiosInstance.get(`${process.env.REACT_APP_API_BASEURL}/movies?${param}=${value}`).then(res => {
        setMovies(res.data)
      })
    }
  }


  const deleteMovie = (id) => {
    axiosInstance.delete(`${process.env.REACT_APP_API_BASEURL}/movies/${id}`).then(res => {
      if (res.statusText === 'OK') {
        message.success('Movie successfully deleted!');
      }
    })
  }

  const getMovieInfo = (id) => {
    axiosInstance.get(`${process.env.process.env.REACT_APP_API_BASEURL}/movies/${id}`).then(res => {
      setMovieData(res.data)
    })
  }

  useEffect(() => {
    getMovies()
  }, [])

  const form = useFormik({
    initialValues: {
      title: '',
      year: 0,
      format: 'VHS',
      actor: [],
    },

    validationSchema: MovieAddingValidationSchema,
    validateOnChange: false,

    async onSubmit(values) {
      values.actor = actors
      addMovie(values)
    }
  })

  const formItemLayout = {
    wrapperCol: {
      xs: { span: 4 },
      sm: { span: 24 },
    },
  };

  return (
    <>
      <MainContainer>
        <MovieFormContainer>

          <PageSubtitle>
            Add new movie
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
              rules={[
                {
                  validator: async (_, names) => {
                    if (!names || names.length < 2) {
                      return Promise.reject(new Error('At least 2 actors'));
                    }
                  },
                },
              ]}
            >
              {(fields, { add, remove }, { errors }) => (
                <>
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
        {movies && (
          <>
            <List
              style={{
                maxHeight: '50vh',
                overflow: 'scroll',
              }}
              header={<MovieListHeader>{'Movies'}</MovieListHeader>}
              bordered
            >
              {movies.map(movie => (
                <>
                  <MovieListItem key={movie.title}>
                    {<MovieTitle>{movie.title}</MovieTitle>}
                    <List.Item>
                      <Button
                        type='dashed'
                        onClick={() => {
                          getMovieInfo(movie.id)
                        }}
                      >
                        movie info
                      </Button>
                      <Button
                        type='primary'
                        onClick={() => {
                          deleteMovie(movie.id);
                          getMovies();
                        }}
                      >
                        delete movie
                      </Button>
                    </List.Item>
                  </MovieListItem>
                </>
              ))}
            </List>
          </>
        )}
        {movieData && (
          <>
            <MovieInfoContainer>
              <MovieListItem>
                <MovieInfoTitle>{'Title: '}</MovieInfoTitle>
                <MovieInfoData>{movieData.title}</MovieInfoData>
              </MovieListItem>
              <MovieListItem>
                <MovieInfoTitle>{'Year: '}</MovieInfoTitle>
                <MovieInfoData>{movieData.year}</MovieInfoData>
              </MovieListItem>
              <MovieListItem>
                <MovieInfoTitle>{'Format: '}</MovieInfoTitle>
                <MovieInfoData>{movieData.format}</MovieInfoData>
              </MovieListItem>
              <MovieListItem>
                <MovieInfoTitle>{'Actors: '}</MovieInfoTitle>
                <MovieInfoData>{movieData.actors}</MovieInfoData>
              </MovieListItem>

            </MovieInfoContainer>
          </>
        )}
      </MainContainer>
      <MainContainer>
        <SearchButtonsContainer>
          <Form.Item>
            <Radio.Group defaultValue="id" buttonStyle="solid" onChange={(e) => {
              getMovies('sort', e.target.value);
            }}>
              <Radio.Button value="id">initial order</Radio.Button>
              <Radio.Button value="title">sort by title</Radio.Button>
              <Radio.Button value="year">sort by year</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <ActorInputContainer>
            <Form.Item>
              <Input
                placeholder="Find by title"
                value={title}
                onChange={(e) => { setTitle(e.target.value) }}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type='primary'
                onClick={() => {
                  getMovies('title', title);
                  setTitle('');
                }}
              >
                Search
              </Button>
            </Form.Item>
          </ActorInputContainer>
          <ActorInputContainer>
            <Form.Item>
              <Input
                placeholder="Find by actor"
                value={actor}
                onChange={(e) => { setActor(e.target.value) }}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type='primary'
                onClick={() => {
                  getMovies('actor', actor);
                  setActor('');
                }}
              >
                Search
              </Button>
            </Form.Item>
          </ActorInputContainer>
          <input
            type="file"
            id='file'
            text='create movies list from file'
            onChange={(e) => {
              openFile(e);
            }} />
        </SearchButtonsContainer>
      </MainContainer>
    </>
  )
}
