//importing graphql
const graphql = require('graphql');

//importing mongoose models
const Movie = require('../models/movie');
const Genre = require('../models/genre');

//pulling out graphql tools
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
} = graphql;

//data object types
const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        poster: { type: GraphQLString },
        description: { type: GraphQLString },
        genreId: { type: new GraphQLList(GraphQLID) },
        genre: {
            type: new GraphQLList(GenreType),
            resolve(parent, args) {
                //filter thru genres and match parent.genreId to given genre Id
                // return _.filter(genres, genre=>parent.genreId.includes(genre.id));
                return Genre.find({_id: parent.genreId});
            }
        },
    })
});

const GenreType = new GraphQLObjectType({
    name: 'Genre',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args){
                //filter thru movies and movies.genreId include parent.id(genreId) with given genre Id 
                // return _.filter(movies, movie=>movie.genreId.includes(parent.id));
                return Movie.find({genreId: parent.id});
            }
        }
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        movie: {
            type: MovieType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //code to get data from DB / other source
                // return _.find(movies, { id: args.id });
                return Movie.findById(args.id);
            }
        },
        genre: {
            type: GenreType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //code to get data from DB / other source
                // return _.find(genres, { id: args.id });
                return Genre.findById(args.id);
            }
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve : (parent, args) => {
                // return movies;
                return Movie.find({});
            }
        },
        genres: {
            type: new GraphQLList(GenreType),
            resolve : (parent, args) => {
                // return genres;
                return Genre.find({});
            }
        },
    }
});


const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addGenre:{
            type: GenreType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) }
            }, 
            resolve(parent, args){
                let genre = new Genre({
                    name: args.name
                });
                return genre.save();
            }
        },
        addMovie:{
            type: MovieType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                poster: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                genreId: { type: new GraphQLNonNull(GraphQLList(GraphQLID)) },
            }, 
            resolve(parent, args){
                console.log(args.genreId);
                let movie = new Movie({
                    name: args.name,
                    poster: args.poster,
                    description: args.description,
                    genreId: args.genreId
                });
                return movie.save();
            }
        },
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});