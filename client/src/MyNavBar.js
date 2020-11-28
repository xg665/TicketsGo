import React from 'react';
import { Nav, Navbar, Button } from 'react-bootstrap';
import Modal from './MyCustomeModal.js';
import Login from './MyLoginModal.js';
import { getPersonal } from './services/userServices.js';
import { withRouter,Link, Route, Switch, useHistory } from "react-router-dom";

class MyNavBar extends React.Component{

	constructor(props) {

		super(props);

		this.state = {

			name: '',
      logged_in:false
		}

		console.log(this.state.name);

	}

	modalCallback= (name)=>{

    	this.setState({name:name});

      if(name===''){
        this.setState({logged_in:false});
      }
      else{

        this.setState({logged_in:true});

      }
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

    logout(){

      fetch('/logout', {method:'GET'})
        .then((res)=>{

          if(res.status==200){

            this.setState({name:''});

            this.setState({logged_in:false});

          }

        })

    }

  	render(){

  		return (

  			<Navbar bg="light" expand="lg" style={{position:'fixed',height:'100px',width:'100%',zIndex:'1' }}> 
        		<Navbar.Brand onClick={this.route.bind(this,'/public/home')}>Ticket Around</Navbar.Brand>
        		<Nav className="mr-auto">
          			<Nav.Link onClick={this.route.bind(this,'/public/event/concert')}>Concert</Nav.Link>
          			<Nav.Link onClick={this.route.bind(this,'/public/event/sport')}>Sport</Nav.Link>
          			<Nav.Link onClick={this.route.bind(this,'/public/event/theatre')}>Theatre</Nav.Link>
          			<Nav.Link onClick={this.route.bind(this,'/public/favorites')}>Your Favorites</Nav.Link>
          			<Modal setUser ={this.modalCallback} />
                {!this.state.logged_in && <Login setUser ={this.modalCallback} />}
                {this.state.logged_in && <Button variant="primary" onClick={this.logout.bind(this)} style={{marginLeft:'10px'}}>
                  Sign Out
                </Button>} 
        		</Nav>
        		<Navbar bg="light">
        			<Navbar.Brand>Hello {this.state.name} !!!</Navbar.Brand>
        		</Navbar>
      		</Navbar>


  		)
  	}

}

export default withRouter(MyNavBar);