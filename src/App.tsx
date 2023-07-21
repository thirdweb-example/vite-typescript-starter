import { ConnectWallet, Web3Button, useConnectionStatus, useSigner } from '@thirdweb-dev/react';
import './styles/Home.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
	const connectionStatus = useConnectionStatus();
	const signer = useSigner();
	return (
		<main className='main'>
			<ToastContainer theme='dark' />
			<div className='container'>
				<div className='header'>
					<h1 className='title'>
						Welcome to{' '}
						<span className='gradient-text-0'>
							<a href='https://thirdweb.com/' target='_blank' rel='noopener noreferrer'>
								thirdweb.
							</a>
						</span>
					</h1>

					<div className='connect'>
						<ConnectWallet
							dropdownPosition={{
								side: 'bottom',
								align: 'center',
							}}
						/>
					</div>

					{connectionStatus === 'connected' && (
						<Web3Button
							className='my-web3-button'
							contractAddress='0x53678762171dE663F079e3468A50206E58a99599' // polygon
							action={async contract => {
								await contract.erc1155.claim(0, 1);
							}}
							onError={e => {
								toast('Error: \n' + e.message);
							}}
							onSuccess={data => {
								toast('Success!');
							}}
						>
							ERC 1155 Claim (polygon)
						</Web3Button>
					)}
				</div>

				{signer && (
					<button
						style={{
							marginTop: '20px',
						}}
						className='btn'
						onClick={async () => {
							try {
								const signature = await signer.signMessage('Hello');
								toast('Signature: \n' + signature);
							} catch (e: any) {
								toast('Error: \n' + e?.message);
							}
						}}
					>
						{' '}
						Sign Message: "Hello"{' '}
					</button>
				)}
			</div>
		</main>
	);
}
