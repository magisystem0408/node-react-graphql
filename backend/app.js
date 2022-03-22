const express = require("express");
const {graphqlHTTP} = require('express-graphql')
const mongoose = require('mongoose')
const schema = require('./schema/schema')
const dotenv =require("dotenv")
const cors =require("cors")
const app = express()
dotenv.config({path:__dirname+"/.env"})


app.use(cors())
//catchをやっていないためエラー出る。
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.once('open', () => {
    console.log("データベースの接続が完了しました。")
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(4000, () => {
    console.log("サーバーが立ち上がりました。")
})