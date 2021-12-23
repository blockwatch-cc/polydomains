export const shortenAddress = (address) => {
    return address.substring(0,4) + "..." + address.substring(address.length-3)
}

export const extractErrorMessage = (errors, defaultMessage) => {
    let message
    if(errors[0]) {
        message = errors[0].message.match(/(?<=exception: ).*/)[0] 
    }
    if(!message && defaultMessage) {
        message = defaultMessage
    }
    if(!message) {
        message = 'failed to get information'
    }
    return message
}