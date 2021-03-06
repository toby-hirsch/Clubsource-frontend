import React, { Component } from 'react';
import handleErrors from '../error-handler';
import '../quilldisplaystyles.css';

const subcontent = {
	'': 'Subscribe',
	subbed: 'Unsubscribe',
	loading: 'Loading...'
}

class ClubPage extends Component {
	constructor(props){
		super(props);
		this.state = {
			subbed: this.props.subbed,
			url: window.location.protocol + '//' + (window.location.hostname==='localhost' ? 'localhost:3000' : window.location.hostname),
		};
	}
	
	componentWillReceiveProps(nextProps){
		if (nextProps.subbed!==this.props.subbed){
			this.setState({subbed: nextProps.subbed});
		}
	}
	
	render() {
		return (
			<div className='clubwrapper'>
				<div className='info'>
					<h2 className='clubtitle'>{this.props.name}</h2>
					<p className='username'>{this.props.username}</p>
					<div className='text-center' style={{marginBottom: '10px'}}>
						{this.props.showsub ? 
							<button 
								className={'clubbutton subscribe ' + this.state.subbed} 
								id='subscribe' 
								onClick={this.subscribe} 
								disabled={this.state.subbed==='loading'}>
								{subcontent[this.state.subbed]}
							</button> 
						: null}
						{this.props.showedit ? <a className='clubbutton edit' href='/myclub/dashboard/edit'>Edit</a> : null}
					</div>
					
					<div className='middle'>
						<p>Tags: {this.commaspace(this.props.tags)}</p>
						<p>Officers: {this.commaspace(this.props.officers)}</p>
						<p className='nomargin'>Meeting dates: {this.props.meetingdates}</p>
					</div>
					
					<div className='quillcontent'>{this.props.description}</div>
				</div>
			</div>
		);
	}
	
	commaspace(str){
		return (str ? str.replace(/,/g, ', ') : '');
	}
	
	subscribe = async() => {
		let adding = this.state.subbed==='';
		this.setState({subbed: 'loading'});
		fetch(this.state.url + '/searchData/subscribe', {
			method: 'post',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				club: this.props._id,
				adding: adding
			})
		}).then(handleErrors).then(res => {
			if (adding)
				this.setState({subbed: 'subbed'});
			else
				this.setState({subbed: ''});
		}).catch(err => console.error(err));
		
	}
}

export default ClubPage;