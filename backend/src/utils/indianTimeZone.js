const getIndianTimeZone = (date) => {
    const indianDate = new Date(date).toLocaleString("en-IN",{
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    })
    return indianDate
}

module.exports = getIndianTimeZone