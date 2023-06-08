import "../styles/globals.css";
import { ThemeProvider } from "@mui/material";
import { theme } from "../styles/theme";
import createEmotionCache from "../styles/createEmotionCache";
import { CacheProvider } from "@emotion/react";
import { Stack } from "@mui/material";
import ResponsiveAppBar from "components/ui/ResponsiveAppBar";
import { SessionProvider } from "next-auth/react";
import WithGraphQL from 'config/with-graphql';

const clientSideEmotionCache = createEmotionCache();

function MyApp({
	Component,
	emotionCache = clientSideEmotionCache,
	pageProps: { session, ...pageProps },
}) {
	return (
		<CacheProvider value={emotionCache}>
			<ThemeProvider theme={theme}>
				<SessionProvider session={session}>
					<WithGraphQL>
						<Stack>
							<ResponsiveAppBar {...pageProps}/>
							<Component {...pageProps} />
						</Stack>
					</WithGraphQL>
				</SessionProvider>
			</ThemeProvider>
		</CacheProvider>
	);
}

export default MyApp;
