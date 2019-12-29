import React, { Component } from 'react';
//importing apollo and setup
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
//importing gql
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

//Material UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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

class Edit extends Component {
  //local state to track input
  state = {
    name:'',
    poster:'',
    description:'',
    genreId:'',
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

  //event handlers for input text fields
  onInputChange = (event, inputKey) => {
    console.log(this.state.id);
    this.setState({
      [inputKey]: event.target.value
    });
    console.log(this.state);
  }

  //submit handler to save inputs into database
  // submitChange = (event, id) => {
  //   this.props.dispatch({
  //     type: 'SUBMIT',
  //     payload: {
  //       ...this.state, callBack: () => {
  //         console.log('go back');
  //         this.props.history.push('/details');
  //       }
  //     }
  //   })
  // }

  //PAGE ROUTING
  backHome = () => {
    this.props.history.push('/');
  }
  details = () => {
    this.props.history.push('/details/'+this.props.data.movie.id);
  }
  render() {
    return (
      <ApolloProvider clent={client}>
      <div className="App">
        <Button variant="contained" color="primary" onClick={this.backHome}>Back Home</Button>
        <Button variant="contained" color="primary" onClick={this.details}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={this.submitChange}>Save</Button>
        <div>
          <div>
            New Title Value:
            {this.state.title}
          </div>
          <br></br>
          <div>
            New Descriptions:
            {this.state.description}
          </div>
          <h4>Input Title and Description</h4>
          <TextField
            id="outlined-basic"
            label="title"
            variant="filled"
            onChange={(event) => this.onInputChange(event, 'title')}
            color="default" />

          <TextField
            id="outlined-multiline-static"
            label="description"
            variant="filled"
            rows="4"
            multiline
            onChange={(event) => this.onInputChange(event, 'description')}
            color="default" />

        </div>
        <ul>
          {this.displayGenre()}
        </ul>

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
  Edit
);