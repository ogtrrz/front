import "../styles/globals.css";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../styles/theme";
import createEmotionCache from "../styles/createEmotionCache";
import { CacheProvider } from "@emotion/react";
import Stack from "@mui/material/Stack";
import ResponsiveAppBar from "components/ui/ResponsiveAppBar";
import Footer from "../components/ui/Footer";
import { SessionProvider } from "next-auth/react";
import WithGraphQL from "config/with-graphql";
import Head from "next/head";
// import Script from 'next/script'

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
						<Head>
							<meta
								name='viewport'
								content='initial-scale=1.0, width=device-width'
							/>
							<meta httpEquiv='Content-Security-Policy' content='img-src *' />
						</Head>
						<Stack>
							<ResponsiveAppBar {...pageProps} />
							<Component {...pageProps} />
							<Footer />
						</Stack>
					</WithGraphQL>
				</SessionProvider>
			</ThemeProvider>
		</CacheProvider>
	);
}

export default MyApp;
