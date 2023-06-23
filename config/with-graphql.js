// import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from '@apollo/client';

// const cache = new InMemoryCache();
// const link = new HttpLink({
//     uri: `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/graphql`,
//     credentials: 'same-origin',
//     // headers: {
//     //     cookie: req.header('Cookie')
//     // }
// });
// const client = new ApolloClient({
// 	ssrMode: true,
//     cache,
//     link
// });

// const WithGraphQL = ({ children }) => {
//     return <ApolloProvider client={client}>{children}</ApolloProvider>;
// };

// export default WithGraphQL;

import {
	ApolloClient,
	ApolloProvider,
	InMemoryCache,
	// ApolloLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getSession } from "next-auth/react";
import { RestLink } from "apollo-link-rest";
// import { CachePersistor } from "apollo-cache-persist";

// const paginationLink = new ApolloLink((_, forward) => {
// 	return forward(_).map((response) => {
// 		const context = operation.getContext();
// 		localStorage.setItem('context', JSON.stringify(context))
// 		const { headers } = context.restResponses[0] || null;
// 		// in my case i'm making a bunch of sub queries, so i'm using `[0]` to get the headers from the top level.
// 		console.log("headers", headers);
// 		if (headers) {
// 			const x_total_count = getPaginationFromHeaders(headers.get("X-Total-Count"));

// 			return { ...response, data: { ...response.data, x_total_count } };
// 		}
// 		return response;
// 	});
// });

const restLink = new RestLink({
	uri: `${process.env.NEXT_PUBLIC_API_REST}`,
	headers: {
		"Content-Type": "application/json",
		mode: "cors",
		credentials: "same-origin",
	},
	// preserveHeaderCase: true,
	// response,
	// http,
	// responseTransformer: async response => response.json().then(({data}) => data),
});

// const persistor = new CachePersistor({
// 	cache,
// 	storage: AsyncStorage,
// 	debug: false,
// 	debounce: 1000,
// 	// maxSize: false
// });

// const authLinkAfterware = new ApolloLink((operation, forward) =>
// 	forward(operation).map((response) => {
// 		const res = operation.getContext().response;

// 		// Do we have a response?
// 		if (res) {
// 			const { headers } = res;
// 			// Do we have headers?
// 			if (headers) {
// 				// Extract tokens from Headers & save them
// 				const total = headers.get("X-Total-Count");
// 				console.log("headers", headers);
// 				if (total) {
// 					AsyncStorage.setItem("total", total);
// 				}
// 			}
// 		}
// 		return response;
// 	})
// );

const authLink = setContext(async (_, { headers }) => {
	const session = await getSession();
	console.log("getSession with graphql", session);
	const modifiedHeader = {
		headers: {
			...headers,
			Authorization: session?.user?.id_token ? session.user?.id_token : "",

			// 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJvbWFyLmd1dGllcnJlei5lQGdtYWlsLmNvbSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2ODkzNjUwMzl9.E7sRGFuFry7iEbCvjGHDTKK2dblhLqFb31ERDBwk0tvbJ1vUW257ZHwXx94jZ0jbdz1M_FKuLS8nsHcWghHIXw'
		},
	};
	return modifiedHeader;
});

const cache = new InMemoryCache();

const client = new ApolloClient({
	ssrMode: true,
	cache,
	// link: paginationLink.concat(authLink).concat(restLink),
	// link: ApolloLink.from([authLink, restLink]),
	link: authLink.concat(restLink),
	onError: ({ networkError, graphQLErrors }) => {
		console.log("graphQLErrors", graphQLErrors);
		console.log("networkError", networkError);
	},
});

const WithGraphQL = ({ children }) => {
	return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default WithGraphQL;
