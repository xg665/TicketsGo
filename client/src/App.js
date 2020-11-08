import React from 'react';
import logo from './logo.svg';
import './App.css';
import { getAllFavs, createFav } from './services/userServices.js';
import { withRouter,Link, Route, Switch, useHistory } from "react-router-dom";

class App extends React.Component{
  
  
  constructor(props) {
    super(props);
    
    this.state = {
      data: {
      event_id:'',
      event_name: '',
      category:'',
      address:'',
      image_url:'',
      url:''
      },
      favorites:[]
    };
  }

  handleChange = (event) => {

    this.setState(prevState=>({                                 //src:https://medium.com/bb-tutorials-and-thoughts/how-to-develop-and-build-react-app-with-nodejs-bc06fa1c18f3

      data:{
        ...prevState.data,
        [event.target.name]: event.target.value                 //set state of changed values in the form
      }
    })

    );          

  }

  handleSubmit= (event)=>{                                        //src: https://pusher.com/tutorials/consume-restful-api-react

    event.preventDefault();
    const requestOp = {
        method: 'POST',                                           //http post request when submitting form
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(this.state.data)
    };

    fetch('/favorite', requestOp)
        .then(response => {response.json()})
        .then(data => {this.props.history.push('/Home');});       //routing to /home after response
    
  }


  render() {
    return (
      <div className="App">
                                                                  
      <form onSubmit={this.handleSubmit}>
        <label><span>Event Id:</span><input type="text" value={this.state.data.event_id} name="event_id" onChange={this.handleChange}/></label>
        <label><span>Event Name:</span><input type="text" value={this.state.data.event_name} name="event_name" onChange={this.handleChange}/></label>
        <label><span>Category:</span><input type="text" value={this.state.data.category} name="category" onChange={this.handleChange}/></label>
        <label><span>Address:</span><input type="text" value={this.state.data.address} name="address" onChange={this.handleChange}/></label>
        <label><span>Image Url:</span><input type="text" value={this.state.data.image_url} name="image_url" onChange={this.handleChange}/></label>
        <label><span>Event Url:</span><input type="text" value={this.state.data.url} name="url" onChange={this.handleChange}/></label>
        <input type="submit" value="Submit"/>
      </form>

      </div>
    );
  }

}

const AppWithRouter = withRouter(App);
export default App;
