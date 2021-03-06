const Provider = require('./Provider').Provider;
const typeGuard = require("@pokt-network/pocket-js/lib/src/utils/type-guard").typeGuard
const RpcError = require("@pokt-network/pocket-js/lib/src/rpc").RpcError

function PocketProvider(token = '', baseServer = "http://r2.algorand.network", port = 4180, headers = {}, data = {}) {
    Provider.apply(this, arguments)
    this.pocket = data.pocket
    this.pocketAAT = data.pocketAAT
    this.blockchain = data.blockchain


    this.get = async function (path, query, requestHeaders={}) {
        console.log("QUERY"+query)
        return await this.sendPocketRelay(requestHeaders, query, path, "GET");
    };

    this.post = async function (path, data, requestHeaders={}) {
        return await this.sendPocketRelay(requestHeaders, data, path, "POST");
    };

    this.delete = async function (path, data, requestHeaders={}) {
        return await this.sendPocketRelay(requestHeaders, data, path, "DELETE");
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

        return {
            body: JSON.parse(relay.payload)
        }
    }
}

module.exports = { PocketProvider };