import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonSubmit, imageURL, cols}) => {
	return (
		<div>
			<p className='f4 fw6 ph0 mh0 white-80'>
			{'copy and paste an image address here to detect its colour palette.'}
			</p>
			<div className='center'>
				<div className='form center pa3 br3 shadow-5'>
					<input className='f4 w-80 center pa2 input-reset white ba b--light-gray ba bg-transparent'type='text' onChange={onInputChange}/>
					<button className= 'w-20 b ph3 pv2 input-reset white ba b--white bg-transparent grow pointer f5 dib' onClick={onButtonSubmit}>detect</button>
				</div>
			</div>
			<div className='center ma'>
				<div className='absolute mt2'>
				<img alt='' src={imageURL} width='500px' height='auto'/>
				</div>
			</div>
		</div>
	);
}

export default ImageLinkForm;