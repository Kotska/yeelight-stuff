import React from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { StyledEngineProvider } from "@mui/material/styles";
import MyThemeProvider from "./theme/MyThemeProvider";

const container = document.getElementById("root");

const root = createRoot(container);

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<StyledEngineProvider injectFirst>
				<MyThemeProvider>
					<App />
				</MyThemeProvider>
			</StyledEngineProvider>
		</BrowserRouter>
	</React.StrictMode>
);