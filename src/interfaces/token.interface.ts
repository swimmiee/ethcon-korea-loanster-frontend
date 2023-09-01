export type TokenType = "NATIVE" | "wNATIVE" | "wETH" | "STABLE" | "CRYPTO";

export interface Token {
  id: string;
  address: string;
  chainId: number;
  decimals: number;
  logoURI: string;
  name: string;
  symbol: string;
  canonical: string;
  priceUSD: number;
  tier: number;
  type: TokenType;
  isolated: boolean;
}
