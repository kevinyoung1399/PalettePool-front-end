import React from 'react';

class SignIn extends React.Component {
	constructor() {
		super();
		this.state = {
			signInEmail: '',
			signInPasword: '',
		}
	}

	onEmailChange = (event) => {
		this.setState({signInEmail: event.target.value})
	}

	onPasswordChange = (event) => {
		this.setState({signInPasword: event.target.value})
	}

	onSubmitSignIn = () => {
		fetch('http://localhost:3000/signin', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPasword
			})
		})
			.then(response => response.json())
			.then(user => {
				if (user.id) {
					this.props.loadUser(user);
					this.props.onRouteChange('home');
				}
			}).catch(400).then(console.log('bad credentials'))
	}

	render() {
		return (
			<article className="br3 ba b--white-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
				<main className="pa4 white-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f1 fw6 ph0 mh0">palettePool</legend>
				      <legend className="f2 fw6 ph0 mh0">sign in</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">email</label>
				        <input className="pa2 input-reset white ba b--light-gray ba bg-transparent border-white hover w-100" type="email" name="email-address"  id="email-address" onChange={this.onEmailChange}/>
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">password</label>
				        <input className="b pa2 input-reset white ba b--light-gray ba bg-transparent border-white hover w-100" type="password" name="password"  id="password" onChange={this.onPasswordChange}/>
				      </div>
				    </fieldset>
				    <div className="">
				      <input onClick={this.onSubmitSignIn} className="b ph3 pv2 input-reset white ba b--white bg-transparent grow pointer f6 dib" type="submit" value="sign in"/>
				    </div>
				    <div className="lh-copy mt3">
				      <p className="f6 link dim white db pointer" onClick={() => this.props.onRouteChange('register')}>or go to the register page</p>
				    </div>
				  </div>
				</main>
			</article>
		);	
	}	

}


export default SignIn;
