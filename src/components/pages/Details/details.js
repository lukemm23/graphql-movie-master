import React, { Component } from 'react';
//importing apollo and setup
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
//importing gql
import { graphql } from 'react-apollo';
//Material UI
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { gql } from 'apollo-boost';

const client = new ApolloClient({
    uri: 'HTTP://localhost:5000/graphql'
})

const getDetailQuery = gql`
    query movie($id:ID!){
    movie(id: $id){
            id
            name
            poster
            description
            genre {
                name
            }
        }
    }
  
  `

class Details extends Component {
    //ROUTE buttons handler
    backHome = () => {
        this.props.history.push('/');
    }
    edit = () => {
        this.props.history.push('/edit/' + this.props.data.movie.id);
    }

    displayGenre() {
        const data = this.props.data;
        if (data.loading) {
            return (<div>Loading Movies...</div>);
        } else {
            return data.movie.genre.map((item, index) =>{
                return (
                    <li key={index}>{item.name}</li>
                )
            })
        }
    }

    displayDetails() {
        const data = this.props.data;
        if (data.loading) {
            return (<div>Loading Movies...</div>);
        } else {
            return (<Grid container>
                <Grid item xs={4}>
                    <img alt="" src={data.movie.poster}></img>
                </Grid>
                <Grid item xs={7}>
                    <h1>{data.movie.name}</h1>
                    <p>{data.movie.description}</p>
                    <ul>
                        {this.displayGenre()}
                    </ul>
                </Grid>
            </Grid>

            )
        }
    }

    render() {
        return (
            <ApolloProvider client={client}>
                <div className="App">
                    <Button variant="contained" color="primary" onClick={this.backHome}>Back Home</Button>
                    <Button variant="contained" color="primary" onClick={this.edit}>Add Movie</Button>
                    <br />
                    <div>
                        {this.displayDetails()}
                    </div>
                    
                </div>
            </ApolloProvider>
        );
    }
}

export default graphql(getDetailQuery, {
    options: props => {
        return {
            variables: { id: props.match.params.id }
        }
    }
})(
    Details
);


