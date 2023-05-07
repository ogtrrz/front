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
import { SessionProvider } from "next-auth/react";

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
				<SessionProvider>
					<AppContextProvider>
						<Stack>
							<ResponsiveAppBar />
							<Component {...pageProps} />
						</Stack>
					</AppContextProvider>
				</SessionProvider>
				{/* </AppWrapper> */}
				{/* </Provider> */}
			</ThemeProvider>
		</CacheProvider>
	);
}

export default MyApp;
