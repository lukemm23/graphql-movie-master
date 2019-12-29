import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
//material UI
import Grid from '@material-ui/core/Grid';

class Home extends Component {

  //GET saga for movie list
  componentDidMount() { // react Component method
    this.props.dispatch({
      type: 'GET_DETAILS',
    })
  }

  //image click event 
  clickEvent(event, title) {
    this.props.dispatch({
      type: 'GET_ITEM_DETAIL',
      payload: title
    })
    this.props.history.push('/details');
  }

  render() {
    const buffer = {};
    const moviesArr = this.props.store.detailReducer.items.map((item, index) => {
        if(buffer[item.movies_id] === undefined) {
          buffer[item.movies_id] = true;
          return (<Grid item xs={3} justify="center"  alignItems="center"
          key={index} 
          onClick={(event) => this.clickEvent(event, item.title)} 
          >
            <img alt="" src={item.poster}></img>
            <h4>{item.title}</h4>
          </Grid>)
        } else {return null;}
      })

    return (
      <div>
      <Grid container spacing={3} direction="row">
        {moviesArr}
      </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(Home);