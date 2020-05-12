const Provider = require('./Provider').Provider;
const typeGuard = require("@pokt-network/pocket-js/lib/src/utils/type-guard").typeGuard
const RpcError = require("@pokt-network/pocket-js/lib/src/rpc").RpcError

function PocketProvider(token = '', baseServer = "http://r2.algorand.network", port = 4180, headers = {}, data = {}) {
    Provider.apply(this, arguments)
    this.pocket = data.pocket
    this.pocketAAT = data.pocketAAT
    this.blockchain = data.blockchain


    this.get = async function (path, query, requestHeaders={}) {
        return await this.sendPocketRelay(requestHeaders, query, path, "get");
    };

    this.post = async function (path, data, requestHeaders={}) {
        return await this.sendPocketRelay(requestHeaders, query, path, "post");
    };

    this.delete = async function (path, data, requestHeaders={}) {
        try {
            return await request
                .delete(this.address + path)
                .set(this.token)
                .set(this.defaultHeaders)
                .set(requestHeaders)
                .send(data);
        } catch (e) {
            throw e.response;
        }
    };


    this.sendPocketRelay = async function(requestHeaders, query, path, method) {
        let headers = Object.assign(this.defaultHeaders, requestHeaders, this.token)

        let relay = await this.pocket.sendRelay(
            JSON.stringify(query),
            this.blockchain,
            this.pocketAAT,
            this.pocket.configuration,
            headers,
            method,
            path
        )

        if (typeGuard(relay, RpcError)) {
            throw relay
        }

        return relay.payload
    }
}

module.exports = { PocketProvider };