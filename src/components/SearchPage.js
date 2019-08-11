import React, { Component } from 'react';
import '../search.css';
import { Link } from 'react-router-dom';
import SearchResult from './SearchResult';
import Searching from './Searching';
import qs from 'qs';



/*
TODO: When this component is called:
	*If there is a query string...
		*Parse it
		*Query the /searchData API with the query string data
		*Sort and present SearchItem components
	*If there isn't a query string, query the /searchData API for the user's default preferences
			*If they exist (the user is logged in and has configured his preferences), sort and present SearchItem components
			*If they don't exist, display a message with a link telling them to configure their preferences or put in a search


*/


class SearchPage extends Component {
	constructor(props){
		super(props);
		this.state = {
			searchtext: '',
			clubs: [],
			searching: '',
			url: window.location.protocol + '//' + (window.location.hostname==='localhost' ? 'localhost:3000' : window.location.hostname),
		};
	}
	
	async componentDidMount() {
		var query = this.props.location.search;
		console.log('query string: ' + query);
		if (query != '') {
			let search = this.props.location.search.substring(1).split('search=');
			search.shift();
			console.log(search[0]);
			
			await this.setState({searchtext: search[0].replace(/_/g, ' ')});
		}
		this.search();
	}
	
	processKeyPress(event){
		if (event.key == 'Enter')
			this.search();
	}
	
	async search() {
		this.setState({clubs: []});
		this.setState({searching: <Searching />});
		console.log('qs stringification: ' + qs.stringify({search: this.state.searchtext}));
		if (this.state.searchtext !== ''){
			let search = qs.stringify({search: this.state.searchtext});
			await this.props.history.push('?' + search);
			console.log('query string: ' + search);
			//search = search.substring(1).toLowerCase().replace(/ /g, '_');
			console.log('searching for ' + search);
			const res = await fetch(this.state.url + '/searchData/search/' + search);
			const clubres = await res.json();
			this.setState({clubs: clubres.map((val) => <SearchResult {...val} key={val.username}/>), searching: ''});
			//TODO: create error handling so that this doesn't break if someone types a poorly formatted query string
			//TODO: have this query to find the appropriate ads to render
		}
		else {
			const res = await fetch(this.state.url + '/searchData/getdefault');
			const data = await res.json();
			console.log(data);
			this.setState({clubs: data.map((val) => <SearchResult {...val} key={val.username}/>), searching: ''});
		}
			
	}
	
	updateSearchText(event){
		if (event.target.value[event.target.value.length - 1] !== '_')
			this.setState({
				searchtext: event.target.value
			});
	}
	
	render() {
		return (
			<div>
				<h1 className='title'>Find Clubs</h1>
				<div className='fullsearchwrap'>
					<div className='searchbarwrap'>
						<div className='searchbar' onKeyPress={event => this.processKeyPress(event)}>
							<input id='searchtext' 
								type='text' 
								name='search' 
								placeholder='Find a club...' 
								autoComplete='off' 
								onChange={event => this.updateSearchText(event)} 
								value={this.state.searchtext} />
							<button className='bigbutton' id='searchbutton' onClick={() => this.search()}>Search</button>
						</div>
					</div>
				</div>
				<div className='container-fluid'>
					<div className='row'>
						<div className='col sidead'>
							Left Ad
						</div>
						
						<div className='col'>
							
							{this.state.searching}
							{this.state.clubs}
							
						</div>
						
						<div className='col sidead'>
							Right Ad
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default SearchPage;