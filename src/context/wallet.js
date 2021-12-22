import { createContext } from "react"

export const WalletContext = createContext({
    app: {
        network: 'hangzhounet'
    },
    setApp: () => {}
})