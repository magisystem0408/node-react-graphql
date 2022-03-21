import React from 'react'
import {Card, CardBody, Table} from "reactstrap";


export const MovieList=()=>{
    return <Card>
        <CardBody>
            <Table>
                <thead>
                <tr>
                    <th>タイトル</th>
                    <th>ジャンル</th>
                    <th>監督</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th>タイトル</th>
                    <th>ジャンル</th>
                    <th>監督</th>
                </tr>
                </tbody>
            </Table>
        </CardBody>
    </Card>
}