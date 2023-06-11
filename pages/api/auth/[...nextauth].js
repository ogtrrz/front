import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
// import axios from 'axios';
// import { PrismaAdapter } from '@next-auth/prisma-adapter';
// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient()
// import { useGet, useMutate } from "restful-react";

// const options = {
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
				password: { label: "Contrasena", type: "password", value: "user" },
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
	],

	// database: process.env.NEXT_PUBLIC_DATABASE_URL,
	session: {
		jwt: true,
		// strategy: "jwt",
		//maxAge: 60 * 60 * 24 * 30
	},
	callbacks: {
		jwt: async ({ token, user }) => {
			//console.log('user 63', user);
			if (user) {
				token.username = user.username;
				token.id_token = user.id_token;
			}
			return token;
		},
		session: ({ session, token }) => {
			//console.log('token71', token);
			if (token) {
				session.username = token.username;
				session.id_token = token.id_token;
			}
			return session;
		},
	},
	jwt: {
		secret: process.env.NEXTAUTH_SECRET,
		encryption: true,
	},
	pages: {
		signIn: "/auth/session", //Need to define custom login page (if using)
	},
});

// export default (req, res) => NextAuth(req, res, options);
