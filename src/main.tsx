import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react';

// This is the chainId your dApp will work on.
const activeChainId = ChainId.Mainnet;

ReactDOM.render(
  <React.StrictMode>
    <ThirdwebProvider desiredChainId={activeChainId}>
      <App />
    </ThirdwebProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
