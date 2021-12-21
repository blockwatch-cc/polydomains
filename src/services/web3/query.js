import { client } from './client'

const uri = 'w3://ens/tezos-domains.web3api.eth'

export const resolveDomainRecords = async (domain) => {
    return client.query({
        uri,
        query: `
            query {
                resolveDomainRecords(domain: "${domain}" )
            }
        `
    })
}

export const getAcquisitionInfo = async (domain) => {
    return client.query({
        uri,
        query: `
            query {
                getAcquisitionInfo(domain: "${domain}" )
            }
        `
    })
}

export const buyDomain = async (payload) => {
    const { domain, duration, address, confirmation } = payload
    return client.query({
        uri,
        query: `
            mutation {
              buyDomain(
                domain: "${domain}",
                duration: "${duration}",
                owner: "${address}",
                confirmation: "${confirmation}"
              )
            }
        `
    })
}