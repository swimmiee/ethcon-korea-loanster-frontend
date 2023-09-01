export const investCategories = ["UniswapV3", "Curve", "Lido"] as const;
export type InvestCategory = (typeof investCategories)[number];

export type InvestMeta<T extends InvestCategory> = T extends "UniswapV3"
  ? {
      feeTier: number;
      tickSpacing: number;
      toaster: string;
      swapRouter: string;
      factory: string;
      masterChef?: string;
      rewardToken?: string;
    }
  : T extends "Curve"
  ? {}
  : T extends "Lido"
  ? {
    type: 'stETH' | 'stMATIC'
  }
  : never;

export interface InvestDto<T extends InvestCategory = any> {
  id: string;
  name: string;
  chainId: number;
  address: string;
  project: string;
  category: InvestCategory;
  dynamicMeta: any;
  meta: InvestMeta<T>;
  apr: number;
  apy: number;
  tier: number;
  tvlUSD: number;
  volumeUSD7D: number;
  volumeUSD24H: number;
  inputAssets: string[];
  outputAssets: string[];
  autoWrap: boolean;
}

export interface InvestListDto {
  invests: InvestDto[];
  totalCount: number;
}
