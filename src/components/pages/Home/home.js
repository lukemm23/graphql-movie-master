import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import mapStoreToProps from '../../redux/mapStoreToProps';
//material UI
import Grid from '@material-ui/core/Grid';
//importing apollo and setup
import ApolloClient from 'apollo-boost';
import {  ApolloProvider } from 'react-apollo';
//importing gql
import {gql} from 'apollo-boost';
import {graphql} from 'react-apollo';

const client = new ApolloClient({
  url: 'HTTP://localhost:5000/graphql'
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
  // componentDidMount(){
  //   this.props.dispatch({
  //     type: 'SET_DETAILS',
  //     payload: this.props.data.movies,
  //   });
  // }

  
  //GET saga for movie list
  // componentDidMount() { // react Component method
  //   this.props.dispatch({
  //     type: 'GET_DETAILS',
  //   })
  // }

  //image click event 
  clickEvent(event, name) {
    // this.props.dispatch({
    //   type: 'GET_DETAIL',
    //   payload: name
    // })
    // console.log(name);
    this.props.history.push('/details');
  }

  //display movie list
  displayMovies(){
    const data = this.props.data;
    if(data.loading){
      return (<div>Loading Movies...</div>);
    }else{
      return data.movies.map((item, index) => {
        return (
          (<Grid item xs={3} justify="center" alignItems="center"
                key={item.id}
                onClick={(event) => this.clickEvent(event, item.name)}
              >
                <img alt="" src={item.poster}></img>
                <h4>{item.name}</h4>
              </Grid>)
        )
      })
    }
  }

  render() {
     // const buffer = {};
    // const moviesArr = this.props.store.detailReducer.items.map((item, index) => {
    //   if (buffer[item.movies_id] === undefined) {
    //     buffer[item.movies_id] = true;
    //     return (<Grid item xs={3} justify="center" alignItems="center"
    //       key={index}
    //       onClick={(event) => this.clickEvent(event, item.title)}
    //     >
    //       <img alt="" src={item.poster}></img>
    //       <h4>{item.title}</h4>
    //     </Grid>)
    //   } else { return null; }
    // })

    return (
      <ApolloProvider client={client}>
        <div>
          <Grid container spacing={3} direction="row">
            {this.displayMovies()}
          </Grid>
        </div>
        </ApolloProvider>
    );
  }
}

// export default connect(mapStoreToProps)(Home);
export default graphql(getMoviesQuery)(Home);