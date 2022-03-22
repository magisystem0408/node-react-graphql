import React from 'react'
import { Button, Card, CardBody, Table } from 'reactstrap'
import { DELETE_MOVIE, MOVIE_LIST } from '../querires/querires'
import { useMutation, useQuery } from '@apollo/client'

export const MovieList = () => {
  const { loading, error, data } = useQuery(MOVIE_LIST)
  const [deleteMutation] = useMutation(DELETE_MOVIE, {
    refetchQueries: [{ query: MOVIE_LIST }],
    awaitRefetchQueries: true,
  })
  const handleDelete = (id) => {
    deleteMutation({ variables: { id } })
  }

  if (loading) {
    return <p>Loading...</p>
  } else if (error) {
    return <p>Error</p>
  } else {
    return (
      <Card>
        <CardBody>
          <Table hover>
            <thead>
              <tr>
                <th>タイトル</th>
                <th>ジャンル</th>
                <th colSpan='2'>監督</th>
              </tr>
            </thead>
            <tbody>
              {data.movies.map(({ id, name, genre, director }) => (
                <tr key={id}>
                  <td>{name}</td>
                  <td>{genre}</td>
                  <td>{director.name}</td>
                  <td>
                    <Button color='primary' onClick={() => handleDelete(id)}>
                      削除
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    )
  }
}
