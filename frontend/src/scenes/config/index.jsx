import { Typography, Box, Container, Button } from "@mui/material";

const Config = () => {
	const discoverBulbs = () => {};

	return (
		<Container sx={{ pt: 2 }}>
			<Typography variant='h3'>Bulbs</Typography>
			<Button variant='contained' sx={{ mt: 2 }} onClick={discoverBulbs}>
				Discover bulbs
			</Button>
		</Container>
	);
};

export default Config;
