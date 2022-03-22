import React from 'react'
import { Button, Card, CardBody, CardHeader, Form, FormGroup } from 'reactstrap'
import { useMutation, useQuery } from '@apollo/client'
import {
  ADD_DIRECTOR,
  ADD_MOVIE,
  DIRECTOR_LIST,
  MOVIE_LIST,
} from '../querires/querires'
import { useForm } from 'react-hook-form'

export const SideNav = () => {
  const { data } = useQuery(DIRECTOR_LIST)
  const { register, handleSubmit, error } = useForm()
  const {
    register: registerDirector,
    handleSubmit: handleSubmitDirector,
    error: errorDirector,
  } = useForm()
  const [addMovie] = useMutation(ADD_MOVIE, {
    refetchQueries: [{ query: MOVIE_LIST }],
    awaitRefetchQueries: true,
  })
  const [addDirector] = useMutation(ADD_DIRECTOR, {
    refetchQueries: [{ query: DIRECTOR_LIST }],
    awaitRefetchQueries: true,
  })
  const onSubmit = ({ movieName, movieGenre, directorId }, e) => {
    addMovie({
      variables: { name: movieName, genre: movieGenre, directorId: directorId },
    })
    // フォームのリセット
    e.target.reset()
  }

  const onSubmitDirector = ({ directorName, directorAge }, e) => {
    const IntAge = parseInt(directorAge)
    addDirector({ variables: { name: directorName, age: IntAge } })
    //リセット処理
    e.target.reset()
  }
  return (
    <div>
      <Card>
        <CardHeader>映画監督</CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmitDirector(onSubmitDirector)}>
            <FormGroup>
              <input
                className='form-control'
                type='text'
                name='directorName'
                placeholder='監督名'
                {...registerDirector('directorName')}
              />
            </FormGroup>
            <FormGroup>
              <input
                className='form-control'
                type='number'
                name='directorAge'
                placeholder='年齢'
                {...registerDirector('directorAge')}
              />
            </FormGroup>
            <Button color='primary' type='submit'>
              追加
            </Button>
          </Form>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>映画作品</CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <input
                className='form-control'
                type='text'
                name='movieName'
                placeholder='タイトル'
                {...register('movieName')}
              />
            </FormGroup>
            <FormGroup>
              <input
                className='form-control'
                type='text'
                name='movieGenre'
                placeholder='ジャンル'
                {...register('movieGenre')}
              />
            </FormGroup>
            <FormGroup>
              <select
                className='form-control'
                type='select'
                name='directorId'
                {...register('directorId')}
              >
                {data &&
                  data.directors.map(({ id, name }) => {
                    console.log(name, id)
                    return (
                      <option value={id} key={id}>
                        {name}
                      </option>
                    )
                  })}
              </select>
            </FormGroup>
            <Button color='primary' type='submit'>
              追加
            </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  )
}
