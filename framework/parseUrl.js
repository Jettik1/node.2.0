module.exports = (baseUrl) => (req,res) => { // Воспользуемся замыканием
    const parseUrl = new URL(req.url, baseUrl)
    console.log(parseUrl)
    const params = {}
    parseUrl.searchParams.forEach((value,key) => params[key] = value)

    req.pathname = parseUrl.pathname;
    req.params = params;
}