import React from 'react';
import { getAllFavs, createFav, getEventsByCategory} from './services/userServices.js';
import { withRouter,Link, Route, Switch, useHistory } from "react-router-dom";
import { Nav, Navbar, Button, Card, Alert} from 'react-bootstrap';
import './Event.css';
import geohash from 'ngeohash';

class Event extends React.Component{


	constructor(props){
		super(props);
		this.state = {
			category:'',//props.match.params.category,
			events:[],
			selected:[],
			show:false
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
  					console.log(res._embedded.events);
  					this.setState({events: [...res._embedded.events]})
  					console.log(this.state.events.length)
  				});
    	}

 	}

	componentDidMount() {


		
		//navigator.geolocation.getCurrentPosition((pos)=>{

			//const crd = pos.coords;

			//this.setState({geohash:geohash.encode(crd.latitude, crd.longitude)})
  			//console.log(this.state.geohash)
  			getEventsByCategory(this.state.category,this.state.geohash)
  				.then((res)=>{
  					console.log(res._embedded.events);
  					this.setState({events: [...res._embedded.events]})
  					console.log(this.state.events.length)
  				});

		//});

  	}

  	add_fav_event(e,idx){

  		// e.prevent
  		// console.log(this.state.selected)

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


	render() {
		return (
		<div className="Event">
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
      		
            <Card key={idx} style={{ width: '40rem' }}>
					<Card.Img variant="top" src={eve.images[eve.images.length-1].url} />
					<Card.Body>
						<Card.Title>{eve.name}</Card.Title>
				
						<Button variant="primary" href={eve.url}>Learn More</Button>
						<Button variant="outline-dark" id="add_button" onClick={(e)=> this.add_fav_event(e,idx)} >Add to favorite</Button>
					</Card.Body>
			</Card>
		
	    ))}

	    </div>
	    
      )

	}

}

export default Event;