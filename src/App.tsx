import './global.css';
import '@coinbase/onchainkit/styles.css';

import { useAccount, useConnect } from 'wagmi';
import {
  Swap,
  SwapAmountInput,
  SwapToggleButton,
  SwapButton,
  SwapMessage,
} from '@coinbase/onchainkit/swap';
import { Token } from '@coinbase/onchainkit/token';

const ethToken: Token = {
  name: 'ETH',
  address: '',
  symbol: 'ETH',
  decimals: 18,
  image:
    'https://wallet-api-production.s3.amazonaws.com/uploads/tokens/eth_288.png',
  chainId: 8453,
};

const usdcToken: Token = {
  name: 'USDC',
  address: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',
  symbol: 'USDC',
  decimals: 6,
  image:
    'https://d3r81g40ycuhqg.cloudfront.net/wallet/wais/44/2b/442b80bd16af0c0d9b22e03a16753823fe826e5bfd457292b55fa0ba8c1ba213-ZWUzYjJmZGUtMDYxNy00NDcyLTg0NjQtMWI4OGEwYjBiODE2',
  chainId: 8453,
};

const basedToken: Token = {
  name: 'WMSTER',
  address: '0x6668D4A6605a27e5Ee51edA040581155EddC6666',
  symbol: 'WMSTER',
  decimals: 9,
  image:
    'https://d3r81g40ycuhqg.cloudfront.net/wallet/wais/47/bc/47bc3593c2dec7c846b66b7ba5f6fa6bd69ec34f8ebb931f2a43072e5aaac7a8-YmUwNmRjZDUtMjczYy00NDFiLWJhZDUtMzgwNjFmYWM0Njkx',
  chainId: 8453,
};

function App() {
  const account = useAccount();
  const { connectors, connect } = useConnect();

  return (
    <>
    <div className="image-container"><img src="https://whitemonsterbase.com/wp-content/uploads/2024/06/logo-dark-4.png"></img></div>
       <div className="container">
        <p>BUY $WMSTER</p>
        <p>Connect your wallet</p>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
            className="btn-1"
          >
            {connector.name}
          </button>
        ))}
        <div className="powered">Powered by Coinbase Smart Wallet</div>
      </div>

      {account.address && (
        <div className="center">
          <Swap
            address={account.address!}
            experimental={{ useAggregator: false }}
          >
            <SwapAmountInput
              label="Sell"
              swappableTokens={[ethToken, usdcToken, basedToken]}
              token={usdcToken}
              type="from"
            />
            <SwapToggleButton />
            <SwapAmountInput
              label="Buy"
              swappableTokens={[ethToken, usdcToken, basedToken]}
              token={basedToken}
              type="to"
            />
            <SwapButton />
            <SwapMessage />
          </Swap>
        </div>
      )}
    </>
  );
}

export default App;
