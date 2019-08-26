import React, { Component } from 'react';

class SearchBar extends Component {
	constructor(props){
		super(props);
		this.state = {
			
		};
	}
	
	render() {
		return (
			<div className='fullsearchwrap'>
				<div className='searchbarwrap'>
					<div className='searchbar'>
						<input id='searchtext' type='text' name='search' placeholder='Find a club...' autoComplete='off' />
						<button className='bigbutton' id='searchbutton' onClick={this.search}>Search</button>
					</div>
				</div>
			</div>
		);
	}
}

export default SearchBar;