import { createRoot } from 'react-dom/client';
import { App } from './App';
import {
	ThirdwebProvider,
	metamaskWallet,
	coinbaseWallet,
	walletConnect,
	magicLink,
} from '@thirdweb-dev/react';
import { ThemeProvider } from './ThemeContext';
import { magicConfig } from './magicConfig';

const root = createRoot(document.getElementById('root')!);

root.render(
	<ThemeProvider value='dark'>
		<ThirdwebProvider
			supportedWallets={[metamaskWallet(), coinbaseWallet(), walletConnect(), magicConfig]}
		>
			<App />
		</ThirdwebProvider>
	</ThemeProvider>
);
