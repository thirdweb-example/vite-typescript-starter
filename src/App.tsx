import {
	ConnectWallet,
	useWallet,
	useConnect,
	useConnectionStatus,
	useAddress,
} from '@thirdweb-dev/react';
import { useTheme } from './ThemeContext';
import { useEffect, useState } from 'react';
import './styles/globals.css';
import { magicConfig } from './magicConfig';

export function App() {
	const [theme, setTheme] = useTheme();

	useEffect(() => {
		document.body.dataset.theme = theme;
	}, [theme]);

	return (
		<div className='container'>
			{/* Connect Wallet  */}
			<nav>
				<ConnectWallet
					theme={theme}
					modalTitle='Login'
					dropdownPosition={{
						align: 'start',
						side: 'bottom',
					}}
				/>
			</nav>

			{/* Theme Switcher  */}
			<button
				onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
				className='theme-switcher'
			>
				switch theme
			</button>

			<div
				style={{
					height: '80px',
				}}
			/>
		</div>
	);
}
