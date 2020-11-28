import React from 'react';
import { Nav, Navbar, Button, Card, Alert, Form} from 'react-bootstrap';
import { getFavs, getEventsByPrefRmd, getPrefs } from './services/userServices.js';

class Favorites extends React.Component{

	constructor(props){

		super(props);

		this.state = {
			favs: [],
			show: false,
			prefs:[],
			rmd:[],
			sport:false,
			music:false,
			theatre:false
		}

	}

	componentDidMount() {

		getFavs()
			.then((favs)=>{
				//console.log(favs);
				if(favs){
					this.setState({favs: favs});
				}
				else{
					this.handleShow();
				}
			})
		getPrefs()
			.then((prefs)=>{
				console.log(prefs);
				this.setState({prefs:prefs});
				let pf = prefs.join('%2C');

				prefs.forEach((p)=>{

					if(p==='sport'){
						this.setState({sport:true})
					}

					if(p==='concert'){
						this.setState({music:true})
					}

					if(p==='theatre'){
						this.setState({theatre:true})
					}

				})
				
				if(pf.length!==0){
		
					getEventsByPrefRmd(pf)
						.then((res)=>{
							
							this.setState({rmd:[...res._embedded.events]});
							console.log(this.state.rmd)
						})
				}
				})
        

	}
	handleClose = () => this.setState({show:false});
 	
 	handleShow = () => this.setState({show:true});

 	handleChangeBox = (e)=> {

 		console.log(e);
 		e.target.checked = true;

 	}
	render(){

		let form;

		const musicCheck = this.state.music?<Form.Check 
				        custom
				        disabled
				        checked
				        type='checkbox'
				        onChange={this.handleChangeBox}
				        id={`music`}
				        label={`music`}
				      />:<Form.Check 
				        custom
				        disabled
				        type='checkbox'
				        onChange={this.handleChangeBox}
				        id={`music`}
				        label={`music`}
				      />

		const sportCheck = this.state.sport?<Form.Check 
				        custom
				        disabled
				        checked
				        type='checkbox'
				        onChange={this.handleChangeBox}
				        id={`sport`}
				        label={`sport`}
				      />:<Form.Check 
				        custom
				        disabled
				        type='checkbox'
				        onChange={this.handleChangeBox}
				        id={`sport`}
				        label={`sport`}
				      />

		const theaCheck = this.state.theatre?<Form.Check 
				        custom
				        disabled
				        checked
				        type='checkbox'
				        onChange={this.handleChangeBox}
				        id={`theatre`}
				        label={`theatre`}
				      />:<Form.Check 
				        custom
				        disabled
				        type='checkbox'
				        onChange={this.handleChangeBox}
				        id={`theatre`}
				        label={`theatre`}
				      />


		

		return (

			<div className="Favorites" style={{paddingTop:'100px',display:'flex',flexDirection:'row'}}>
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
      		<div className="fav_e_wrapper" style={{width:'65%'}}>
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
			<div className="rmd_wrapper" style={{width:'25%'}}>
			<p style={{fontSize:'25px',fontWeight:'bold'}}>You Might Like These From Your Preferences</p>
			{musicCheck}{sportCheck}{theaCheck}
			{this.state.rmd.map((e,idx)=>(

				<Card style={{ width: '100%' }}>
				<Card.Img variant="top" src={e.images[e.images.length-1].url} style={{ width: '100%',height:'150px' }} />
				<Card.Body>
					<Card.Title>{e.name}</Card.Title>
					<Button variant="primary" href={e.url}>Learn More</Button>
				</Card.Body>
				</Card>

			))}
			</div>
				
			

	    	</div>


		);


	}



}

export default Favorites