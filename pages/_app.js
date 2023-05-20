import "../styles/globals.css";
import { ThemeProvider } from "@mui/material";
import { theme } from "../styles/theme";
import createEmotionCache from "../styles/createEmotionCache";
import { CacheProvider } from "@emotion/react";
// import { store } from "app/store";
// import { Provider } from "react-redux";
// import { AppWrapper } from "app/state";
// import { AppContextProvider } from "app/AppContext";
import { Stack } from "@mui/material";
import ResponsiveAppBar from "./secure/ui/ResponsiveAppBar";
import { SessionProvider } from "next-auth/react";
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	ApolloLink,
} from "@apollo/client";
import { RestLink } from "apollo-link-rest";

const clientSideEmotionCache = createEmotionCache();

// const paginationLink = new ApolloLink((operation, forward) => {
// 	return forward(operation).map((response) => {
// 		const context = operation.getContext();
// 		console.log("LINK +++++=========================================");
// 		console.log('context', context);
// 		console.log("LINK +++++=========================================");
// 		const { response: { headers } } = context
// 		console.log('headers', headers);

// 		//const { headers } = context.restResponses[0] || null;
// 		// in my case i'm making a bunch of sub queries, so i'm using `[0]` to get the headers from the top level.
// 		if (headers) {
// 			const pagination = getPaginationFromHeaders(headers.get("X-Total-Count"));
// 			console.log("headers", headers);
// 			return { ...response, data: { ...response.data, pagination } };
// 		}
// 		return response;
// 	});
// });

const restLink = new RestLink({
	uri: `${process.env.NEXT_PUBLIC_API_REST}`,
});

const client = new ApolloClient({
	// link: paginationLink.concat(restLink),
	link: restLink,
	cache: new InMemoryCache(),
});

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
					<ApolloProvider client={client}>
						<Stack>
							<ResponsiveAppBar />
							<Component {...pageProps} />
						</Stack>
					</ApolloProvider>
				</SessionProvider>
				{/* </AppWrapper> */}
				{/* </Provider> */}
			</ThemeProvider>
		</CacheProvider>
	);
}

export default MyApp;
