import { createContext } from "react"

export const WalletContext = createContext({
    account: null,
    setAccount: () => {}
})