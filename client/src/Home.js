import React from 'react';
import { getAllFavs, createFav } from './services/userServices.js';

class Home extends React.Component{

	constructor(props) {
    	
    	super(props);

    	this.state = {
    		favorites:[]
    	}
	}
	componentDidMount() {

    	getAllFavs()
      		.then((favs) => {
        		console.log(favs)
        		this.setState({favorites: favs})
      		});

  	}
	render(){

		return (
	      <div className="Home">
	      <table>
	        <tbody>
	          {this.state.favorites.map((fav,idx)=>(
	            <tr key={idx}>
	              <td>{fav.item_id}</td>
	              <td>{fav.name}</td>
	              <td>{fav.address}</td>
	              <td>{fav.category}</td>
	              <td>{fav.image_url}</td>
	              <td>{fav.url}</td>
	            </tr>
	          ))}
	        </tbody>

	      </table>

	      <button onClick={(e)=> this.props.history.push('/')}>Back</button>
	      </div>
	      )
	}

}

export default Home;