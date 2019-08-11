import React, { Component } from 'react';

class Interest extends Component {
	constructor(props){
		super(props);
		this.state = {
			
		};
	}
	
	render() {
		return (
			<div className='interest'>{this.props.name}</div>
		);
	}
}

export default Interest;