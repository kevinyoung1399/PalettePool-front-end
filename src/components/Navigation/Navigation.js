import React from 'react';

const Navigation = ({onRouteChange, isSignedIn}) => {
	if (isSignedIn) {
		return (
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p onClick={() => onRouteChange('signout')} className = 'link dim near-white pa3 pointer fw6 lh-copy f6'>sign out</p>
			</nav>
		);
	} else {
		return (
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p onClick={() => onRouteChange('register')} className = 'link dim near-white pa3 pointer fw6 lh-copy f6'>register</p>
				<p onClick={() => onRouteChange('signin')} className = 'link dim near-white pa3 pointer fw6 lh-copy f6'>sign in</p>
			</nav>
		)
	}
}

export default Navigation;