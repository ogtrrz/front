import "../styles/globals.css";
import { ThemeProvider } from "@mui/material";
import { theme } from "../styles/theme";
import createEmotionCache from "../styles/createEmotionCache";
import { CacheProvider } from "@emotion/react";
// import { store } from "app/store";
// import { Provider } from "react-redux";
// import { AppWrapper } from "app/state";
import { AppContextProvider } from "app/AppContext";
import { Stack } from "@mui/material";
import ResponsiveAppBar from "./secure/ui/ResponsiveAppBar";

const clientSideEmotionCache = createEmotionCache();

function MyApp({
	Component,
	emotionCache = clientSideEmotionCache,
	pageProps,
}) {
	return (
		<CacheProvider value={emotionCache}>
			<ThemeProvider theme={theme}>
				{/* <Provider store={store}> */}
				{/* <AppWrapper> */}
				<AppContextProvider>
					<Stack>
						<ResponsiveAppBar />
						<Component {...pageProps} />
					</Stack>
				</AppContextProvider>
				{/* </AppWrapper> */}
				{/* </Provider> */}
			</ThemeProvider>
		</CacheProvider>
	);
}

export default MyApp;
