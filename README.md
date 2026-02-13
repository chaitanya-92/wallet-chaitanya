# Vault - Web3 Wallet

A non-custodial multi-chain wallet supporting Solana and Ethereum. Create or import wallets, manage multiple accounts, and keep full control of your keys.

## Features

- Create new wallet with BIP39 mnemonic
- Import existing 12/24-word recovery phrase
- Solana and Ethereum support
- Multiple accounts per wallet
- Keys never leave your device

## Tech Stack

- React 18 + TypeScript
- Vite 7
- Tailwind CSS
- Framer Motion
- @scure/bip39, @scure/bip32
- @solana/web3.js, ethers

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy

The app is a static SPA. Deploy the `dist` folder to any static host:

**Vercel:**
```bash
npm i -g vercel
vercel
```

**Netlify:**
```bash
npm run build
# Upload dist/ or connect repo for auto-deploy
```

**GitHub Pages:**
1. Set `base: '/your-repo-name/'` in vite.config.ts
2. Run `npm run build`
3. Deploy `dist` to gh-pages branch

## Security

- All keys are generated and stored locally in your browser
- No server-side key storage
- Recovery phrase validation via BIP39
- Testnet badge indicates non-mainnet usage
# wallet-chaitanya
