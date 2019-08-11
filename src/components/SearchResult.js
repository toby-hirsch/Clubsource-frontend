import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SearchResult extends Component {
	constructor(props){
		super(props);
		this.state = {
			
		};
	}
	
	render() {
		return (
			<Link to={'clubs/' + this.props.username} className='resultlink'>
				<div className='fullresult'>
					<div className='resulthead'>
						<h1 className='resulttitle'>{this.props.name}</h1>
						<p className='taglist'>Tags: {this.props.tags.replace(/,/g, ', ')}</p>
					</div>
					
				</div>
			</Link>
		);
	}
}

export default SearchResult;