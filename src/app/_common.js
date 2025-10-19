export function _formatDate(date) {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]

    let split = date.split('/')
    let month = months[split[0] - 1]
    let day = `${split[1]}${_getOrdinalSuffix(split[1])}`
    let year = split[2]

    return `${month} ${day}, ${year}`
}

function _getOrdinalSuffix(n) {
    const s = ["th", "st", "nd", "rd"]
    const v = n % 100
    return s[(v - 20) % 10] || s[v] || s[0]
}
