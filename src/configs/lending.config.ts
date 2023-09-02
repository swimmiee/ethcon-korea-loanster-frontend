interface Deposit {
  name: string; // AAVE, Compound, Spark, ...
  depositTo: string; // lending pool address
  ltv: number;
}
interface Borrow {
  name: string; // AAVE, Compound, Spark, ...
  borrowFrom: string; // borrowing address
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
        depositTo: "0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2",
        ltv: 0.77,
      },
      USDT: {
        name: "AAVE",
        depositTo: "0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2",
        ltv: 0.74,
      },
      DAI: {
        name: "AAVE",
        depositTo: "0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2",
        ltv: 0.75,
      },
      // ETH를 lending 풀에 맡기면 leveraged long을 할 수 있을까?
      // ETH: {
      //     name: "Spark",
      //     depositTo: "...",
      // }
    },
    borrow: {
      USDC: {
        name: "AAVE",
        borrowFrom: "0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2",
      },
      USDT: {
        name: "AAVE",
        borrowFrom: "0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2",
      },
      DAI: {
        name: "AAVE",
        borrowFrom: "0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2",
      },
    },
  },
  // optimism
  10: {
    deposit: {
      USDC: {
        name: "AAVE",
        depositTo: "0x794a61358D6845594F94dc1DB02A252b5b4814aD",
        ltv: 0.8,
      },
      DAI: {
        name: "AAVE",
        depositTo: "0x794a61358D6845594F94dc1DB02A252b5b4814aD",
        ltv: 0.78,
      },
    },
    borrow: {
      USDC: {
        name: "AAVE",
        borrowFrom: "0x794a61358D6845594F94dc1DB02A252b5b4814aD",
      },

      DAI: {
        name: "AAVE",
        borrowFrom: "0x794a61358D6845594F94dc1DB02A252b5b4814aD",
      },
    },
  },
  // polygon
  137: {
    deposit: {
      USDC: {
        name: "AAVE",
        depositTo: "0x794a61358D6845594F94dc1DB02A252b5b4814aD",
        ltv: 0.825,
      },
      USDT: {
        name: "AAVE",
        depositTo: "0x794a61358D6845594F94dc1DB02A252b5b4814aD",
        ltv: 0.75,
      },
      DAI: {
        name: "AAVE",
        depositTo: "0x794a61358D6845594F94dc1DB02A252b5b4814aD",
        ltv: 0.76,
      },
    },
    borrow: {
      USDC: {
        name: "AAVE",
        borrowFrom: "0x794a61358D6845594F94dc1DB02A252b5b4814aD",
      },
      USDT: {
        name: "AAVE",
        borrowFrom: "0x794a61358D6845594F94dc1DB02A252b5b4814aD",
      },
      DAI: {
        name: "AAVE",
        borrowFrom: "0x794a61358D6845594F94dc1DB02A252b5b4814aD",
      },
    },
  },
  // linea -> pancakeswap toaster 필요...!
  59144: {
    deposit: {
      USDC_e: {
        name: "LineaBank",
        depositTo: "0x009a0b7C38B542208936F1179151CD08E2943833",
        ltv: 0.8,
      },
    },
    borrow: {
      USDC_e: {
        name: "LineaBank",
        borrowFrom: "0x009a0b7C38B542208936F1179151CD08E2943833",
      },
    },
  },
};
