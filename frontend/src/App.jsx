import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Config from "./scenes/config";
import Sidebar from "./scenes/global/Sidebar";

function App() {
	return (
		<div id='app'>
			<Sidebar />
			<main className='content'>
				<Routes>
					<Route path='/' element={<Config />} />
				</Routes>
			</main>
		</div>
	);
}

export default App;
