import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import Modal from './MyCustomeModal.js';
import { getPersonal } from './services/userServices.js';
import { withRouter,Link, Route, Switch, useHistory } from "react-router-dom";

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

  	route=(path)=>{

  		this.props.history.push(path)

  	}
  	render(){

  		return (

  			<Navbar bg="light" expand="lg"> 
        		<Navbar.Brand href="/">Ticket Around</Navbar.Brand>
        		<Nav className="mr-auto">
          			<Nav.Link onClick={this.route.bind(this,'/event/concert')}>Concert</Nav.Link>
          			<Nav.Link onClick={this.route.bind(this,'/event/sport')}>Sport</Nav.Link>
          			<Nav.Link onClick={this.route.bind(this,'/event/theatre')}>Theatre</Nav.Link>
          			<Nav.Link onClick={this.route.bind(this,'/favorites')}>Your Favorites</Nav.Link>
          			<Modal setUser ={this.modalCallback} />
        		</Nav>
        		<Navbar bg="light">
        			<Navbar.Brand>Hello {this.state.name} !!!</Navbar.Brand>
        		</Navbar>
      		</Navbar>


  		)
  	}

}

export default withRouter(MyNavBar);