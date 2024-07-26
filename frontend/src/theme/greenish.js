import { createTheme } from "@mui/material";

const { palette } = createTheme();

export const theme = {
	dark: {
		palette: {
			mode: "dark",
			// this method augmentColor creates a MUI colour object, with other values automatically like light and dark
			// as a colour object has main, contrastText, light and dark keys. but we need not provide light and dark keys.
			primary: palette.augmentColor({
				color: {
					// pick the primary colour OF DARK and paste it here
					main: "#80D4DC",
					// pick the onPrimary colour OF DARK and paste it here
					contrastText: "#00363A",
				},
			}),
			secondary: palette.augmentColor({
				color: {
					// pick the secondary colour OF DARK and paste it here
					main: "#B1CBCE",
					// pick the onSecondary colour OF DARK and paste it here
					contrastText: "#1B3437",
				},
			}),
			text: {
				// pick the onBackground colour OF DARK and paste it here
				primary: "#DEE4E4",
				// pick the onSurface colour OF DARK and paste it here
				secondary: "#DEE4E4",
			},
			background: {
				// pick the background colour OF DARK and paste it here
				default: "#0E1415",
				// pick the surface colour and OF DARK paste it here
				paper: "#0E1415",
				container: "#1a2121",
			},
			error: palette.augmentColor({
				color: {
					// pick the error colour OF DARK and paste it here
					main: "#FFBAB1",
					// pick the onError colour OF DARK and paste it here
					contrastText: "#370001",
				},
			}),
			success: palette.augmentColor({
				color: {
					// where did this come from? there is no succeess colour mentioned in thatpalette generator, but you can go ahead
					// and add custom colours (on bottom left side of the material-theme-builder page and it'll generate palette
					// for success for you on the right side. from there just pick success OF DARK and onSuccess OF DARK and paste here
					main: "#b6d086",
					contrastText: "#243600",
				},
			}),
			info: palette.augmentColor({
				color: {
					// same as above
					main: "#fcb975",
					contrastText: "#4a2800",
				},
			}),
			warning: palette.augmentColor({
				color: {
					// same as above
					main: "#d4c871",
					contrastText: "#363100",
				},
			}),
			// I put the outline colour here
			divider: "#899393",
			containerPrimary: palette.augmentColor({
				color: {
					// pick the primary Conatiner colour OF DARK and paste it here
					main: "#004f54",
					// pick the On primary Conatiner colour OF DARK and paste it here
					contrastText: "#9df0f8",
				},
			}),
			containerSecondary: palette.augmentColor({
				color: {
					// pick the secondary Conatiner colour OF DARK and paste it here
					main: "#324b4d",
					// pick the On secondary Conatiner colour OF DARK and paste it here
					contrastText: "#cce8ea",
				},
			}),
		},
	},
	// REPEAT FOR LIGHT. instead of picking colours from dark palette, pick colours from the light one and repeat as above
	light: {
		palette: {
			mode: "light",
			primary: palette.augmentColor({
				color: {
					main: "#006970",
					contrastText: "#ffffff",
				},
			}),
			secondary: palette.augmentColor({
				color: {
					main: "#4a6365",
					contrastText: "#ffffff",
				},
			}),
			text: {
				primary: "#161d1d",
				secondary: "#3f4849",
			},
			background: {
				default: "#f4fafb",
				paper: "#fffbff",
			},
			error: palette.augmentColor({
				color: {
					main: "#ba1b1b",
					contrastText: "#ffffff",
				},
			}),
			success: palette.augmentColor({
				color: {
					main: "#006e10",
					contrastText: "#ffffff",
				},
			}),
			info: palette.augmentColor({
				color: {
					main: "#0062a2",
					contrastText: "#ffffff",
				},
			}),
			warning: palette.augmentColor({
				color: {
					main: "#606200",
					contrastText: "#313300",
				},
			}),
			divider: "#79757f",
			upvote: palette.augmentColor({
				color: {
					main: "#6342d2",
					contrastText: "#ffffff",
				},
			}),
			downvote: palette.augmentColor({
				color: {
					main: "#ba1b1b",
					contrastText: "#ffffff",
				},
			}),
			containerPrimary: palette.augmentColor({
				color: {
					main: "#e8deff",
					contrastText: "#1c0062",
				},
			}),
			containerSecondary: palette.augmentColor({
				color: {
					main: "#e7dff8",
					contrastText: "#1d192b",
				},
			}),
		},
	},
};
