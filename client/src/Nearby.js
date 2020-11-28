import React from 'react';
import { getAllFavs, createFav, getEventsByCategory, getNearby} from './services/userServices.js';
import { withRouter,Link, Route, Switch, useHistory } from "react-router-dom";
import { Nav, Navbar, Button, Card, Alert, CardGroup} from 'react-bootstrap';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Marker, InfoWindow} from '@react-google-maps/api';
import './Nearby.css';
import geohash from 'ngeohash';


const containerStyle = {
  width: '100%',
  height: '100%',
  position: 'relative !important'
};

class Nearby extends React.Component{


	constructor(props){
		super(props);
		this.state = {
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


	}

	componentDidMount() {

		navigator.geolocation.getCurrentPosition((pos)=>{

			const crd = pos.coords;

		  	this.setState({geohash:geohash.encode(crd.latitude, crd.longitude)});
      		this.setState({lat:crd.latitude});
      		this.setState({lon:crd.longitude});

  			//console.log(this.state.geohash)
  			getNearby(geohash.encode(crd.latitude, crd.longitude))
  				.then((res)=>{
  					//console.log(res._embedded.events);
  					this.setState({events: [...res._embedded.events]})
  					//console.log(this.state.events.length)
  				});

		});

	}

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


	render(){

		return (

			<div className="Nearby">
		
				<div className="map_wrapper" style={{width: '100%',
													height: '500px',
													position: 'relative',
													marginTop: '100px'}}>
					<LoadScript
			          googleMapsApiKey="AIzaSyD9mF2T6XqkPZGHk3lbcVnirYQR1t-P2hE"
			        >
			          <GoogleMap
			            id = 'nr_map'
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
				<div className="nr_event_wrapper">
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
			</div>

		);

	}

}

export default Nearby;