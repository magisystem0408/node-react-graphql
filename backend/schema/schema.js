const graphql = require('graphql')
const {GraphQLSchema} = require("graphql");
const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLList,GraphQLNonNull} = graphql

const Movie = require('../models/movie')
const Director = require('../models/director')

const MovieType = new GraphQLObjectType({
    name: 'Movie',
//    取得したいデータ、その型を入力する
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        director: {
            type: DirectorType,
            resolve(parent, args) {
                return Director.findById(parent.directorId)
            }
        }
    })
})

const DirectorType = new GraphQLObjectType({
    name: 'Director',
//    取得したいデータ、その型を入力する
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        //one-to-many
        movies: {
            type: new GraphQLList(MovieType),
            //parentsにはDirecotrorの情報が入ってきてる
            resolve(parents, args) {
                return Movie.find({directorId: parents.id})
            }
        }
    })
})


//データ取得
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
        },
        director: {
            type: DirectorType,
            args: {id: {type: GraphQLString}},
            resolve(parent, args) {
                return Director.findById(args.id);
            }
        },
        //一覧取得
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                return Movie.find({})
            }
        },
        directors: {
            type: new GraphQLList(DirectorType),
            resolve(parent, args) {
                return Director.find({})
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
                directorId: {type: GraphQLID},
            },
            resolve(parent, args) {
                // インスタンスを生成
                let movie = new Movie({
                    name: args.name,
                    genre: args.genre,
                    directorId: args.directorId
                })
                // 受け取った値を代入
                return movie.save()
            }
        },
        addDirector: {
            type: DirectorType,
            //argsの型定義
            args: {
                name: {type: GraphQLString},
                age: {type: GraphQLInt}
            },
            resolve(parent, args) {
                let director = new Director({
                    name: args.name,
                    age: args.age,
                })
                return director.save()
            }
        },
        //    更新処理
        updateMovie: {
            type: MovieType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)},
                name: {type: GraphQLString},
                genre: {type: GraphQLString},
                directorId: {type: GraphQLInt}
            },
            resolve(parent, args) {
                let updateMovie = {}
                args.name && (updateMovie.name = args.name)
                args.genre && (updateMovie.genre = args.genre)
                args.directorId && (updateMovie.directorId = args.directorId)
                return Movie.findByIdAndUpdate(args.id, updateMovie, {new: true})
            }
        },
        updateDirector: {
            type: DirectorType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)},
                name: {type: GraphQLString},
                age: {type: GraphQLInt},
            },
            resolve(parent, args) {
                let updateDirector = {}
                args.name && (updateDirector.name = args.name)
                args.arg && (updateDirector.arg = args.arg)
                return Director.findByIdAndUpdate(args.id, updateDirector, {new: true})
            }
        },
        deleteMovie:{
            type:MovieType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args){
                return Movie.findByIdAndRemove(args.id)
            }
        },
        deleteDirector:{
            type:DirectorType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args){
                return Director.findByIdAndRemove(args.id)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})