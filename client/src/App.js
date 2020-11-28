import React from 'react';
import './App.css';
import logo from './events-page-background.jpg';
import { getEventsByPref, createFav } from './services/userServices.js';
import Modal from './MyCustomeModal.js'
import { withRouter,Link, Route, Switch, useHistory } from "react-router-dom";
import { Nav, Navbar, Form, Button, Card, ListGroup,CardGroup} from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';

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

  route=(path)=>{

      this.props.history.push(path)

  }


  render() {
    return (
      <div className="App">
      <div className="Carousel">
        <p style={{fontFamily:'fantasy',fontSize:'150px',color:'#101b66',position:'absolute',left:'15%'}}>
          Ticket 
          <br/>Around
        </p>

        <Button variant="dark" size="lg" style={{position:'absolute',top:'65%',left:'70%'}} onClick={this.route.bind(this,'/public/nearby')}>Explore Nearby</Button>
      </div>
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

     
      <CardGroup className="cardContainer">
      {this.state.events.map((eve,idx)=>(
          
            <Card key={idx} style={{padding:'10px'}}>
          <Card.Img variant="top" src={eve.images[eve.images.length-1].url} style={{height:'250px'}} />
          <Card.Body>
            <Card.Title>{eve.name}</Card.Title>
        
            <Button variant="primary" href={eve.url}>Learn More</Button>
            
          </Card.Body>
      </Card>
    
      ))}
      </CardGroup>

      </div>
    );
  }

}

const AppWithRouter = withRouter(App);
export default AppWithRouter;
