import React, { Component } from 'react';

//Redux 
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
//Material UI
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

class Details extends Component {

    //ROUTE buttons handler
    backHome = () => {
        this.props.history.push('/');
    }
    edit = () => {
        this.props.history.push('/edit');
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
                <Button variant="contained" color="primary" onClick={this.edit}>Edit</Button>
                <br />
                <div>
                    <Grid container>
                        <Grid item xs={4}>
                            <img alt="" src={this.props.store.detailReducer.selected && this.props.store.detailReducer.selected[0] && this.props.store.detailReducer.selected[0].poster}></img>
                        </Grid>
                        <Grid item xs={7}>
                            <h1>{this.props.store.detailReducer.selected && this.props.store.detailReducer.selected[0] && this.props.store.detailReducer.selected[0].title}</h1>
                            <p>{this.props.store.detailReducer.selected && this.props.store.detailReducer.selected[0] && this.props.store.detailReducer.selected[0].description}</p>
                        </Grid>
                    </Grid>
                </div>
                <ul>
                    {itemArr}
                </ul>
            </div>
        );
    }
}



export default connect(mapStoreToProps)(Details);