# Stabolut Token Purchase Web Portal (Frontend)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18-61DAFB.svg)](https://reactjs.org/)

A React web application enabling users to purchase **USB Tokens** using **Ethereum (ETH)** or **Bitcoin (BTC)**, with direct wallet integration for MetaMask (EVM) and UniSat (Bitcoin).

---

## 🌟 Features

- **Multi-Crypto Purchases**: Buy USB tokens with ETH (via smart contracts) or BTC (via testnet/mainnet Bitcoin transactions).
- **Web3 Wallet Connectivity**: Instant connection with MetaMask and UniSat browser extensions.
- **Real-Time Exchange Rates**: Live USD conversion rates powered by CoinGecko API.
- **Order Tracking**: Real-time status polling for transaction confirmations and USB token deliveries.

---

## 💻 Prerequisites

- **Node.js**: `>= 18.x` ([nodejs.org](https://nodejs.org/))
- **Browser Extension Wallet**: [MetaMask](https://metamask.io/) and/or [UniSat Wallet](https://unisat.io/)
- **Stabolut Backend**: Running locally on `http://localhost:8003` or a remote instance.

---

## 🚀 Step-by-Step Setup Guide

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/Stabolut/frontend.git
cd frontend
npm install
```

### 2. Configure Environment Variables

Copy the `.env.example` template:

```bash
cp .env.example .env
```

Edit `.env` to configure your backend API and network IDs:

```ini
# Backend API URL
REACT_APP_API_URL=http://localhost:8003/api/v1/stabolut

# Ethereum Chain ID (11155111 for Sepolia, 1 for Mainnet)
REACT_APP_ETH_NETWORK_ID=11155111

# Bitcoin Network (testnet or mainnet)
REACT_APP_BTC_NETWORK=testnet

# CoinGecko Exchange Rate API
REACT_APP_COINGECKO_URL=https://api.coingecko.com/api/v3/simple/
```

### 3. Run the Development Server

```bash
npm start
```

The application will open automatically in your browser at **`http://localhost:3000`**.

### 4. Build for Production

```bash
npm run build
```

This generates optimized static files in the `build/` directory, ready to deploy to Nginx, Vercel, Netlify, or AWS S3.

---

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for workflow details.

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.
