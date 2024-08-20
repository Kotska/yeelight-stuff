import { createContext, useState, useEffect } from "react";
import {
	GetDevices,
	NewBasicDevice,
	DeleteDevice,
} from "../wailsjs/go/main/App.js";

export const Context = createContext();

const Store = ({ children }) => {
	const [devices, setDevices] = useState([]);

	const getDevices = () => {
		console.log("getting devices");
		GetDevices().then((result) => {
			if (result) {
				setDevices(result);
			}
		});
	};

	const newBasicDevice = (deviceIp, deviceType) => {
		NewBasicDevice(deviceIp, deviceType).then((result) => {
			getDevices();
		});
	};

	const deleteDevice = (location) => {
		DeleteDevice(location);
		getDevices();
	};

	useEffect(() => {
		getDevices();
	}, []);

	return (
		<Context.Provider
			value={{ devices, setDevices, getDevices, newBasicDevice }}
		>
			{children}
		</Context.Provider>
	);
};

export default Store;