import React, { Component } from 'react';
import '../search.css';
import { Link } from 'react-router-dom';
import SearchResult from './SearchResult';
import Searching from './Searching';
import qs from 'qs';
import handleErrors from '../error-handler';
import Ad from './Ad';

class SearchPage extends Component {
	constructor(props){
		super(props);
		this.state = {
			searchtext: '',
			clubs: [],
			searching: '',
			status: '',
			url: window.location.protocol + '//' + (window.location.hostname==='localhost' ? 'localhost:3000' : window.location.hostname),
		};
	}
	
	statusmap = {
		'': null,
		'good': <h3>Suggested Clubs</h3>,
		'not signed in': <div><h4>You are not logged in. To get better club suggestions, <a href="/accounts/login">log in</a>.</h4><h4>Here are some popular clubs at your school:</h4></div>,
		'not configured': <div><h4>You have not added any interests. To get club suggestions, configure your interests on your <a href='/profile'>profile</a>.</h4><h4>Here are some popular clubs at your school:</h4></div>,
		'failed search': <p>There was an error processing your search. Make sure you are connected to the internet and retry</p>
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
			fetch(this.state.url + '/searchData/search/' + search)
				.then(handleErrors)
				.then(res => {
					this.setState({clubs: res.clubs, ads: res.ads, searching: '', status: ''});
				}).catch(err => {
					console.error(err);
					this.setState({status: 'failed search', searching: ''});
				});
			//TODO: create error handling so that this doesn't break if someone types a poorly formatted query string
			//TODO: have this query to find the appropriate ads to render
		}
		else {
			fetch(this.state.url + '/searchData/getdefault')
				.then(handleErrors)
				.then(data => {
					console.log(data);
					this.setState({clubs: data.clubs, ads: data.ads, status: data.status, searching: ''});
				}).catch(err => {
					this.setState({status: 'failed search', searching: ''});
					console.error(err)
				});
			
		}
			
	}
	
	updateSearchText(event){
		if (event.target.value[event.target.value.length - 1] !== '_')
			this.setState({
				searchtext: event.target.value
			});
	}
	
	render() {
		//Move the search bar to its own component
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
				<div className='topadcontainer'>
					<div className='topad d-inline-block d-lg-none'>
						{this.state.ads ? <Ad {...this.state.ads[0]} /> : null}
					</div>
					<div className='topad d-inline-block d-lg-none'>
						{this.state.ads ? <Ad {...this.state.ads[1]} /> : null}
					</div>
				</div>
				<div className='row no-gutters'>
					<div className='col sidead d-none d-lg-block'>
						{this.state.ads ? <Ad {...this.state.ads[0]} /> : null}
					</div>
					
					<div className='col'>
						<div style={{padding: '10px'}}>
							{this.state.searching}
							<div className='text-center'>{this.statusmap[this.state.status]}</div>
							{this.state.clubs.map((val) => <SearchResult {...val} key={val.username}/>)}
						</div>
					</div>
					
					<div className='col sidead d-none d-lg-block'>
						{this.state.ads ? <Ad {...this.state.ads[1]} /> : null}
					</div>
				</div>
			</div>
		);
	}
}

export default SearchPage;