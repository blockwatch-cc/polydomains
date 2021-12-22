import { client } from './client'

const uri = 'w3://ens/tezos-domains.web3api.eth'

export const resolveDomainRecords = async (connection, domain) => {
    return client.query({
        uri,
        query: `
            query {
                resolveDomainRecords(connection: $connection, domain: "${domain}" )
            }
        `,
        variables: {
            connection
        }
    })
}

export const getAcquisitionInfo = async (connection, domain) => {
    return client.query({
        uri,
        query: `
            query {
                getAcquisitionInfo(connection: $connection, domain: "${domain}" )
            },
        `,
        variables: {
            connection
        }
    })
}