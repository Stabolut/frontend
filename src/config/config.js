const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8003/api/v1/stabolut";

export let config = {
  baseUrl: API_URL,
  baseuUrl: API_URL, // alias for backwards compatibility
  networkID: process.env.REACT_APP_ETH_NETWORK_ID || "11155111",
  btcNetwork: process.env.REACT_APP_BTC_NETWORK || "testnet",
  CURRENCY_CONVERTER_URL: process.env.REACT_APP_COINGECKO_URL || "https://api.coingecko.com/api/v3/simple/"
};
