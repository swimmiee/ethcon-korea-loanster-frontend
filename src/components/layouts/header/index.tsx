import { ConnectWalletButton } from "./connectWallet"

export const Header = () => {
    return (
        <header className="h-24 px-8 flex items-center justify-between">
            <p className="text-d-sm">Lending Toaster</p>
            <ConnectWalletButton />
        </header>
    )
}