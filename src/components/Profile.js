import React, { Component } from 'react';
import Interests from './Interests';
import SearchResult from './SearchResult';
import '../profile.css';
import handleErrors from '../error-handler';

class Profile extends Component {
	constructor(props){
		super(props);
		this.state = {
			user: {
				subscriptions: []
			},
			url: window.location.protocol + '//' + (window.location.hostname==='localhost' ? 'localhost:3000' : window.location.hostname),
		};
	}
	
	
	render() {
		console.log('props');
		console.log(this.props);
		return (
			<div className='container-fluid'>
				<h1 className='title'>Profile</h1>
				<div className='row' style={{marginBottom: '40px'}}>
					<div className='col-md profilesection' style={{'marginLeft': '20px'}}>
						<h2 className='prosectionheader'>Interests</h2>
						{this.state.user.interests && this.state.user.interests.length ? null : <p className='gray'><em>Configuring your interests allows Clubsource to suggest clubs that you might like.</em></p>}
						<hr />
						<Interests interests={this.state.user.interests} url={this.state.url}/>
					</div>
					<div className='col-md profilesection' style={{'marginRight': '20px'}}>
						<h2 className='prosectionheader'>Subscriptions</h2>
						{this.state.user.subscriptions.length ? null : <p className='gray'><em>Clubs that you subscribe to will appear here so that you can easily find them. To suscribe to a club, visit its page and click the subscribe button. To find clubs, click browse clubs.</em></p>}
						<hr />
						{this.state.user.subscriptions.map((val) => <SearchResult {...val} key={val.username} /> )} 
					</div>
				</div>
			</div>
		);
	}
	
	async componentDidMount(){
		console.log(this.state.url);
		fetch(this.state.url + '/profileData/user')
			.then(handleErrors)
			.then(user => {
				console.log('data fetched');
				console.log('user data retrieved');
				console.log(user);
				if (!user)
					window.location.href = '/auth/google';
				this.setState({user: user});
			}).catch(err => console.error(err));
		
		
	}
}

export default Profile;