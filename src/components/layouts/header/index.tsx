import { ConnectWalletButton } from "./connectWallet"

export const Header = () => {
    return (
        <header className="h-24 px-8 flex items-center justify-between">
            <p className="text-h-xl">Loanster</p>
            <ConnectWalletButton />
        </header>
    )
}