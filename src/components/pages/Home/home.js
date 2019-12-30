import React, { Component } from 'react';
//material UI
import Grid from '@material-ui/core/Grid';
//importing apollo and setup
import ApolloClient from 'apollo-boost';
import {  ApolloProvider } from 'react-apollo';
//importing gql
import {graphql} from 'react-apollo';
import { gql } from 'apollo-boost';

const client = new ApolloClient({
  uri: 'HTTP://localhost:5000/graphql'
})

const getMoviesQuery = gql`
{
  movies{
    id
    name
    poster
    description
    genreId
  }
}
`

class Home extends Component {
  
  //image click event 
  clickEvent = (event, item) => {
    console.log(item);
    this.props.history.push('/details/'+item.id);
  }
  
  //display movie list
  displayMovies(){
    const data = this.props.data;
    if(data.loading){
      return (<div>Loading Movies...</div>);
    }else{
      return data.movies.map((item, index) => {
        return (
          (<Grid item xs={3}
                key={item.id}
                onClick={(event) => this.clickEvent(event, item)}
              >
                <img alt="" src={item.poster}></img>
                <h4>{item.name}</h4>
              </Grid>)
        )
      })
    }
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <Grid container spacing={8} direction="row">
            {this.displayMovies()}
          </Grid>
        </div>
        </ApolloProvider>
    );
  }
}

export default graphql(getMoviesQuery)(Home);