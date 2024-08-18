import { React, useRef, useState } from "react";
import { ListItem, ListItemText, Icon, ListItemButton } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import Avatar from "@mui/material/Avatar";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import HelpIcon from "@mui/icons-material/Help";
import StripIcon from "../../assets/images/strip-icon.svg";
import useLongPress from "../../hooks/use-long-press";
import { Menu, MenuItem } from "@mui/material";

const DeviceIcon = ({ model }) => {
	if (model == "color") return <LightbulbIcon />;
	if (model == "strip6") {
		return (
			<Icon>
				<img src={StripIcon} width={22} height={22} />
			</Icon>
		);
	}
	return <LightbulbIcon />;
};

const DevicesList = ({ devices, deleteDevice }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [selectedLocation, setSelectedLocation] = useState(null);
	const open = Boolean(anchorEl);

	function handleOnClick() {
		console.log("go to device");
	}

	function handleLongPress(event) {
		setSelectedLocation(event.currentTarget.getAttribute("location"));
		setAnchorEl(event.currentTarget);
	}

	const handleClose = () => {
		setAnchorEl(null);
	};

	function handleDelete() {
		handleClose();
		deleteDevice(selectedLocation);
	}

	const { action, handlers } = useLongPress({
		onClick: handleOnClick,
		onLongPress: handleLongPress,
	});

	const listElements = devices.map(function (device, key) {
		return (
			<ListItem
				key={device.Location}
				secondaryAction={
					<IconButton
						edge='end'
						aria-label='power'
						onClick={() => {
							console.log("power switch");
						}}
					>
						<PowerSettingsNewIcon />
					</IconButton>
				}
				disablePadding
			>
				<ListItemButton {...handlers} location={device.Location}>
					<ListItemAvatar>
						<Avatar>
							<DeviceIcon model={device.Model} />
						</Avatar>
					</ListItemAvatar>
					<ListItemText>{device.Name}</ListItemText>
				</ListItemButton>
			</ListItem>
		);
	});
	return (
		<div>
			{listElements}
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={() => {
					handleClose();
				}}
			>
				<MenuItem
					onClick={() => {
						handleDelete();
					}}
				>
					Delete
				</MenuItem>
			</Menu>
		</div>
	);
};

export default DevicesList;
