import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'

import Hello from './components/Hello'
import LikeButton from './components/LikeButton'
import MouseTracker from './components/MouseTracker'
import useMousePosition from './hooks/useMousePosition'

function App() {
	const [show, setShow] = useState(true)
	const positions = useMousePosition()

	return (
		<div className='App'>
			<header className='App-header'>
				<img src={logo} className='App-logo' alt='logo' />
				<Hello />
				<LikeButton />

				<p>
					<button
						onClick={() => {
							setShow(!show)
						}}
					>
						Toggle Tracker
					</button>
				</p>

				<>
					<p>X:{positions.x}</p>
					<p>Y:{positions.y}</p>
				</>

				{show && <MouseTracker />}

				<p>
					Edit <code>src/App.tsx</code> and save to reload.
				</p>
				<a
					className='App-link'
					href='https://reactjs.org'
					target='_blank'
					rel='noopener noreferrer'
				>
					Learn React
				</a>
			</header>
		</div>
	)
}

export default App
