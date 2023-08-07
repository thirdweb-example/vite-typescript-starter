import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import './styles/globals.css';
import { Goerli } from '@thirdweb-dev/chains';

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
	<React.StrictMode>
		<ThirdwebProvider
			clientId={import.meta.env.VITE_TEMPLATE_CLIENT_ID}
			activeChain={Goerli}
			supportedChains={[Goerli]}
		>
			<App />
		</ThirdwebProvider>
	</React.StrictMode>
);
