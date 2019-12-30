import React, { Component } from 'react';
//importing apollo and setup
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

//importing gql
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import compose from 'lodash.flowright';
//Material UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

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
const addMovieMutation = gql`
  mutation($name:String!, $poster:String!, $description:String!, $genreId:[ID]!){
    addMovie(name:$name, poster:$poster, description:$description, genreId:$genreId){
      id
      name
      poster
      description
      genreId
    }
  }
`

class Edit extends Component {
  //local state to track input
  state = {
    name: '',
    poster: '',
    description: '',
    genreId: '',
  }

  //event handlers for input text fields
  onInputChange = (event, inputKey) => {
    this.setState({
      [inputKey]: event.target.value
    });
  }

  // submit handler to save inputs into database
  submitChange = async(event, id) => {
    event.preventDefault();
    console.log(this.state);
    await this.props.addMovieMutation({
      variables:{
        name: this.state.name,
        poster: this.state.poster,
        description: this.state.description,
        genreId: this.state.genreId
      },
      refetchQueries: [{query: getMoviesQuery}]
    });
    this.props.history.push('/');
  }


  //PAGE ROUTING
  backHome = () => {
    this.props.history.push('/');
  }
  details = () => {
    this.props.history.push('/details/' + this.props.match.params.id);
  }
  render() {
    return (
      <ApolloProvider clent={client}>
        <div className="App">
          <Button variant="contained" color="primary" onClick={this.backHome}>Back Home</Button>
          <Button variant="contained" color="primary" onClick={this.details}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={this.submitChange}>Add Movie</Button>
          <div>
            <div>New Title Value: {this.state.name}</div>
            <br></br>
            <div>New Descriptions: {this.state.description}</div>
            <h4>Input Title and Description</h4>
            <TextField
              id="outlined-basic"
              label="Title"
              variant="filled"
              onChange={(event) => this.onInputChange(event, 'name')}
              color="default" />

            <TextField
              id="outlined-basic"
              label="Poster"
              variant="filled"
              onChange={(event) => this.onInputChange(event, 'poster')}
              color="default" />

            <TextField
              id="outlined-multiline-static"
              label="description"
              variant="filled"
              rows="4"
              multiline
              onChange={(event) => this.onInputChange(event, 'description')}
              color="default" />
            <br />
            <FormControl variant="outlined" onSubmit={this.submitChange}>
              <InputLabel value="Genre">Genre</InputLabel>
              <br />
              <Select
                variant="outlined"
                label="Genre"
                onChange={(event) => this.setState({ genreId: event.target.value })}>
                <MenuItem value="5e07cfb2d3740d6065bf7035">Adventure</MenuItem>
                <MenuItem value="5e07cfbcd3740d6065bf7036">Animated</MenuItem>
                <MenuItem value="5e07cfccd3740d6065bf7037">Biographical</MenuItem>
                <MenuItem value="5e07d03be2328960d2ab16a0">Comedy</MenuItem>
                <MenuItem value="5e07d092e2328960d2ab16a1">Disaster</MenuItem>
                <MenuItem value="5e07d099e2328960d2ab16a2">Drama</MenuItem>
                <MenuItem value="5e07d0a2e2328960d2ab16a3">Epic</MenuItem>
                <MenuItem value="5e07d0aae2328960d2ab16a4">Fantasy</MenuItem>
                <MenuItem value="5e07d0b3e2328960d2ab16a5">Musical</MenuItem>
                <MenuItem value="5e07d0c0e2328960d2ab16a6">Romance</MenuItem>
                <MenuItem value="5e07d0cfe2328960d2ab16a7">Science Fiction</MenuItem>
                <MenuItem value="5e07d0dce2328960d2ab16a8">Superhero</MenuItem>
              </Select>
            </FormControl>
            <br />
          </div>
        </div>
      </ApolloProvider>
    );
  }
}

export default compose(
  graphql(getDetailQuery, {name: "getDetailQuery"}),
  graphql(addMovieMutation, {name: "addMovieMutation"})
)(Edit);