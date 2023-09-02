export interface InvestDto {
  id: string;
  name: string;
  chainId: number;
  address: string;
  project: string;
  category: "UniswapV3";
  dynamicMeta: {
    aprList: number[];
    rangeList: [[number, number], [number, number], [number, number]];
    tick: number;
  };
  meta: {
    feeTier: number;
    tickSpacing: number;
    toaster: string;
    swapRouter: string;
    positionManager: string;
    factory: string;
    masterChef?: string;
    rewardToken?: string;
  };
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
