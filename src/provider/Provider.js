function Provider(token, baseServer, port, headers={}) {

    if (port !== '') {
        baseServer += ":" + port.toString();
    }

    this.address = baseServer;
    this.token = token;
    this.defaultHeaders = headers;

    this.get = async function(path, query, requestHeaders={}) {}
    this.post = async function(path, query, requestHeaders={}) {}
    this.delete = async function(path, query, requestHeaders={}) {}
}

module.exports = { Provider };