<h1>Loanster</h1>

<div style="display: flex; justify-content: center; align-items: center;">
  <div>
    <img src="https://github.com/swimmiee/ethcon-korea-loanster/assets/89185836/3c2b92f4-5d15-4981-809f-b063d241488f" width="100" height="100" alt="Loanster Image" />
</div>
 
</div>

<h2> Make Various Strategies for LP </h2>

## Contract Address 

**[Linea Mainnet]**
- Menu Contract : [0xa48719d977e5823a7881ba3d7a49b81673adaebb](https://lineascan.build/address/0xa48719d977e5823a7881ba3d7a49b81673adaebb)
- Toaster Contract: [0xb8e0cdbad514edc1e8e790f4b6f5f613361802a7](https://lineascan.build/address/0xb8e0cdbad514edc1e8e790f4b6f5f613361802a7)
  
**[Polygon zkEVM]**
- Menu Contract: [0xa48719d977e5823a7881ba3d7a49b81673adaebb](https://zkevm.polygonscan.com/address/0xa48719d977e5823a7881ba3d7a49b81673adaebb)
- Toaster Contract: [0xb8e0cdbad514edc1e8e790f4b6f5f613361802a7](https://zkevm.polygonscan.com/address/0xb8e0cdbad514edc1e8e790f4b6f5f613361802a7)

**[Taiko Testnet]**
- Menu Contract: [0xa48719d977e5823a7881ba3d7a49b81673adaebb]
- Toaster Contract: [0xb8e0cdbad514edc1e8e790f4b6f5f613361802a7]

## Problem
### 1. UniswapV3 Impermanent Loss (Unstable - stable pool)
Uniswap V3 is more damaging to ILs than the original Uniswap V2.  Below is a graph of IL as a function of range for a pair of unstable and stable coins (x-axis is the percentage change in price, y-axis is the value of liquidity).

https://github.com/swimmiee/ethcon-seoul-toaster/assets/89185836/454b6792-e14c-4cbe-8e7d-0397f07dfd3e

As you can see, the narrower the range, the more the value of liquidity changes per price change. In other words, the narrower the price range, the worse the IL.
### 2. Limited LP strategy
This is not possible with traditional LPs, who can make high-return, high-risk investments and low-return, low-risk investments based on the user's situation and appetite. 
They simply provide liquidity and earn fees for doing so. 

However, there are 3 types of markets: rising(Bull Strategy), falling(Bear Strategy), and sideways(Crab Strategy), and LPs only benefit from sideways markets and do not suffer from IL. 

In a rising market(Bull Strategy), it may be a better strategy to choose a product with more upside potential than the opportunity cost of suffering IL and investing LPs.

In a falling market(Bear Strategy), it may be a better choice to invest in other markets (Nasdaq, real estate) rather than crypto.

This is a very difficult problem in the Defi market, where liquidity is critical. 

### 3. UniswapV3 Investment UX Problem

Unlike V2, Uniswap V3 will determine the amount of both tokens based on a price range (maximum, current, minimum) rather than providing liquidity with the value of both tokens being the same. 
Users will then have to calculate how much they need to swap to provide liquidity and what range they need to put it in to get all the value they want (exactly what I want to put in if I want to invest $1000). 

However, if I'm using a pool that I'm trying to liquidate, the swaps that I'm executing to liquidate could actually impact the current price and cause me to put in less liquidity than I wanted to put in. 

## Solution

### Use Lending Protocol(Spark Protocol) for hedging : Solution of Problem 1,2
We used pools of stablecoins and non-stablecoins to allow users to use different strategies. For example, let's take an ETH-DAI pool.
We'll illustrate with examples using the values below.

LTV = 0.8, Borrow Rate = 0.75,current Price: ETH $2000

price range for addLiquidity: $**1921.58272121$** ~ **$2081.61738542$ [ Ticks for Equal Value of Assets ]**)

Initial Investment: 2000 $

Depending on market conditions, you can pursue different strategies to get the highest returns.

In a sideways market(**Crab Strategy**), you don't choose a hedging strategy, you choose a strategy that leaves all liquidity in place.

<img width="1920" alt="Slide 16_9 - 3" src="https://github.com/swimmiee/ethcon-korea-loanster/assets/89185836/99845d70-8de0-49eb-8ab4-88b6ed07653c">

If you want to borrow DAI with ETH as collateral for , the result of using Hedging is shown below.(**Bear Strategy**)

<img width="1920" alt="Slide 16_9 - 5" src="https://github.com/swimmiee/ethcon-korea-loanster/assets/89185836/e438c9b7-39a4-4fb4-a4be-f5bf937170c2">

If you want to borrow DAI against ETH for, you'll get the following result.(**Bull Strategy**)

<img width="1920" alt="Slide 16_9 - 9" src="https://github.com/swimmiee/ethcon-korea-loanster/assets/89185836/8c3b090d-6046-4a30-b92a-5465b252e550">

So, as you can see, if you use ETH as collateral, you're choosing a lower yield strategy, but it's more effective in a less volatile market, with less damage to your IL and less damage to your hedging, which may be more effective in a down market.
If you're using DAI as collateral, you're choosing a higher-yielding strategy, which is also more profitable in a bull market.
### Toaster Contract : Solution of Problem 3
We deploy two contracts: Menu contract and Toaster contract

- Menu Contract's Role: Search amount for swapping in single pool in onchain

- Toaster Contract's Role: Router for UniswapV3 Mint(Similar to the swaprouter02 contract). Swap And Add in one transaction to use multicall contract

To address the UX of Uniswap V3, we need to consider the price impact of swapping. However, it's not possible to calculate the price impact through simple math because the amount of liquidity is very different in different zones, depending on the distribution of supplied liquidity in the pool. 
Therefore, we use binary exploration to determine the amount to swap. We identify the amount in the price range that is reached after the swap and use Uniswap V3's liquidity supply conversion formula (found in the Uniswap whitepaper 6.29,6.30) to find the case where the two values are the same. 
We added a function to the router (toaster) contract we created to perform the post-swap minting process in a single transaction using these values.


## How to use Loanster?

**1. Connect Wallet**
<img width="1440" alt="스크린샷 2023-09-03 오전 10 16 31" src="https://github.com/swimmiee/ethcon-korea-loanster/assets/89185836/1758b020-4093-485f-b5ac-72758e50b1ba">
**2 .Select chain & Select Token for Deposit**
<img width="1440" alt="스크린샷 2023-09-03 오전 10 17 48" src="https://github.com/swimmiee/ethcon-korea-loanster/assets/89185836/5155f250-4293-423d-97c7-358948442d9a">

**3. Select Pair (Hedge Enable or impossible)**
<img width="1440" alt="스크린샷 2023-09-03 오전 10 18 07" src="https://github.com/swimmiee/ethcon-korea-loanster/assets/89185836/0ccc9afa-2c58-4a12-8511-2e0801cf0d5d">


**4. Select Price Range for UniswapV3 & Hedge Rate for how much deposit to lending protocol**

<img width="1440" alt="스크린샷 2023-09-03 오전 10 18 51" src="https://github.com/swimmiee/ethcon-korea-loanster/assets/89185836/6b03deb2-ad72-415a-ae13-fa8d24bceff4">

**5. Finally, Click the buttons to make the multiple transactions.(deposit + borrow + swap for matching rate + addliquidity)**

<img width="1022" alt="스크린샷 2023-09-03 오전 11 39 07" src="https://github.com/swimmiee/ethcon-korea-loanster/assets/89185836/3ab1638d-2fcd-4715-ae2d-92e8a3b32791">
<img width="1022" alt="스크린샷 2023-09-03 오전 11 39 25" src="https://github.com/swimmiee/ethcon-korea-loanster/assets/89185836/02717bb8-3d97-4b5e-8cb0-9a75c06a2ae8">
<img width="1022" alt="스크린샷 2023-09-03 오전 11 40 04" src="https://github.com/swimmiee/ethcon-korea-loanster/assets/89185836/f1df44d9-5de1-4d5e-8708-83a05a060528">
<img width="1022" alt="스크린샷 2023-09-03 오전 11 40 22" src="https://github.com/swimmiee/ethcon-korea-loanster/assets/89185836/d70ff0c6-b793-4a69-bb1c-867b61dd4e62">
<img width="1022" alt="스크린샷 2023-09-03 오전 11 40 40" src="https://github.com/swimmiee/ethcon-korea-loanster/assets/89185836/fe0fdc24-ce27-471d-930b-8adb9c318bfb">
<img width="1022" alt="스크린샷 2023-09-03 오전 11 42 54" src="https://github.com/swimmiee/ethcon-korea-loanster/assets/89185836/4bbc3d65-b7d1-42d9-9967-d4c37ce46ce6">