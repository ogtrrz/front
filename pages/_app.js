import "../styles/globals.css";
import { ThemeProvider } from "@mui/material";
import { theme } from "../styles/theme";
import createEmotionCache from "../styles/createEmotionCache";
import { CacheProvider } from "@emotion/react";
import { store } from "../app/store";
import { Provider } from "react-redux";

const clientSideEmotionCache = createEmotionCache();

function MyApp({
	Component,
	emotionCache = clientSideEmotionCache,
	pageProps,
}) {
	return (
		<CacheProvider value={emotionCache}>
			<ThemeProvider theme={theme}>
				<Provider store={store}>
					<Component {...pageProps} />
				</Provider>
			</ThemeProvider>
		</CacheProvider>
	);
}

export default MyApp;
