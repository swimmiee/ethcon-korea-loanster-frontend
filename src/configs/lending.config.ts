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
  meta?: LendingMeta<T>;
}

export const LENDING_CONFIG: Record<number, LendingConfig<any>[]> = {
  // ethereum mainnet
  1: [
    {
      protocol: "Spark",
      core: "0xC13e21B648A5Ee794902342038FF3aDAB66BE987",
      depositTokens: [
        { symbol: "ETH", ltv: 0.8 }, // TODO
        { symbol: "DAI", ltv: 0.8 }, // TODO
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

export const LENDING_PROTOCOL_LOGO = {
  AAVE: "https://static.debank.com/image/project/logo_url/avax_aave3/9459cb86efd13145537eab8104e923bf.png",
  Spark:
    "data:image/jpeg;base64,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",
  LineaBank:
    "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*3GpvohEahZBzS2nhitLUPw.png",
};
