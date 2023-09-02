export const LENDING_CONFIG = {
  ethereum: {
    PoolAddressProvider: {
      AAVE: "0x2f39d218133AFaB8F2B819B1066c7E434Ad94E9e",
    },
    POOL: {
      AAVE: "0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2",
    },
    tokens: {
      USDC: {
        address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        LTV: 0.77,
      },
      USDT: {
        address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        LTV: 0.74,
      },
      DAI: { address: "0x6B175474E89094C44Da98b954EedeAC495271d0F", LTV: 0.75 },
    },
  },
  optimism: {
    PoolAddressProvider: {
      AAVE: "0xa97684ead0e402dC232d5A977953DF7ECBaB3CDb",
    },
    POOL: {
      AAVE: "0x794a61358D6845594F94dc1DB02A252b5b4814aD",
    },
    tokens: {
      USDC: { address: "0x7F5c764cBc14f9669B88837ca1490cCa17c31607", LTV: 0.8 },
      DAI: { address: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1", LTV: 0.78 },
    },
  },
  polygon: {
    PoolAddressProvider: {
      AAVE: "0xa97684ead0e402dC232d5A977953DF7ECBaB3CDb",
    },
    POOL: {
      AAVE: "0x794a61358D6845594F94dc1DB02A252b5b4814aD",
    },
    tokens: {
      USDC: {
        address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
        LTV: 0.825,
      },
      USDT: {
        address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
        LTV: 0.75,
      },
      DAI: { address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063", LTV: 0.76 },
    },
  },
  linea: {
    PoolAddressProvider: {
      LineaBankCore: "0x009a0b7C38B542208936F1179151CD08E2943833",
    },
    LToken: {
      lUSDC: "0x2aD69A0Cf272B9941c7dDcaDa7B0273E9046C4B0",
    },
    tokens: {
      USDC_e: {
        address: "0x176211869cA2b568f2A7D4EE941E073a821EE1ff",
        LTV: 0.8,
      },
    },
  },
};
