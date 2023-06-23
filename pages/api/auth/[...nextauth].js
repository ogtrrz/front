import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import _ from "lodash";
// import axios from 'axios';
// import { PrismaAdapter } from '@next-auth/prisma-adapter';
// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient()
// import { useGet, useMutate } from "restful-react";

// const options = {

let tokenAuth = {};

export default NextAuth({
	secret: process.env.NEXTAUTH_SECRET,
	// site: process.env.NEXTAUTH_URL,
	// adapter: PrismaAdapter(prisma),

	providers: [
		CredentialProvider({
			name: "Credentials",
			credentials: {
				username: {
					label: "Usuario",
					type: "text",
					placeholder: "usurio",
					value: "user",
				},
				password: { label: "Contraseña", type: "password", value: "user" },
			},
			async authorize(credentials, req) {
				// console.log('credentials', credentials);
				const payload = {
					username: credentials.username,
					password: credentials.password,
					rememberMe: true,
				};
				// console.log('payload', payload);
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_API_REST}/authenticate`,
					{
						method: "POST",
						body: JSON.stringify(payload),
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				// console.log('39');
				const user = await res.json();
				user.username = credentials.username;
				// console.log('user', user);
				if (!res.ok) {
					throw new Error(user.exception);
				}
				// If no error and we have user data, return it
				if (res.ok && user) {
					return user;
				}
				// console.log('48');
				// Return null if user data could not be retrieved
				return null;
			},
		}),

		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),

		// FacebookProvider({
		// 	clientId: process.env.FACEBOOK_CLIENT_ID,
		// 	clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
		// }),
		// TwitterProvider({
		// 	clientId: process.env.TWITTER_CLIENT_ID,
		// 	clientSecret: process.env.TWITTER_CLIENT_SECRET
		//   }),

		// InstagramProvider({
		// 	clientId: process.env.INSTAGRAM_CLIENT_ID,
		// 	clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
		// }),
		// AzureADProvider({
		// 	clientId: process.env.AZURE_AD_CLIENT_ID,
		// 	clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
		// 	tenantId: process.env.AZURE_AD_TENANT_ID,
		// }),
	],

	// database: process.env.NEXT_PUBLIC_DATABASE_URL,
	session: {
		// jwt: true,
		strategy: "jwt",
		maxAge: 60 * 60 * 24 * 30,
	},
	callbacks: {
		jwt: async ({ token, user, account }) => {
			console.log("user 63", user);
			console.log("token 63", token);
			console.log("account 63", account);
			if (user) {
				if (account.provider === "google") {
					let myHeaders = new Headers();
					myHeaders.append("Content-Type", "application/json");

					let raw = JSON.stringify({
						username: "admin",
						password: "admin",
						rememberMe: true,
					});

					let requestOptions = {
						method: "POST",
						headers: myHeaders,
						body: raw,
						redirect: "follow",
					};

					fetch(
						`${process.env.NEXT_PUBLIC_SPRING}/authenticate`,
						requestOptions
					)
						.then((response) => response.text())
						.then((result) => {
							console.log("result", result);

							let myHeaders = new Headers();
							myHeaders.append(
								"Authorization",
								`Bearer ${JSON.parse(result).id_token}`
							);
							myHeaders.append("Content-Type", "application/json");

							let raw = JSON.stringify({
								login: user.email,
								lastName: user.name,
								email: user.email,
								imageUrl: user.image,
								activated: true,
								langKey: "es",
								authorities: ["ROLE_USER"],
							});

							let requestOptions = {
								method: "POST",
								headers: myHeaders,
								body: raw,
								redirect: "follow",
							};

							fetch(
								`${process.env.NEXT_PUBLIC_API_REST}/admin/users2`,
								requestOptions
							)
								.then((response) => response.text())
								.then((result) => {
									console.log("result 2 ========", result);
									console.log("token 2 ========", token);
									// token.username = user.name;
									token.id_token = `Bearer ${JSON.parse(result).id_token}`;
									// token.provider = account.provider;
									console.log("token +++++++++++++ ", token);
									tokenAuth = _.cloneDeep(token);
									return token;
								})
								.catch((error) => {
									console.log("error", error);
									return null;
								});
						})
						.catch((error) => {
							console.log("error", error);
							return null;
						});
				}
			}
			console.log("usuario de pruebas");
			token = {
				user: {
					name: "omar gutierrez",
					email: "oamrgutierrez16@gmail.com",
					picture:
						"https://lh3.googleusercontent.com/a/AAcHTtfiYMy7-WRItqgAgcNtf6_6hTEWYtRpM_kIpSAe=s96-c",
					sub: "103967374008942563709",
					id_token:
						"Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJvYW1yZ3V0aWVycmV6MTZAZ21haWwuY29tIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY5MDA2MTExNX0.8UQIQZ32CT4gfYKhqA2YuBPt3Sr9ggqLoH-tsKPjzDqYHbaFuRbEK53ZYl6ACGxWGOqIZxDmcf-xrc44-nIEHw",
				},
				expires: "2023-07-22T21:25:23.188Z",
			};
			return token;
		},
		session: ({ session, token }) => {
			console.log("token71", token);
			console.log("session71", session);

			// if (!session.user.name) {
				session = {
					user: {
						name: "omar gutierrez",
						email: "oamrgutierrez16@gmail.com",
						image:
							"https://lh3.googleusercontent.com/a/AAcHTtfiYMy7-WRItqgAgcNtf6_6hTEWYtRpM_kIpSAe=s96-c",
					},
					expires: "2023-07-22T21:25:15.305Z",
				};
			// }

			// console.log("tokenAuth", tokenAuth);
			// if (!tokenAuth.user) {
			// 	// session = tokenAuth
			// 	session.user = tokenAuth;
			// }
			// console.log("session72", session);
			return session;
		},
		async redirect({ url, baseUrl }) {
			return "/view/wrapper/1";
		},
	},
	jwt: {
		secret: process.env.NEXTAUTH_SECRET,
		encryption: true,
	},
	pages: {
		signIn: "/auth/signinsocial", //Need to define custom login page (if using)
	},
});

// export default (req, res) => NextAuth(req, res, options);
