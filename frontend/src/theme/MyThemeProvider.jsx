import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useEffect, useState, useMemo, createContext } from "react";
import { theme } from "./greenish";

// 1. create context with default values. This context will be used in places where we need to
// change themes and modes. we will update the context vaules below to actual functions
const ThemeContext = createContext({
	toggleColorMode: () => {},
});

export default function MyThemeProvider(props) {
	// 2. take user theme preference using media query
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

	// 3. init state to store mode value
	const [mode, setMode] = useState(prefersDarkMode ? "dark" : "light");

	// 5. this is to ensure, whenever user changes their system preference our code reacts to it
	useEffect(() => {
		setMode(prefersDarkMode ? "dark" : "light");
	}, [prefersDarkMode]);

	// 6. create a colorMode memo, memo makes sure colorMode is only initialized once (with the anonymous function)
	// and not on every render.
	// here is a great example of what it's useful for <https://dmitripavlutin.com/react-usememo-hook/>
	// don't worry too much about it, it's basically used for performance reasons and avoid unnecess recalculations.
	// colorMode will be an object with keys toggleColorMode and shuffleColorTheme
	const colorMode = useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
			},
		}),
		[]
	);

	const _theme = useMemo(() => createTheme(theme[mode]), [mode]);
	return (
		<ThemeContext.Provider value={colorMode}>
			<ThemeProvider theme={_theme}>
				<GlobalStyles styles={{}} />
				<CssBaseline enableColorScheme />
				{props.children}
			</ThemeProvider>
		</ThemeContext.Provider>
	);
}
