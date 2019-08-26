import React, { Component } from 'react';

class Error404 extends Component {
	constructor(props){
		super(props);
		this.state = {
			
		};
	}
	
	render() {
		console.log(this.props);
		return (
			<a href={this.props.url} target='_blank'>
				<img src={this.props.prefix + ',' + this.props.img} />
			</a>
		);
	}
}

export default Error404;