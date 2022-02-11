import React, { Component } from 'react';
import '../navbar.js';

class Navbar extends Component {
	constructor(props){
		super(props);
		this.state = {
			
		};
	}
	
	render() {
		return (
			<div>
				<div id='closewrap'>
					<button id='closebtn'></button>
					<img src='grayx.png' id='close' />
				</div>
				<div id='fullnav'>
					<div className='outer'>
						<div className='inner'>
							<div id='fullnavcont' className='d-inline-block'>
								{this.props.acc.student ? <div><a className='fullnavlink' href='/profile'>Profile</a></div> : null}
								{this.props.acc.club ? <div><a className='fullnavlink' href='/dashboard'>Dashboard</a></div> : null}
								<a className='fullnavlink' href='/clubs'> Browse Clubs</a>
								{this.props.acc.club || this.props.acc.student ? 
									<div><a className='fullnavlink' href='/accounts/logout'>Log Out</a></div> : 
									<div><a className='fullnavlink' href='/accounts/login'>Log In</a></div>}
							</div>
						</div>
					</div>
				</div>
				<div className='navbar'>
					<div className='navcont navleft'>
						<div className='position-relative d-inline-block'>
							<a className='mainlogonav' href='/'> clubsource</a>
							<div className='triangledown' id='navdrop'></div>
						</div>
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
			</div>
		)
	}
}

export default Navbar;