import React from 'react';
import { Modal, Button, Form} from 'react-bootstrap';

class MyCustomeModal extends React.Component {


	constructor(props){
		
		super(props);

		this.state={

			show:false,

			email:'',

			password: ''

		};

		// this.setState((setShow:false));
 
	}

	handleClose = () => this.setState({show:false});
 	
 	handleShow = () => this.setState({show:true});

 	handleChange = (event) =>{

 		this.setState({[event.target.type]:event.target.value})
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
        		this.props.setUser(this.state.email);
        		this.handleClose();

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
				  </Form.Group>
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