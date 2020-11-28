import React from 'react';
import { Modal, Button, Form} from 'react-bootstrap';

class MyLoginModal extends React.Component {


	constructor(props){

		super(props);

		this.state = {
			show:false,
			email:'',
			password: '',
			wrong: false
		};



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

    	fetch('/login', requestOp)
        	.then((response) => {

        		if(response.status==401){
        			this.setState({wrong: true});

        		}
        		else{
        			this.props.setUser(this.state.email);
        			this.handleClose();
        			
        		}
        		
				
        	})


 	}

	render(){

		return (

			<div className="MyLoginModal">

				<Button variant="primary" onClick={this.handleShow} style={{marginLeft:'10px'}}>
        			Sign In
      			</Button>
      			<Modal show={this.state.show} onHide={this.handleClose} animation={true}>
	        		<Modal.Header closeButton>
	          			<Modal.Title>Login</Modal.Title>
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
      								Wrong Password
    							</Form.Text>
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

		);



	}



}

export default MyLoginModal;