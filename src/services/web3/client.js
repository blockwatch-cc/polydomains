import { Web3ApiClient } from "@web3api/client-js"
import { tezosDomainsPlugin } from "@web3api/tezos-domains-plugin-js"

export const TezosConnections = {
  granadanet: {
    provider: "https://rpc.granada.tzstats.com"
  },
  hangzhounet: {
    provider: "https://rpc.hangzhou.tzstats.com",
  },
  mainnet: {
    provider: "https://rpc.tzstats.com",
  },
}

export const client = new Web3ApiClient({
    plugins: [
        {
          uri: "w3://ens/tezos-domains.web3api.eth",
          plugin: tezosDomainsPlugin({
              connections: TezosConnections,
              defaultNetwork: "hangzhounet"
          })
        }
    ]
})