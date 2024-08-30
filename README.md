Refer to the [ansi wallet adapter](https://github.com/anza-xyz/wallet-adapter/blob/master/APP.md) for more information.

# React + Vite Using Bun

```sh
bun create vite .
bun install
bun run dev
```

## Install dependencies for solana wallet adapter

```sh
bun add @solana/wallet-adapter-base @solana/wallet-adapter-react @solana/wallet-adapter-react-ui @solana/wallet-adapter-wallets @solana/web3.js
```

## Todos

- [ ] Request Airdrop
- [ ] Show SOL balances (GET data from the blockchain)
- [ ] Send a transaction (Send a transaction to the blockchain)
- [ ] Sign a message (Verify the ownership of the wallet)

## Flow :

Dapp -> Requests transaction -> Wallet Adapter -> Wallet -> Signs transaction -> Solana Blockchain
