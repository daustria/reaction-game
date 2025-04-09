import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Canvas, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import './App.css'

// TODO : Style the buttons. Make the pages and the logic that switches between the pages.

function Button({text, onClick})
{
	return (
		<button onClick={onClick}> {text} </button>
	)
}
function Overlay()
{
	return (
		<div id="grid-container">
			<Button text={"play"} onClick={()=>{}} />
			<p> Hello </p>
			<p> This is some message </p>
			<p> awejrgierhgioajgoa </p>
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
