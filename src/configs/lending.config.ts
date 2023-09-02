export type LendingProtocol = "AAVE" | "Spark" | "LineaBank";
interface Deposit {
  symbol: string;
  ltv: number;
}
export type LendingMeta<T extends LendingProtocol> = T extends "LineaBank"
  ? { lToken: Record<string, string> }
  : undefined;
interface LendingConfig<T extends LendingProtocol> {
  protocol: LendingProtocol;
  core: string;
  depositTokens: Deposit[];
  borrowToken: string[];
  meta?: LendingMeta<T>
}

export const LENDING_CONFIG: Record<number, LendingConfig<any>[]> = {
  // ethereum mainnet
  1: [
    {
      protocol: "Spark",
      core: "0xC13e21B648A5Ee794902342038FF3aDAB66BE987",
      depositTokens: [
        { symbol: "ETH", ltv: 0.8 }, // TODO
      ],
      borrowToken: ["DAI", "ETH", "wstETH"],
    },
    {
      protocol: "AAVE",
      core: "0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2",
      depositTokens: [
        { symbol: "USDC", ltv: 0.77 },
        { symbol: "USDT", ltv: 0.74 },
        { symbol: "DAI", ltv: 0.75 },
      ],
      borrowToken: ["wstETH", "WBTC", "rETH", "USDC", "USDT", "DAI"],
    },
  ],
  // optimism
  10: [
    {
      protocol: "AAVE",
      core: "0x794a61358D6845594F94dc1DB02A252b5b4814aD",
      depositTokens: [
        { symbol: "USDC", ltv: 0.8 },
        { symbol: "DAI", ltv: 0.78 },
      ],
      borrowToken: ["wstETH", "WBTC", "rETH", "USDC", "DAI"],
    },
  ],
  137: [
    {
      protocol: "AAVE",
      core: "0x794a61358D6845594F94dc1DB02A252b5b4814aD",
      depositTokens: [
        { symbol: "USDC", ltv: 0.825 },
        { symbol: "USDT", ltv: 0.75 },
        { symbol: "DAI", ltv: 0.76 },
      ],
      borrowToken: ["wstETH", "WBTC", "WETH", "MATIC", "USDC", "USDT", "DAI"],
    },
  ],
  // linea
  59414: [
    {
      protocol: "LineaBank",
      core: "0x009a0b7C38B542208936F1179151CD08E2943833",
      depositTokens: [{ symbol: "USDC.e", ltv: 0.8 }],
      borrowToken: ["USDC.e", "WBTC", "WETH"],
      meta: {
        lToken: {
          "USDC.e": "0x2aD69A0Cf272B9941c7dDcaDa7B0273E9046C4B0",
        },
      },
    },
  ] as LendingConfig<"LineaBank">[],
};
