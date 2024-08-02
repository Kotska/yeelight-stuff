import { useState } from "react";
import {
	Typography,
	Box,
	Container,
	Button,
	List,
	ListItem,
	ListSubheader,
	ListItemText,
	Paper,
	TextField,
	MenuItem,
	FormControl,
	Grid,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import IconButton from "@mui/material/IconButton";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import {
	DiscoverBulbs,
	NewBasicDevice,
	GetDevices,
} from "../../../wailsjs/go/main/App.js";

const Config = () => {
	const [devices, setDevices] = useState([]);
	const [discoverLoading, setDiscoverLoading] = useState(false);
	const [deviceIp, setDeviceIp] = useState("");
	const [deviceIpError, setDeviceIpError] = useState(false);
	const [deviceType, setDeviceType] = useState("");
	const [deviceTypeError, setDeviceTypeError] = useState(false);

	const discoverBulbs = () => {
		setDiscoverLoading(true);
		DiscoverBulbs().then((result) => {
			getDevices();
			setDiscoverLoading(false);
		});
	};

	const getDevices = () => {
		GetDevices().then((result) => {
			if (result) {
				setDevices(result);
			}
		});
	};

	const newDevice = (e) => {
		e.preventDefault();
		if (e.target.checkValidity() == true) {
			NewBasicDevice(deviceIp, deviceType).then((result) => {
				console.log(result);
				getDevices();
			});
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

	let listElements = devices.map(function (device) {
		return (
			<ListItem
				key={device.Location}
				secondaryAction={
					<IconButton edge='end' aria-label='delete'>
						<PowerSettingsNewIcon />
					</IconButton>
				}
			>
				<ListItemAvatar>
					<Avatar>
						<LightbulbIcon />
					</Avatar>
				</ListItemAvatar>
				<ListItemText>{device.Name}</ListItemText>
			</ListItem>
		);
	});

	const deviceTypes = [
		{
			value: "Lightstrip (Color)",
			label: "Lightstrip (Color)",
		},
		{
			value: "LED Bulb (Color)",
			label: "LED Bulb (Color)",
		},
		{
			value: "Bedside Lamp (Color)",
			label: "Bedside Lamp (Color)",
		},
		{
			value: "LED Bulb (White)",
			label: "LED Bulb (White)",
		},
		{
			value: "Ceiling Light",
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
					{listElements}
				</List>
			</Paper>
			<LoadingButton
				variant='contained'
				loading={discoverLoading}
				loadingPosition='end'
				sx={{
					mt: 4,
					mr: 2,
					paddingRight: discoverLoading ? 5 : 2,
				}}
				onClick={discoverBulbs}
			>
				Discover bulbs
			</LoadingButton>
			<br />
			<Box component='form' onSubmit={newDevice} noValidate>
				<Grid container spacing={2}>
					<Grid item>
						<TextField
							required={true}
							id='ip-address'
							label='IP Address'
							variant='standard'
							helperText={deviceIpError ?? "Ex: 192.168.0.100"}
							onChange={handleIpChange}
							error={deviceIpError}
							value={deviceIp}
							inputProps={{
								pattern:
									"^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$",
							}}
						></TextField>
					</Grid>
					<Grid item sx={6}>
						<TextField
							id='device-type'
							select
							required={true}
							label='Device Type'
							sx={{ width: 200, ml: 2 }}
							onChange={handleTypeChange}
							value={deviceType}
							error={deviceTypeError}
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
