import React, { Component } from 'react';
import Navbar from './Navbar';

class Error404 extends Component {
	constructor(props){
		super(props);
		this.state = {
			
		};
	}
	
	render() {
		return (
			<div>
				<h1 className='title'>Page not found</h1>
			</div>
		);
	}
}

export default Error404;