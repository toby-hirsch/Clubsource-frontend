import React, { Component } from 'react';


class Navbar extends Component {
	constructor(props){
		super(props);
		this.state = {
			
		};
	}
	
	render() {
		return (
			<div className='navbar'>
				<div className='navcont navleft'>
					<a className='mainlogonav' href='/'> clubsource</a>
				</div>
				<div className='navcont navright'>
					{this.props.acc.student ? <a className='navlink' href='/profile'>Profile</a> : null}
					{this.props.acc.club ? <a className='navlink' href='/dashboard'>Dashboard</a> : null}
					<a className='navlink' href='/clubs'> Browse Clubs</a>
					{this.props.acc.club || this.props.acc.student ? 
						<a className='navlink' href='/accounts/logout'>Log Out</a> : 
						<a className='navlink' href='/accounts/login'>Log In</a>}
				</div>
			</div>
		)
	}
}

export default Navbar;