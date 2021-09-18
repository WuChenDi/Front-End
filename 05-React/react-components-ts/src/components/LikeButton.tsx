import React, { useState, useEffect } from 'react'

import useMousePosition from '../hooks/useMousePosition'

const LikeButton: React.FC = () => {
	const [like, setLike] = useState(0)
	const [on, setOn] = useState(true)
	const [obj, setObj] = useState({ like: 0, on: true })
	const positions = useMousePosition()

	// 首次与每次渲染都会执行
	useEffect(() => {
		console.log('document title effect is running')

		document.title = `点击来${like}次`
	}, [like, on])

	return (
		<>
			<>
				<p>X:{positions.x}</p>
				<p>Y:{positions.y}</p>
			</>
			<button
				onClick={() => {
					setLike(like + 1)
				}}
			>
				{like}👍
			</button>
			<button
				onClick={() => {
					setOn(!on)
				}}
			>
				{on ? 'ON' : 'OFF'}
			</button>
			<button
				onClick={() => {
					setObj({ like: obj.like + 1, on: obj.on })
				}}
			>
				{obj.like}👍
			</button>
			<button
				onClick={() => {
					setObj({ like: obj.like, on: !obj.on })
				}}
			>
				{obj.on ? 'ON' : 'OFF'}
			</button>
		</>
	)
}

export default LikeButton
