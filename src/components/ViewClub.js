import React, { Component } from 'react';
import '../clubview.css';
import { Parser } from 'html-to-react';
import Error404 from './Error404';
import ClubPage from './ClubPage';


console.log(process.env.NODE_ENV);

class ViewClub extends Component {
	constructor(props){
		super(props);
		this.state = {
			club: {},
			buttons: {
				subscribe: false,
				edit: false
			},
			exists: true,
			url: window.location.protocol + '//' + (window.location.hostname==='localhost' ? 'localhost:3000' : window.location.hostname)
		}
	}
	
	render() {
		return (
			<div className='container-fluid'>
				<div className='row'>
					<div className='col sidead'>
						Left Ad
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
						Right Ad 
					</div>
				</div>
			</div>
			
		);
		
		
	}
	
	
	async componentDidMount() {
		
		var parser = new Parser();
		var username = this.props.match.params.username;
		const res = await fetch(this.state.url + '/searchData/' + username, {
			credentials: 'include'
		}); //Put error handling here
		const data = await res.json();
		if (data === 'not found') {
			console.log('page not found');
			this.setState({exists: false});
			return;
		}
		data.club.description = parser.parse(data.club.description);
		this.setState({club: data.club});
		let buttons = {};
		buttons.subscribed = data.subscribed;
		buttons.edit = data.isowner;
		this.setState({buttons: buttons});
	}
	
	
}

export default ViewClub;