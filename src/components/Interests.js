import React, { Component } from 'react';
import handleErrors from '../error-handler';
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
			save: 'saved',
			selectedtags: this.props.interests
		};
		if (this.props.interests && !this.originaltags)
			this.originaltags = [...this.props.interests].sort();
		console.log('original tags in constructor');
		console.log(this.originaltags);
	}
		
	savecontent = {
		'': 'Save Changes',
		loading: 'Saving...',
		saved: 'Saved'
	};
	
	originaltags;
	
	componentWillReceiveProps(nextProps){
		console.log('receiving props');
		console.log(nextProps);
		if (nextProps.interests !== this.props.interests){
			let interests = nextProps.interests.sort();
			this.setState({selectedtags: interests});
			if (!this.originaltags){
				console.log('changing original tags from:');
				console.log(this.originaltags);
				console.log('to:');
				console.log(interests);
				this.originaltags = [...interests];
			}
		}
	}
	
	render() {
		return (
			<div className='interestcontainer'>
				{tags.map((tag) => 
					<div 
						className={'interest' + (this.state.selectedtags && this.state.selectedtags.indexOf(tag) !== -1 ? ' selected': '')}
						onClick={() => this.update(tag)}
						key={tag}
						>
						{tag}
					</div>
				)}
				<div style={{textAlign: 'center', marginTop: '20px'}}>
					<button 
						className={'bigbutton savebutton ' + this.state.save}
						onClick={this.submittags}
						disabled={this.state.save}>
						{this.savecontent[this.state.save]}
					</button>
				</div>
			</div>
		);
	}
	
	submittags = async() => {
		this.setState({save: 'loading'});
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
		}).then(handleErrors).then(newtags => {
			console.log('response');
			console.log(newtags);
			this.originaltags = [...newtags];
			this.setState({save: 'saved'});
		}).catch((err) => console.error(err));
	}
	
	update(tag) {
		let temptags = this.state.selectedtags;
		let curridx = temptags.indexOf(tag);
		if (curridx === -1)
			insertsorted(temptags, tag);
		else
			temptags.splice(curridx, 1);
		this.setState({selectedtags: temptags});
		console.log('new tags');
		console.log(temptags);
		console.log('old tags');
		console.log(this.originaltags);
		if (temptags.join('')===this.originaltags.join(''))
			this.setState({save: 'saved'})
		else
			this.setState({save: ''});
		console.log(this.state.selectedtags);
	}
}

function insertsorted(arr, el){
	arr.push(el);
	let len = arr.length;
	let i = len - 1;
	while (i > 0 && arr[i].localeCompare(arr[i-1]) < 0){
		swap(arr, i, i-1);
		i--;
	}
}

function swap(arr, i, j){
	let temp = arr[i];
	arr[i] = arr[j];
	arr[j] = temp;
}

export default Interests;