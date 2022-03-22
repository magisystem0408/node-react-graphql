const express = require("express");
const {graphqlHTTP} = require('express-graphql')
const mongoose = require('mongoose')
const schema = require('./schema/schema')
const app = express()


//catchをやっていないためエラー出る。
mongoose.connect('mongodb+srv://admin:Mamushi3timi@cluster0.1pvuc.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.once('open', () => {
    console.log("db connected")
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(4000, () => {
    console.log("サーバーが立ち上がりました。")
})