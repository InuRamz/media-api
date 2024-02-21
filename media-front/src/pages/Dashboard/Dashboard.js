import React from 'react'
import './Dashboard.css'
import Toolbar from '../../components/Toolbar/Toolbar';

const Dashboard = () => {
	return (
		<div className='full-size'>
			<Toolbar />
			<div className='content'>
				<div>
					<h3>Agregar usuario</h3>
				</div>
			</div>
		</div>
	)
}

export default Dashboard;
