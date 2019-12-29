import React, { Component } from 'react';
//Redux
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
//Material UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class Edit extends Component {
  //local state to track input
  state = {
    id: null,
    title: '',
    description: '',
  }
  //mounting selected id onto local state
  componentDidMount() {
    this.setState({
      id: this.props.store.detailReducer.selected[0].movies_id,
    })
    console.log(this.state.id);
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
  submitChange = (event, id) => {
    this.props.dispatch({
      type: 'SUBMIT',
      payload: {
        ...this.state, callBack: () => {
          console.log('go back');
          this.props.history.push('/details');
        }
      }
    })
  }

  //PAGE ROUTING
  backHome = () => {
    this.props.history.push('/');
  }
  details = () => {
    this.props.history.push('/details');
  }
  render() {

    const itemArr = this.props.store.detailReducer.selected && this.props.store.detailReducer.selected.map((item, index) => {
      return (
        <li key={index}>
          {item.name}
        </li>
      )
    })

    return (
      <div className="App">
        <Button variant="contained" color="primary" onClick={this.backHome}>Back Home</Button>
        <Button variant="contained" color="primary" onClick={this.details}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={this.submitChange}>Save</Button>
        <div>
          <div>
            New Title Value: {this.state.title}
          </div>
          <br></br>
          <div>
            New Descriptions: {this.state.description}
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
          {itemArr}
        </ul>

      </div>
    );
  }
}

export default connect(mapStoreToProps)(Edit);