import { useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import { TextureLoader } from 'three'
import * as THREE from 'three';

import './App.css'

// TODO : Style the buttons. Make the pages and the logic that switches between the pages.

// TODO: Start writing up the game logic for playing animations based on the button that was pressed.
// Try to get animations to play when pressing the play button for example? I eventually want to
// sync game state in the canvas with buttons pressed in the website.

const BLANK_PAGE = 0;
const TITLE_SCREEN = 1;

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

function Overlay({ page, onPageChange })
{
	function PlayButton () {
		return (
			<Button text={'PLAY'} onClick={()=>{onPageChange(BLANK_PAGE)}} gridColumn={'5'} gridRow={'6'}  />
		)
	}

	function TitlePage() {
		return (
			<div id="grid-container">
				<div id='game-title'> Game Title </div>
				<PlayButton />
			</div>
		);
	}

	function BlankPage() {
		return (
			<div id='grid-container'> </div>
		);
	}

	// TODO: Figure out why this isnt rendering.
	switch (page) {
		case TITLE_SCREEN:
			return <TitlePage />
			break;
		case BLANK_PAGE:
			return <BlankPage />
			break;
		default:
			return <BlankPage />
	}
}

function ExclamationBubble({ page, onPageChange }) {	

	if (page != BLANK_PAGE) return;
	const speech_bubble_texture = useLoader(TextureLoader, 'speech_bubble.png');
	const exclamation_bubble = useRef();

	const vibration_time = 1.0
	const start_time = new THREE.Clock().elapsedTime;

	useFrame(({ clock }) => {
		if (clock.elapsedTime - start_time > 1.0) return;

		let position = exclamation_bubble.current.position;
		exclamation_bubble.current.translateX(-position.x + Math.random()/2);
		exclamation_bubble.current.translateY(-position.y + 1.5 + Math.random()/2);
	})

	return (
		<sprite ref={exclamation_bubble} scale={[5,5,1]} position={[0,1.5,0]}>
			<spriteMaterial map={speech_bubble_texture} 
				/>
		</sprite>
	)
}

function App() {
	const colorMap = useLoader(TextureLoader, 'western_standoff_background.png')
	// Should consider making a container for holding game animted objects like Exclamation Bubble.
	// We can pass the curernt 'page' we are on to this container and Overlay. We can pass callback
	// functions to these containers to allow the child buttons of these containers to change the state.

	const [pageState, setPageState] = useState(TITLE_SCREEN);

	// We don't necessarily want the canvas to reload when changing the page state. The only
	// thing the canvas should care about is whether the game animations are playing or not.

	return (
		<div id="canvas-container">
		<Overlay page={pageState} onPageChange={setPageState}/>
		<Canvas /*frameloop="demand"*/>
		<ambientLight intensity={4.0}/>
		<mesh>
			<planeGeometry args={[15,10]} />
			<meshStandardMaterial map={colorMap}/>
		</mesh>
		<ExclamationBubble page={pageState} onPageChange={setPageState}/>
		</Canvas>
		</div>
	)

}

export { App, Overlay };
