export class Provider {
    constructor(token, baseServer, port, headers={}) {
        if (port !== '') {
            baseServer += ":" + port.toString();
        }
        this.address = baseServer;
        this.token = token;
        this.defaultHeaders = headers;
    }

    async get(path, query, requestHeaders={}) {}
    async post(path, query, requestHeaders={}) {}
    async delete(path, query, requestHeaders={}) {}
}