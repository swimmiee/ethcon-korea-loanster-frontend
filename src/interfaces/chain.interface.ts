export interface Chain {
  chainId: number;
  logoURI: string;
  name: string;
  symbol: string;
  explorer: string;
  multicallAddress: string;
  rpcUrls: string[];
}
