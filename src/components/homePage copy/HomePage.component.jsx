import * as React from 'react';
import { useEffect } from 'react';
import {
  PageSubtitle,
  ActorInputContainer,
  MainContainer,
  MovieFormContainer,
  MovieListItem,
  MovieListHeader,
  MovieTitle,
  MovieInfoContainer,
  MovieInfoTitle,
  MovieInfoData,
  SearchButtonsContainer,
  FileInputContainer
} from './HomePage.styles';
import { Button, Form, Input, message, Radio } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { axiosInstance } from '../../axios/axiosInstance';
import { useState } from 'react';
import { MovieAddingValidationSchema } from './HomePage.validation';
import { useFormik } from 'formik';
import { Select, List } from 'antd';
import { LoginButton } from '../LoginPage/LoginPage.styles';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export const HomePage = () => {
  const { Option } = Select;
  const [movies, setMovies] = useState([]);
  const [movieData, setMovieData] = useState(null);
  const [actors, setActors] = useState([]);
  const [title, setTitle] = useState('');
  const [actor, setActor] = useState('');
  const [moviesFromFile, setMoviesFromFile] = useState([]);

  const confirmOnDelete = (id, title) => {
    confirmAlert({
      title: 'Warning!',
      message: 'You are really want to delete this movie?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            deleteMovie(id, title);
            getMovies();
            setTimeout(() => {countMovies(title)}, 1000)
          }
        },
        {
          label: 'No',
          onClick: () => message.info('Deleting cancelled')
        }
      ]
    });
  };

  const addMovie = async (values) => {
    try {
      axiosInstance.post(`${process.env.REACT_APP_API_BASEURL}/movies`, values).then(res => {
        console.log(res);
        if (res.statusText === 'OK') {
          form.resetForm();
          setActors([]);
          getMovies();
        }
      }).catch(e => message.error(e.response.data.message))
    } catch (e) {
      console.log('Registration request error', e);
      return message.error('Something went wront!');
    }
  }

  const createMoviesFromFile = () => {
    if (moviesFromFile.length === 0) {
      return message.error('file wasn\'t downloaded');
    }
    moviesFromFile.map(movie => addMovie(movie));
    setTimeout(() => {
      countMovies();
      setMoviesFromFile([]);
    }, 2000)
  }

  const openFile = (event) => {
    let input = event.target;
    if (input.files[0].type !== 'text/plain') {
      message.error('wrong file type')
    }

    let reader = new FileReader();
    reader.onload = function () {
      const result = [];
      const json = reader.result.substring(0).split('\n')
      console.log(typeof json)
      json.forEach(keyValue => {
        const split = keyValue.split(": ")
        const value = split[1]

        result.push(value)
      })
      const moviesFromFile = [];
      for (let i = 0; i < result.length - 1; i += 5) {
        if (result[i]) {
          const movieObj = {
            title: result[i],
            year: result[i + 1],
            format: result[i + 2],
            actor: result[i + 3],
          }
          moviesFromFile.push(movieObj);
        }
        setMoviesFromFile(moviesFromFile);
      }
    }
    reader.readAsText(input.files[0]);
  }

  const getMovies = (param = '', value = '') => {
    if (!param) {
      axiosInstance.get(`${process.env.REACT_APP_API_BASEURL}/movies`).then(res => {
        setMovies(res.data)
      }).catch(e => message.error(e.response.data.message))
    } else {
      axiosInstance.get(`${process.env.REACT_APP_API_BASEURL}/movies?${param}=${value}`).then(res => {
        setMovies(res.data)
      }).catch(e => message.error(e.response.data.message))
    }
  }

  const countMovies = (title) => {
    const initialNumberOfMovies = movies.length;
    axiosInstance.get(`${process.env.REACT_APP_API_BASEURL}/count`).then(res => {
      if (initialNumberOfMovies > res.data.number) {
        return message.info(`Movie ${title} was successfully deleted`)
      } else {
        const newMovies = res.data.number - initialNumberOfMovies;
        console.log(newMovies)
        return message.info(`${(newMovies === 1)
          ? `Movie ${title} was successfully created`
          : `${newMovies} movies were successfully added`}`)
      }
    }).catch(e => message.error(e.response.data.message))
  }

  const deleteMovie = (id, title) => {
    axiosInstance.delete(`${process.env.REACT_APP_API_BASEURL}/movies/${id}`).then(res => {
      console.log(res)
    }).catch(e => message.error(e.response.data.message))
  }

  const getMovieInfo = (id) => {
    axiosInstance.get(`${process.env.REACT_APP_API_BASEURL}/movies/${id}`).then(res => {
      setMovieData(res.data)
    }).catch(e => message.error(e.response.data.message))
  }

  useEffect(() => {
    const initialDownload = async () => {
      await getMovies()
    };
    initialDownload();
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
      addMovie(values);
      setTimeout(() => { countMovies(values.title) }, 1000)
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
                    <List.Item key={movie.title}>
                      <Button
                        type='dashed'
                        onClick={() => {
                          getMovieInfo(movie.id)
                        }}
                      >
                        movie info
                      </Button>
                      <div className='container'>

                        <Button
                          type='primary'
                          onClick={() => confirmOnDelete(movie.id, movie.title)}
                        >
                          delete movie
                        </Button>
                      </div>

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
          <FileInputContainer>
            <input
              type="file"
              id='file'
              accept='.txt'
              onChange={(e) => {
                openFile(e);
              }} />
            <Button type='primary' onClick={createMoviesFromFile}>load</Button>
          </FileInputContainer>
        </SearchButtonsContainer>
      </MainContainer>
    </>
  )
}
