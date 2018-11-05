import React from 'react';

	class Register extends React.Component {
		constructor() {
		super();
		this.state = {
			name: '',
			email: '',
			pasword: '',
			hasBadCredentials: false
		}
	}

	onNameChange = (event) => {
		this.setState({name: event.target.value})
	}
	onEmailChange = (event) => {
		this.setState({email: event.target.value})
	}

	onPasswordChange = (event) => {
		this.setState({pasword: event.target.value})
	}



	onSubmitSignIn = () => {
		fetch('https://glacial-taiga-57255.herokuapp.com/register', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				name: this.state.name,
				email: this.state.email,
				password: this.state.pasword
			})
		})
			.then(response => response.json())
			.then(user => {
				if (user.id) {
					this.props.loadUser(user)
					this.props.onRouteChange('home');
				}
			}).catch(400).then(this.setState({hasBadCredentials: true}))
		}

	render() {
		return (
			<article className="br3 ba b--white-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
				<main className="pa4 white-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f1 fw6 ph0 mh0">palettePool</legend>
				      <legend className="f2 fw6 ph0 mh0">register</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="name">name</label>
				        <input  className="pa2 input-reset white ba b--light-gray ba bg-transparent border-white hover w-100" type="text" name="name"  id="name" onChange={this.onNameChange}/>
				      </div>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">email</label>
				        <input className="pa2 input-reset white ba b--light-gray ba bg-transparent border-white hover w-100" type="email" name="email-address"  id="email-address" onChange={this.onEmailChange}/>
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">password</label>
				        <input className="pa2 input-reset white ba b--light-gray ba bg-transparent border-white hover w-100" type="password" name="password"  id="password" onChange={this.onPasswordChange}/>
				      </div>
				    </fieldset>
				    <div className="">
					      <input onClick={this.onSubmitSignIn} className="b ph3 pv2 white input-reset ba b--white bg-transparent grow pointer f6 dib" type="submit" value="register"/>
					</div>
				  </div>
				</main>
			</article>
		);
	}
}

export default Register;