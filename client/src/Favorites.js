import React from 'react';
import { Nav, Navbar, Button, Card, Alert} from 'react-bootstrap';
import { getFavs } from './services/userServices.js';

class Favorites extends React.Component{

	constructor(props){

		super(props);

		this.state = {
			favs: [],
			show: false
		}

	}

	componentDidMount() {

		getFavs()
			.then((favs)=>{
				//console.log(favs);
				this.setState({favs: favs});

			})


	}
	handleClose = () => this.setState({show:false});
 	
 	handleShow = () => this.setState({show:true});

	render(){

		return (

			<div className="Favorites">
			<Alert variant="danger" show={this.state.show} onClose={() => this.handleClose(false)} dismissible>
        	<Alert.Heading>Oh snap! You got an error!</Alert.Heading>
       			<p>
         			You must login/register to see favorites
       			</p>
       			<hr />
        		<div className="d-flex justify-content-end">
          			<Button onClick={() => this.handleClose(false)} variant="danger">
            			Close
          			</Button>
        		</div>
      		</Alert>
      	
      		{this.state.favs.map((fav,idx)=>(
      		
            <Card key={idx} style={{ width: '40rem' }}>
					<Card.Img variant="top" src={fav.image_url} />
					<Card.Body>
						<Card.Title>{fav.name}</Card.Title>
						<Button variant="primary" href={fav.url}>Learn More</Button>
					</Card.Body>
			</Card>
		
	    	))}

	    	</div>


		);


	}



}

export default Favorites