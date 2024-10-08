import { useState, useMemo, useContext } from "react";
import {
	Typography,
	Box,
	Container,
	Button,
	List,
	ListSubheader,
	Paper,
	TextField,
	MenuItem,
	Grid,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SearchIcon from "@mui/icons-material/Search";
import { DiscoverBulbs } from "../../../wailsjs/go/main/App.js";
import DevicesList from "./DevicesList.jsx";
import { Context } from "../../Store.jsx";

const Config = () => {
	const { devices, newBasicDevice, getDevices, deleteDevice } =
		useContext(Context);
	const [discoverLoading, setDiscoverLoading] = useState(false);
	const [deviceIp, setDeviceIp] = useState("");
	const [deviceType, setDeviceType] = useState("");
	const [deviceIpError, setDeviceIpError] = useState(false);
	const [deviceTypeError, setDeviceTypeError] = useState(false);

	const discoverBulbs = () => {
		setDiscoverLoading(true);
		DiscoverBulbs().then((result) => {
			getDevices();
			setDiscoverLoading(false);
		});
	};

	const newDevice = (e) => {
		e.preventDefault();
		if (e.target.checkValidity() == true) {
			newBasicDevice(deviceIp, deviceType);
		}
	};

	const handleIpChange = (e) => {
		setDeviceIp(e.target.value);
		if (e.target.validity.valid) {
			setDeviceIpError(false);
		} else {
			setDeviceIpError("Enter a valid ip address");
		}
	};

	const handleTypeChange = (e) => {
		setDeviceType(e.target.value);
		if (e.target) {
			setDeviceTypeError(false);
		} else {
			setDeviceTypeError("Select a device");
		}
	};

	const deviceTypes = [
		{
			value: "strip",
			label: "Lightstrip (Color)",
		},
		{
			value: "color",
			label: "LED Bulb (Color)",
		},
		{
			value: "bslamp",
			label: "Bedside Lamp (Color)",
		},
		{
			value: "mono",
			label: "LED Bulb (White)",
		},
		{
			value: "ceiling",
			label: "Ceiling Light",
		},
	];

	return (
		<Container sx={{ pt: 2 }}>
			<Typography variant='h3'>Bulbs</Typography>
			<Paper elevation={1}>
				<List
					sx={{ mt: 2, borderBottom: 1, borderTop: 1, minWidth: 300 }}
					dense={false}
					subheader={
						<ListSubheader component='div'>
							{!devices.length && "No devices available"}
							{devices.length == 1 && "1 device available"}
							{devices.length > 1 && devices.length + " devices available"}
						</ListSubheader>
					}
				>
					<DevicesList />
				</List>
			</Paper>
			<LoadingButton
				variant='contained'
				loading={discoverLoading}
				loadingPosition='end'
				endIcon={<SearchIcon />}
				sx={{
					mt: 4,
					mr: 2,
				}}
				onClick={discoverBulbs}
			>
				Discover bulbs
			</LoadingButton>
			<br />
			<Box
				component='form'
				autoComplete='off'
				onSubmit={newDevice}
				noValidate
				sx={{ mt: 4 }}
			>
				<Grid container spacing={2}>
					<Grid item>
						<TextField
							required={true}
							id='ip-address'
							label='IP Address'
							variant='standard'
							helperText={deviceIpError ?? "Ex: 192.168.0.100"}
							onChange={handleIpChange}
							error={!!deviceIpError}
							value={deviceIp}
							inputProps={{
								pattern:
									"^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$",
							}}
						></TextField>
					</Grid>
					<Grid item>
						<TextField
							id='device-type'
							select
							required={true}
							label='Device Type'
							sx={{ width: 200, ml: 2 }}
							onChange={handleTypeChange}
							value={deviceType}
							error={!!deviceTypeError}
							helperText={!deviceTypeError ? deviceTypeError : ""}
						>
							{deviceTypes.map((option) => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</TextField>
					</Grid>
				</Grid>
				<Button variant='contained' sx={{ mt: 2, mr: 2, mb: 4 }} type='submit'>
					Add Device
				</Button>
			</Box>
		</Container>
	);
};

export default Config;
