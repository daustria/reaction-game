import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Canvas, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import './App.css'

// TODO : Style the buttons. Make the pages and the logic that switches between the pages.
// TODO: Start writing up the game logic for playing animations based on the button that was pressed.
// Try to get animations to play when pressing the play button for example? I eventually want to
// sync game state in the canvas with buttons pressed in the website.


function Button({text, onClick, style, gridColumn, gridRow})
{
	const grid_styles = {
		gridColumn: gridColumn,
		gridRow: gridRow
	}

	return (
		<button onClick={onClick} style={grid_styles}> {text} </button>
	)
}

function Overlay()
{

	function PlayButton () {
		return (
			<Button text={'PLAY'} onClick={()=>{}} gridColumn={'5'} gridRow={'6'} />
		)
	}

	return (
		<div id="grid-container">
			<div id='game-title'> Game Title </div>
			<PlayButton />
		</div>
	)
}


function App() {
	const colorMap = useLoader(TextureLoader, 'western_standoff_background.png')

	return (
		<div id="canvas-container">
		<Canvas frameloop="demand">
		<ambientLight intensity={4.0}/>

		<mesh>
			<planeGeometry args={[15,10]} />
			<meshStandardMaterial map={colorMap}/>
		</mesh>
		</Canvas>
		</div>
	)

}

export { App, Overlay };
