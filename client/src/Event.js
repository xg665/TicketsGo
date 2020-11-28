import React from 'react';
import { getAllFavs, createFav, getEventsByCategory} from './services/userServices.js';
import { withRouter,Link, Route, Switch, useHistory } from "react-router-dom";
import { Nav, Navbar, Button, Card, Alert} from 'react-bootstrap';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Marker, InfoWindow} from '@react-google-maps/api';
import './Event.css';
import geohash from 'ngeohash';

const containerStyle = {
  width: '100%',
  height: '100%',
  position: 'fixed !important'
};

// const center = {
//   lat: -3.745,
//   lng: -38.523
// };

class Event extends React.Component{


	constructor(props){
		super(props);
		this.state = {
			category:'',//props.match.params.category,
			events:[],
			selected:[],
			show:false,
      lat:'',
      lon:'',
      selected: false,
      selectedLat:null,
      selectedLon:null,
      eve:null
		};
		// console.log(props.match.params.category);
	}

	componentDidUpdate(prevProps) {
		//console.log(this.prevProps)
    	if (this.state.category !== this.props.match.params.category) {
      		this.setState({ category: this.props.match.params.category });
      		// console.log(this.state.category);
      		getEventsByCategory(this.props.match.params.category,this.state.geohash)
  				.then((res)=>{
  					//console.log(res._embedded.events);
  					this.setState({events: [...res._embedded.events]})
  					//console.log(this.state.events.length)
  				});
    	}

 	}

	componentDidMount() {


		
		navigator.geolocation.getCurrentPosition((pos)=>{

			const crd = pos.coords;

		  this.setState({geohash:geohash.encode(crd.latitude, crd.longitude)});
      this.setState({lat:crd.latitude});
      this.setState({lon:crd.longitude});

  			//console.log(this.state.geohash)
  			getEventsByCategory(this.state.category,geohash.encode(crd.latitude, crd.longitude))
  				.then((res)=>{
  					//console.log(res._embedded.events);
  					this.setState({events: [...res._embedded.events].filter((e)=>{

              if(e._embedded.venues[0].location){
               
                return true;
              }
              else{
                return false;
              }

            })})
  					
  				});


		});

  	}

  	add_fav_event(e,idx){


  		const event = this.state.events[idx];

  		const requestOp = {
	        method: 'POST',                                           //http post request when submitting form
	        headers: {'Content-Type': 'application/json'},
	        body: JSON.stringify({
	        	item_id: event.id,
	        	name: event.name,
	        	address: event._embedded.venues[0].address.line1,
	        	lat: event._embedded.venues[0].location.latitude,
	        	lon: event._embedded.venues[0].location.longitude,
	        	category: event.classifications[0].segment.name,
  				image_url:event.images[event.images.length-1].url,
  				url:event.url
	        })
    	};

    	fetch('/addfav', requestOp)
        	.then((response) => {
        		
        		console.log(response)

        		if(response.status==401){
        			this.handleShow();
        		}

        	})


  	}

  handleClose = () => this.setState({show:false});
 	
 	handleShow = () => this.setState({show:true});

  seeDetailEvent(e,eve,lat,lon){
    
    this.setState({eve:eve});
    this.setState({lat:lat});
    this.setState({lon:lon});
    this.setState({selectedLat:lat});
    this.setState({selectedLon:lon})
    this.setState({selected:true});
    

  }
  setSelectedEve(val){
    this.setState({selected: false});
  }

	render() {
		return (
		<div className="Event">
      <div className="event_wrapper">
    		<Alert variant="danger" show={this.state.show} onClose={() => this.handleClose(false)} dismissible>
            	<Alert.Heading>Oh snap! You got an error!</Alert.Heading>
           			<p>
             			You must login/register to add favorites
           			</p>
           			<hr />
            		<div className="d-flex justify-content-end">
              			<Button onClick={() => this.handleClose(false)} variant="danger">
                			Close
              			</Button>
            		</div>
          	</Alert>
          	
          	{this.state.events.map((eve,idx)=>(
          		
                <Card key={idx} style={{ width: '100%' }}>
    					<Card.Img variant="top" src={eve.images[eve.images.length-1].url} />
    					<Card.Body>
    						<Card.Title>{eve.name}</Card.Title>
    				
    						<Button variant="primary" href={eve.url}>Learn More</Button>
    						<Button variant="outline-dark" id="add_button" onClick={(e)=> this.add_fav_event(e,idx)} >Add to favorite</Button>
    					</Card.Body>
    			</Card>
    		
    	    ))}
      </div>    
      <div className="map_wrapper">
        <LoadScript
          googleMapsApiKey="AIzaSyD9mF2T6XqkPZGHk3lbcVnirYQR1t-P2hE"
        >
          <GoogleMap
            id = 'map'
            mapContainerStyle={containerStyle}
            center={{lat: this.state.lat,
                     lng: this.state.lon}}
            zoom={3}
          >
        
          {this.state.events.map((eve,idx)=>(
            
            <Marker
              onClick = {(e)=>this.seeDetailEvent(e,eve,+eve._embedded.venues[0].location.latitude,+eve._embedded.venues[0].location.longitude)}
              position = {{lat:eve._embedded.venues[0].location?+eve._embedded.venues[0].location.latitude:this.state.lat,lng:eve._embedded.venues[0].location?+eve._embedded.venues[0].location.longitude:this.state.lon}}           
            />

          ))}
          {this.state.selected && (
            <InfoWindow
              onCloseClick={() => {
                this.setSelectedEve();
              }}
              position={{
                lat: this.state.selectedLat,
                lng: this.state.selectedLon
              }}
            >
              <Card style={{ width: '15rem' }}>
                <Card.Img variant="top" src={this.state.eve.images[this.state.eve.images.length-1].url} />
                <Card.Body>
                  <Card.Title>{this.state.eve.name}</Card.Title>
            
                  <Button variant="primary" href={this.state.eve.url}>Learn More</Button>
                </Card.Body>
              </Card>
            </InfoWindow>
          )}
          
          
          
          </GoogleMap>
        </LoadScript>
      </div>

	  </div>
	    
      )

	}

}

export default Event;