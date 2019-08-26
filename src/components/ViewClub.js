import React, { Component } from 'react';
import '../clubview.css';
import { Parser } from 'html-to-react';
import Error404 from './Error404';
import ClubPage from './ClubPage';
import handleErrors from '../error-handler';
import Ad from './Ad';


console.log(process.env.NODE_ENV);

class ViewClub extends Component {
	constructor(props){
		super(props);
		this.state = {
			club: {},
			buttons: {
				subscribed: false,
				edit: false
			},
			exists: true,
			url: window.location.protocol + '//' + (window.location.hostname==='localhost' ? 'localhost:3000' : window.location.hostname)
		}
	}
	
	render() {
		return (
			
			<div className='row no-gutters'>
				<div className='col sidead'>
					{this.state.ads ? <Ad {...this.state.ads[0]} /> : null}
				</div>
				
				<div className='col'>
					{this.state.exists ? 
						<ClubPage {...this.state.club} 
							showedit={this.state.buttons.isowner} 
							showsub={this.props.accType.student}
							subbed={this.state.buttons.subscribed ? 'subbed' : ''} /> : 
						<Error404 />}
				</div>
				
				<div className='col sidead'>
					{this.state.ads ? <Ad {...this.state.ads[1]} /> : null}
				</div>
			</div>
			
			
		);
		
		
	}
	
	
	async componentDidMount() {
		
		var parser = new Parser();
		var username = this.props.match.params.username;
		fetch(this.state.url + '/searchData/' + username, {
			credentials: 'include'
		}).then(handleErrors).then(data => {
			if (data === 'not found') {
				console.log('page not found');
				this.setState({exists: false});
				return;
			}
			data.club.description = parser.parse(data.club.description);
			let buttons = {};
			buttons.subscribed = data.subscribed;
			buttons.edit = data.isowner;
			this.setState({club: data.club, ads: data.ads, buttons: buttons});
		}).catch(err => console.error(err));
	}
	
	
}

export default ViewClub;