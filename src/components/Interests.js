import React, { Component } from 'react';
//import { Button } from 'react-router-dom';

const tags = [
	'animals',
	'art',
	'business',
	'community/local',
	'competition',
	'culture',
	'debate',
	'economics/finance',
	'entertainment',
	'government/politics',
	'health',
	'history',
	'honor society',
	'language',
	'leadership',
	'math',
	'music',
	'public speaking',
	'science',
	'social advocacy',
	'sports',
	'technology',
	'volunteering/charity/community service',
	'writing'
];

class Interests extends Component {
	constructor(props){
		super(props);
		this.state = {
			selectedtags: this.props.interests, //This is not working. it always set is as an empty array even when the props are correct
			originaltags: this.props.interests
		};
	}
	
	componentWillReceiveProps(nextProps){
		if (nextProps.interests !== this.props.interests)
			this.setState({selectedtags: nextProps.interests, originaltags: nextProps.interests});
	}
	
	render() {
		return (
			<div className='interestcontainer'>
				{tags.map((tag) => <div 
					className={'interest' + (this.state.selectedtags.indexOf(tag) === -1 ? '': ' selected')}
					onClick={() => this.update(tag)}
					key={tag}
					>
					{tag}
				</div>)}
				<div style={{textAlign: 'center', marginTop: '20px'}}>
					<button className='bigbutton' onClick={this.submittags}>Save Changes </button>
				</div>
			</div>
		);
	}
	
	async componentDidMount(){
		this.setState({selectedtags: this.props.interests, originaltags: this.props.interests});
	}
	
	submittags = async() => {
		let temptags = this.state.selectedtags;
		console.log(temptags);
		console.log(typeof temptags);
		console.log(JSON.stringify(temptags));
		console.log(JSON.parse(JSON.stringify(temptags)));
		fetch(this.props.url + '/profileData/updatetags', {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(temptags),
			credentials: 'include'
		}).then((res) => res.json()).then((newtags) => {
			console.log('response');
			console.log(newtags);
			this.setState({originaltags: newtags});
		});
	}
	
	update(tag) {
		let temptags = this.state.selectedtags;
		let curridx = temptags.indexOf(tag);
		if (curridx === -1)
			temptags.push(tag);
		else
			temptags.splice(curridx, 1);
		this.setState({selectedtags: temptags});
		console.log(this.state.selectedtags);
	}
}

export default Interests;