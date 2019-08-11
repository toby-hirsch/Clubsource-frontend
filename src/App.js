import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import ViewClub from './components/ViewClub';
import SearchPage from './components/SearchPage';
import Navbar from './components/Navbar';
import Profile from './components/Profile';


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			url: window.location.protocol + '//' + (window.location.hostname==='localhost' ? 'localhost:3000' : window.location.hostname),
			accType: {
				club: false,
				student: false
			}
		};
	}
	async componentDidMount() {
		const res = await fetch(this.state.url + '/accounts/type', {
			credentials: 'include'
		});
		const accType = await res.json();
		await this.setState({accType: accType});
		console.log('club type:');
		console.log(this.state.accType);
	}

	render() {
		return (
			<div>
				<Navbar acc={this.state.accType}/>
				<Switch>
					<Route path='/profile' component={Profile} />
					<Route exact path='/clubs/:username' render={(props) => <ViewClub {...props} accType={this.state.accType} />} />
					<Route exact path='/clubs' component={SearchPage} />
				</Switch>
			</div>
		);
	}
}
export default App;