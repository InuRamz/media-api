import React from 'react'
import './Thematic.css'
const BASE_URL = 'http://localhost:3000/api/v1';

const Thematic = ({name, front}) => {
	return (
		<div className="thematic-container">
			<div className='thematic-title'>
				<div className="avatar-container">
					<img src={`${BASE_URL}/file/${front}`} alt="Avatar"/>
    		</div>
				<h3>Temática: {name}</h3>
			</div>
		</div>
	)
}

export default Thematic