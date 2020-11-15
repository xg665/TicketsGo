import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import Modal from './MyCustomeModal.js';
import { getPersonal } from './services/userServices.js';


class MyNavBar extends React.Component{

	constructor(props) {

		super(props);

		this.state = {

			name: ''
		}

		console.log(this.state.name);

	}

	modalCallback= (name)=>{

    	this.setState({name:name});
  	}
  	
  	componentDidMount() {

  		getPersonal()
      		.then((per) => {
        		console.log(per)
        		this.setState({name:per.email})
      		});



  	}
  	render(){

  		return (

  			<Navbar bg="light" expand="lg"> 
        		<Navbar.Brand href="/">Ticket Around</Navbar.Brand>
        		<Nav className="mr-auto">
          			<Nav.Link href="/event/concert">Concert</Nav.Link>
          			<Nav.Link href="/event/sport">Sport</Nav.Link>
          			<Nav.Link href="/event/theatre">Theatre</Nav.Link>
          			<Modal setUser ={this.modalCallback} />
        		</Nav>
        		<Navbar bg="light">
        			<Navbar.Brand>Hello {this.state.name} !!!</Navbar.Brand>
        		</Navbar>
      		</Navbar>


  		)
  	}

}

export default MyNavBar;