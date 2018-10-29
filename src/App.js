import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Palette from './components/Palette/Palette';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import './App.css';

const app = new Clarifai.App({
 apiKey: 'cb3b5289fcec45ed9c6b9ba2a35d5feb'
});

const bubbles = {
"particles": {
    "number": {
      "value": 50,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 1,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 1,
        "opacity_min": 0,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 4,
        "size_min": 0.3,
        "sync": false
      }
    },
    "line_linked": {
      "enable": false,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 2,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 600
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "bubble"
      },
      "onclick": {
        "enable": true,
        "mode": "repulse"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 250,
        "size": 0,
        "duration": 2,
        "opacity": 0,
        "speed": 3
      },
      "repulse": {
        "distance": 400,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
}

const initialState = {
  input: '',
  imageURL: '',
  cols: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    palette: [],
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      palette: [],
      joined: data.joined
    }})
  }

  showSentence = () => {
  if (this.state.cols.length === 0) {
    return ', your palette is empty.'
  } else {
    return ', your palette is..'
  }
}

  recieveColours = (data) => {
    const dataArray = data.outputs[0].data.colors;
    for (var i = 0; i < dataArray.length; i++) {
      this.setState({
        cols: [...this.state.cols, dataArray[i]['raw_hex']]
      })
    };
    let user = Object.assign({}, this.state.user);
    user.palette = this.state.cols;
    this.setState({user})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onDetect = () => {
    this.setState({imageURL: this.state.input});
    this.setState({cols: []});
    app.models.predict("eeed0b6733a644cea07cf4c60f87ebb7", this.state.input)
    .then(response => {
      if (response) {

        this.recieveColours(response)

        // fetch('http://localhost:3000/palette', {
        //   method: 'put',
        //   headers: {'Content-Type': 'application/json'},
        //   body: JSON.stringify({
        //     id: this.state.user.id,
        //     palette: this.state.user.palette
        //   })
        // })
        //   .then(response => response.json())
        //   .then(colours => {
        //     this.setState(Object.assign(this.state.user, {entries: colours}))
        //   })
      }
    })
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route ==='signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles' params={bubbles} />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
        { this.state.route === 'home' ?
          <div>
            <Palette name={this.state.user.name} cols={this.state.user.palette} showSentence={this.showSentence}/>
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onDetect} imageURL={this.state.imageURL}/>
          </div> :
            (this.state.route === 'signin' ?
            <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> :
            <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
          )
        }
      </div>
    );
  }
}

export default App;
