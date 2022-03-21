const graphql = require('graphql')

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
        movie:{
            //検索するtype
            type:MovieType,
            //検索時に使用するパラメータ
            args:{id:{type:GraphQLString}},
            // 取得したデータを表示する
            resolve(parents,args){

            }
        }
    }
})