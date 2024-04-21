import NextAuth from 'next-auth';
import Github from 'next-auth/providers/github';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '@/db';

// Pull secrets from the .env
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

// When we call from the process.env, we could receive a string on null,
// so let's confirm that we have the credentials and throw an error message
// if either is missing.
if ( !GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET ) {
	throw new Error('Missing github oauth credentials');
}

// This is destructuring a couple of functions that we'll use from the NextAuth object.
// handlers: going to be called automatically by GitHub servers whenever a user tries to sign into our application
// auth: going to allow us to figure out whetehr or not a user is signed into our applicaiton inside of a react component
// signOut: signs the user out of our application
// signIn: signs the user into our application
export const { handlers: { GET, POST }, auth, signOut, signIn} = NextAuth({
	adapter: PrismaAdapter(db),
	providers: [
		Github({
			clientId: GITHUB_CLIENT_ID,
			clientSecret: GITHUB_CLIENT_SECRET,
		}),
	],
	callbacks: {
		// Usually not needed, fixing a bug in nextauth
		// The bug: the session.user object doesn't get the ID that's supposed to be assigned to them
		async session({ session, user }: any) {
			if (session && user) {
				session.user.id = user.id;
			}
			return session;
		}
	},
})
