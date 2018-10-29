import React from 'react';

const Palette = ({name, cols, showSentence}) => {
	return (
		<div>

			<div className='f3 fw6 ph0 mh0 white-80'>
				{`${name}`}
				{showSentence()}
			</div>
			<div className='flex center'>
                	{cols.map(function(colName, index){
                		var textColor = {color: colName};
                    	return(
                    	<div className='f5 pa3 fw6 mh0' key={ index } style={ textColor }>
                    		{colName}
                    	</div>);
                  	})}
			</div>
		</div>
	);
}

export default Palette;