const graphql = require('graphql')
const Movie = require('../models/movie')
const {GraphQLSchema} = require("graphql");
const {GraphQLObjectType, GraphQLID, GraphQLString} = graphql


const MovieType = new GraphQLObjectType({
    name: 'Movie',
//    取得したいデータ、その型を入力する
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
    })
})

// 外部から呼び出せるようにする

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        movie: {
            //検索するtype
            type: MovieType,
            //検索時に使用するパラメータ
            args: {id: {type: GraphQLString}},
            // データ取得の関数を指定

            //parent：受け取ったオブジェクト
            resolve(parents, args) {
                return Movie.findById(args.id)
            }
        }
    }
})


const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addMovie: {
            type: MovieType,
            args: {
                name: {type: GraphQLString},
                genre: {type: GraphQLString},
            },
            resolve(parent, args) {
                // インスタンスを生成
                let movie = new Movie({
                    name: args.name,
                    genre: args.genre,
                })
                // 受け取った値を代入
                return movie.save()
            }
        },
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})