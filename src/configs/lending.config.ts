interface Deposit {
  name: string; // AAVE, Compound, Spark, ...
  depositTo: string; // lending pool address
}
interface Borrow {
  name: string; // AAVE, Compound, Spark, ...
  borrowFrom: string; // borrowing address
  ltv: number;
}

interface LendingConfig {
  deposit: Record<string, Deposit>;
  borrow: Record<string, Borrow>;
}

export const LENDING_CONFIG: Record<number, LendingConfig> = {
  // ethereum mainnet
  1: {
    deposit: {
      USDC: {
        name: "AAVE",
        depositTo: "...",
      },
      // ETH를 lending 풀에 맡기면 leveraged long을 할 수 있을까?
      // ETH: {
      //     name: "Spark",
      //     lendingPool: "...",
      // }
    },
    borrow: {},
  },
  // optimism
  10: {
    deposit: {},
    borrow: {},
  },
  // polygon
  137: {
    deposit: {},
    borrow: {},
  },
  // arbitrum: 할필요x
  42161: {
    deposit: {},
    borrow: {},
  },
  // linea -> pancakeswap toaster 필요...!
  59144: {
    deposit: {},
    borrow: {},
  },
};
