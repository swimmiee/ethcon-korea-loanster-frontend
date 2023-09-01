import { Token } from "interfaces/token.interface";

export const TOKENS:{[chainId: number]:Token[]} = {
  // OP
  10: [
    {
      address: "0x0000000000000000000000000000000000000000",
      chainId: 10,
      decimals: 18,
      logoURI:
        "https://static.debank.com/image/op_token/logo_url/op/d61441782d4a08a7479d54aea211679e.png",
      priceUSD: 1718.89,
      symbol: "ETH",
    },
    {
      address: "0x4200000000000000000000000000000000000006",
      chainId: 10,
      decimals: 18,
      logoURI:
        "https://s2.tokeninsight.com/static/coins/img/currency/WETH_WETH.png",
      priceUSD: 1716.91,
      symbol: "WETH",
    },
    {
      address: "0x7F5c764cBc14f9669B88837ca1490cCa17c31607",
      chainId: 10,
      decimals: 6,
      logoURI:
        "https://static.debank.com/image/coin/logo_url/usdc/e87790bfe0b3f2ea855dc29069b38818.png",
      priceUSD: 0.999852,
      symbol: "USDC",
    },
    {
      address: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
      chainId: 10,
      decimals: 18,
      logoURI:
        "https://static.debank.com/image/op_token/logo_url/0xda10009cbd5d07dd0cecc66161fc93d7c9000da1/549c4205dbb199f1b8b03af783f35e71.png",
      priceUSD: 0.999686,
      symbol: "DAI",
    },
    {
      address: "0x68f180fcCe6836688e9084f035309E29Bf0A2095",
      chainId: 10,
      decimals: 8,
      logoURI:
        "https://token-icons.s3.amazonaws.com/0x2260fac5e5542a773aa44fbcfedf7c193bc2c599.png",
      priceUSD: 27425,
      symbol: "WBTC",
    },
    {
      address: "0x1F32b1c2345538c0c6f582fCB022739c4A194Ebb",
      chainId: 10,
      decimals: 18,
      logoURI:
        "https://static.debank.com/image/op_token/logo_url/0x1f32b1c2345538c0c6f582fcb022739c4a194ebb/4e742896fd0e8ecaf23bf8b6f9d79cfe.png",
      priceUSD: 1955.27,
      symbol: "wstETH",
    },
  ],
};
