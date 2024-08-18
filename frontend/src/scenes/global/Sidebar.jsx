import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

const Item = ({ title, to, icon, selected, setSelected }) => {
	const theme = useTheme();
	const colors = theme.palette;
	return (
		<MenuItem
			active={selected === title}
			style={{
				color: colors.grey[100],
			}}
			onClick={() => setSelected(title)}
			icon={icon}
		>
			<Typography>{title}</Typography>
			<Link to={to} />
		</MenuItem>
	);
};

const Sidebar = () => {
	const theme = useTheme();
	const colors = theme.palette;
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [selected, setSelected] = useState("Config");

	return (
		<Box
			height='100%'
			width='fit-content'
			sx={{
				"& .pro-sidebar-inner": {
					background: `${colors.background.container} !important`,
				},
				"& .pro-icon-wrapper": {
					backgroundColor: `transparent !important`,
				},
				"& .pro-inner-item": {
					padding: `5px 35px 5px 20px !important`,
				},
				"& .pro-inner-item:hover": {
					color: `${colors.secondary.main} !important`,
				},
				"& .pro-menu-item.active": {
					color: `${colors.primary.main} !important`,
				},
			}}
		>
			<ProSidebar collapsed={isCollapsed}>
				<Menu iconShape='square'>
					{/* LOGO AND MENU ICON */}
					<MenuItem
						onClick={() => setIsCollapsed(!isCollapsed)}
						icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
						style={{
							margin: "10px 0 20px 0",
						}}
					>
						{!isCollapsed && (
							<Box
								display='flex'
								justifyContent='space-between'
								alignItems='center'
								ml='15px'
							>
								<Typography
									fontSize='24px'
									variant='h3'
									color={colors.grey[100]}
								>
									YEETER
								</Typography>
								<IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
									<MenuOutlinedIcon />
								</IconButton>
							</Box>
						)}
					</MenuItem>

					{/* MENU ITEMS */}
					<Box>
						<Item
							title='Config'
							to='/'
							icon={<SettingsOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
						/>
					</Box>
					<Box>
						<Item
							title='Test'
							to='/test'
							icon={<SettingsOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
						/>
					</Box>
				</Menu>
			</ProSidebar>
		</Box>
	);
};

export default Sidebar;
