import React from 'react';
import { Modal, Button, Form} from 'react-bootstrap';
import Popup from 'react-popup';

class MyCustomeModal extends React.Component {


	constructor(props){
		
		super(props);

		this.state={

			show:false,

			email:'',

			password: '',

			wrong: false,

			sport: false,

			music: false,

			theatre:false

		};

		// this.setState((setShow:false));
 
	}

	handleClose = () => this.setState({show:false});
 	
 	handleShow = () => this.setState({show:true});

 	handleChange = (event) =>{

 		this.setState({[event.target.type]:event.target.value})
 	}

 	handleChangeBox =(e)=>{
 		console.log(this.state.sport,this.state.music,this.state.theatre)
 		this.setState({[e.target.id]:!this.state[e.target.id]})
 		console.log(this.state.sport,this.state.music,this.state.theatre)
 	}

 	handleSubmit = (event)=>{

 		event.preventDefault();

 		const requestOp = {
        method: 'POST',                                           //http post request when submitting form
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email:this.state.email, password: this.state.password})
    	};

    	fetch('/register', requestOp)
        	.then((response) => {

        		if(response.status==401){
        			this.setState({wrong: true});

        		}
        		else{
        			this.props.setUser(this.state.email);
        			this.handleClose();
        			const pref = [];
        			if(this.state.music){
        				pref.push('concert');
        			}
        			if(this.state.theatre){
        				pref.push('theatre');
        			}
        			if(this.state.sport){
        				pref.push('sport');
        			}
        			console.log(pref)
        			fetch('/addPreferences', {method:'POST',headers: {'Content-Type': 'application/json'},body: JSON.stringify({preferences:pref})})
        				.then((res)=>{
        					console.log(res.status);
        					this.setState({sport:false,music:false,theatre:false});
        				})
        		}
        		
				
        	})


 	}


	render(){

		return (
		<div className="MyCustomeModal">
			
			<Button variant="primary" onClick={this.handleShow}>
        		Register
      		</Button>

	      <Modal show={this.state.show} onHide={this.handleClose} animation={true}>
	        <Modal.Header closeButton>
	          <Modal.Title>Register</Modal.Title>
	        </Modal.Header>
	        <Modal.Body>
	        	<Form onSubmit={this.handleSubmit}>
				  <Form.Group controlId="formBasicEmail">
				    <Form.Label>Email address</Form.Label>
				    <Form.Control type="email" value={this.state.email} onChange={this.handleChange} placeholder="Enter email" />
				  </Form.Group>

				  <Form.Group controlId="formBasicPassword">
				    <Form.Label>Password</Form.Label>
				    <Form.Control type="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" />
				    <Form.Text className="text-muted" style={{display: this.state.wrong?'block':'none'}}>
      					Email Already Registered
    				</Form.Text>
				  </Form.Group>

				  Select All Your Preferences
				  <Form.Check 
				        custom
				        type='checkbox'
				        onChange={this.handleChangeBox}
				        value={this.state.sport}
				        id={`sport`}
				        label={`Sport`}
				      />
			      <Form.Check 
			        custom
			        type='checkbox'
			        onChange={this.handleChangeBox}
			        value={this.state.music}
			        id={`music`}
			        label={`Music`}
			      />
			      <Form.Check 
			        custom
			        type='checkbox'
			        onChange={this.handleChangeBox}
			        value={this.state.theatre}
			        id={`theatre`}
			        label={`Art&Theatre`}
			      />
				  

				  <Button variant="primary" type="submit">
				    Submit
				  </Button>
				</Form>

	        </Modal.Body>
	        <Modal.Footer>
	          <Button variant="secondary" onClick={this.handleClose}>
	            Close
	          </Button>
	        </Modal.Footer>
	      </Modal>
	    </div>



		)

	}




}

export default MyCustomeModal;