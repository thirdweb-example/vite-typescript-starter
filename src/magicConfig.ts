import { magicLink } from '@thirdweb-dev/react';

export const magicConfig = magicLink({
	// This is demo api magic key - only some social logins will work with demo api key
	apiKey: 'pk_live_3EFC32B01A29985C', // auth key
	oauthOptions: {
		redirectURI: new URL('/loggedin', window.location.origin).href,
		providers: [
			'google',
			'facebook',
			'github',
			'twitter',
			//   "gitlab",
			//   "bitbucket",
			'apple',
			//   "discord",
			//   "linkedin",
			// 'microsoft',
			'twitch',
		],
	},
});
