export const shortenAddress = (address) => {
    return address.substring(0,4) + "..." + address.substring(address.length-3)
}