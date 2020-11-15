import React from 'react';
import logo from './logo.svg';
import './App.css';
import { getEventsByPref, createFav } from './services/userServices.js';
import Modal from './MyCustomeModal.js'
import { withRouter,Link, Route, Switch, useHistory } from "react-router-dom";
import { Nav, Navbar, Form, Button, Card} from 'react-bootstrap';

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
      pref:'KZFzniwnSyZfZ7v7nJ',
      events:[],
      name:''
    };
  }

  handleChange = (event) => {
    console.log(event.target.value)
    this.setState({

      pref: event.target.value


    });     
    getEventsByPref(event.target.value)
      .then((res)=>{
            console.log(this.state.pref);
            this.setState({events: [...res._embedded.events]})
            console.log(this.state.events)
          });     

  }

  componentDidMount() {

    getEventsByPref(this.state.pref)
      .then((res)=>{
            console.log(this.state.pref);
            this.setState({events: [...res._embedded.events]})
            console.log(this.state.events)
          });


  }

  // handleSubmit= (event)=>{                                        //src: https://pusher.com/tutorials/consume-restful-api-react

  //   event.preventDefault();
      
    
  // }



  render() {
    return (
      <div className="App">

      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Select Your Preference</Form.Label>
          <Form.Control as="select" onChange={this.handleChange} value={this.state.pref}>
            <option value="KZFzniwnSyZfZ7v7nJ">Music</option>
            <option value="KZFzniwnSyZfZ7v7nE">Sports</option>
            <option value="KZFzniwnSyZfZ7v7na">Theatre</option>
          </Form.Control>
        </Form.Group>
      </Form>
      {this.state.events.map((eve,idx)=>(
          
            <Card key={idx} style={{ width: '40rem' }}>
          <Card.Img variant="top" src={eve.images[eve.images.length-1].url} />
          <Card.Body>
            <Card.Title>{eve.name}</Card.Title>
        
            <Button variant="primary" href={eve.url}>Learn More</Button>
            
          </Card.Body>
      </Card>
    
      ))}
      </div>
    );
  }

}

const AppWithRouter = withRouter(App);
export default App;
